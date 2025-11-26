import axios from 'axios';

const RAKUTEN_API_URL = 'https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706';

export interface RakutenProduct {
    itemName: string;
    itemPrice: number;
    itemUrl: string;
    affiliateUrl: string;
    mediumImageUrls: { imageUrl: string }[];
    reviewAverage: number;
    reviewCount: number;
    shopName: string;
    itemCode: string;
    genreId: string;
}

export interface RakutenSearchParams {
    keyword: string;
    limit?: number;
    sort?: string;
    minPrice?: number;
    maxPrice?: number;
    genreId?: string;
}

export async function searchRakutenProducts(
    params: RakutenSearchParams
): Promise<RakutenProduct[]> {
    // 関数内で環境変数を取得
    const RAKUTEN_APP_ID = process.env.RAKUTEN_APP_ID;

    if (!RAKUTEN_APP_ID) {
        throw new Error('RAKUTEN_APP_ID is not set in environment variables');
    }

    try {
        const response = await axios.get(RAKUTEN_API_URL, {
            params: {
                applicationId: RAKUTEN_APP_ID,
                keyword: params.keyword,
                hits: params.limit || 10,
                sort: params.sort || '-reviewCount', // レビュー数順（デフォルト）
                minPrice: params.minPrice,
                maxPrice: params.maxPrice,
                genreId: params.genreId,
                formatVersion: 2,
            },
            timeout: 10000,
        });

        if (response.data.Items && response.data.Items.length > 0) {
            return response.data.Items.map((item: any) => ({
                itemName: item.itemName,
                itemPrice: item.itemPrice,
                itemUrl: item.itemUrl,
                affiliateUrl: item.affiliateUrl || item.itemUrl,
                mediumImageUrls: item.mediumImageUrls || [],
                reviewAverage: item.reviewAverage || 0,
                reviewCount: item.reviewCount || 0,
                shopName: item.shopName,
                itemCode: item.itemCode,
                genreId: item.genreId,
            }));
        }

        return [];
    } catch (error: any) {
        console.error('楽天API検索エラー:', error.message);
        if (error.response) {
            console.error('レスポンスステータス:', error.response.status);
            console.error('レスポンスデータ:', error.response.data);
        }
        throw new Error('楽天API検索に失敗しました');
    }
}

// カテゴリー別のジャンルID（修正版）
export const RAKUTEN_GENRE_IDS = {
    ワイヤレスイヤホン: '216131', // TV・オーディオ・カメラ > オーディオ > イヤホン・ヘッドホン > イヤホン
    スマートウォッチ: '560298', // スマートフォン・タブレット > スマートウォッチ本体
    ノートPC: '100026', // パソコン・周辺機器 > パソコン > ノートPC
    スマートフォン: '110730', // スマートフォン・タブレット > スマートフォン本体
    カメラ: '110829', // TV・オーディオ・カメラ > カメラ・ビデオカメラ > デジタルカメラ
    タブレット: '559921', // スマートフォン・タブレット > タブレットPC本体
};

// カテゴリー別検索のヘルパー関数
export async function searchByCategory(
    category: keyof typeof RAKUTEN_GENRE_IDS,
    limit: number = 10
): Promise<RakutenProduct[]> {
    const genreId = RAKUTEN_GENRE_IDS[category];

    // カテゴリーに応じたキーワードを設定
    const keywords: Record<string, string> = {
        ワイヤレスイヤホン: 'ワイヤレス イヤホン Bluetooth',
        スマートウォッチ: 'スマートウォッチ',
        ノートPC: 'ノートパソコン',
        スマートフォン: 'スマートフォン',
        カメラ: 'デジタルカメラ',
        タブレット: 'タブレット',
    };

    return searchRakutenProducts({
        keyword: keywords[category] || category,
        limit,
        genreId,
        sort: '-reviewCount',
    });
}

// 価格帯で絞り込み
export async function searchByPriceRange(
    keyword: string,
    minPrice: number,
    maxPrice: number,
    limit: number = 10
): Promise<RakutenProduct[]> {
    return searchRakutenProducts({
        keyword,
        limit,
        minPrice,
        maxPrice,
        sort: '-reviewAverage', // 評価順
    });
}

// 人気商品を取得（レビュー数順）
export async function getPopularProducts(
    keyword: string,
    limit: number = 10
): Promise<RakutenProduct[]> {
    return searchRakutenProducts({
        keyword,
        limit,
        sort: '-reviewCount',
    });
}

// 高評価商品を取得（評価順）
export async function getHighRatedProducts(
    keyword: string,
    limit: number = 10
): Promise<RakutenProduct[]> {
    return searchRakutenProducts({
        keyword,
        limit,
        sort: '-reviewAverage',
    });
}
