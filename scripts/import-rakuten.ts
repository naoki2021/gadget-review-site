import { config } from 'dotenv';
import { createClient } from 'contentful-management';
import { searchByCategory, RakutenProduct } from '../src/lib/rakuten';
import { resolve } from 'path';

// 環境変数を読み込み
config({ path: resolve(__dirname, '../.env.local') });

console.log('環境変数チェック:');
console.log('CONTENTFUL_SPACE_ID:', process.env.CONTENTFUL_SPACE_ID ? '設定済み' : '未設定');
console.log('CONTENTFUL_MANAGEMENT_TOKEN:', process.env.CONTENTFUL_MANAGEMENT_TOKEN ? '設定済み' : '未設定');
console.log('RAKUTEN_APP_ID:', process.env.RAKUTEN_APP_ID ? '設定済み' : '未設定');
console.log('');

const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID!;
const CONTENTFUL_MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN!;

const client = createClient({
    accessToken: CONTENTFUL_MANAGEMENT_TOKEN,
});

interface ImportOptions {
    category: string;
    limit: number;
}

async function importFromRakuten(options: ImportOptions) {
    console.log(`\n🔍 楽天APIから商品情報を取得中...`);
    console.log(`カテゴリー: ${options.category}`);
    console.log(`取得件数: ${options.limit}件\n`);

    try {
        // 楽天APIから商品検索
        const products = await searchByCategory(
            options.category as any,
            options.limit
        );

        console.log(`✅ ${products.length}件の商品を取得しました\n`);

        // Contentfulスペースと環境を取得
        const space = await client.getSpace(CONTENTFUL_SPACE_ID);
        const environment = await space.getEnvironment('master');

        let successCount = 0;
        let errorCount = 0;

        for (const [index, product] of products.entries()) {
            console.log(`\n[${index + 1}/${products.length}] ${product.itemName}`);

            try {
                // スラッグ生成（商品コードを使用）
                const slug = `${options.category.toLowerCase()}-${product.itemCode}`;

                // スペック情報を抽出（商品名から推測）
                const specs = extractSpecs(product.itemName);

                // カテゴリーを自動判定
                const detectedCategory = detectCategory(product.itemName);

                // Contentfulエントリー作成
                const entry = await environment.createEntry('product', {
                    fields: {
                        title: {
                            'en-US': product.itemName,
                        },
                        slug: {
                            'en-US': slug,
                        },
                        category: {
                            'en-US': detectedCategory,
                        },
                        brand: {
                            'en-US': extractBrand(product.itemName),
                        },
                        price: {
                            'en-US': product.itemPrice,
                        },
                        rakutenUrl: {
                            'en-US': product.affiliateUrl,
                        },
                        // amazonUrlとmainImageは後で追加
                        specs: {
                            'en-US': specs,
                        },
                        rating: {
                            'en-US': Math.round(product.reviewAverage || 0),
                        },
                        publishedDate: {
                            'en-US': new Date().toISOString(),
                        },
                    },
                });

                // 公開
                await entry.publish();

                console.log(`  ✅ Contentfulに登録・公開完了`);
                console.log(`  価格: ¥${product.itemPrice.toLocaleString()}`);
                console.log(`  評価: ${product.reviewAverage} (${product.reviewCount}件)`);

                successCount++;

                // レート制限対策（1秒待機）
                await new Promise((resolve) => setTimeout(resolve, 1000));
            } catch (error: any) {
                console.error(`  ❌ エラー: ${error.message}`);
                errorCount++;
            }
        }

        console.log(`\n\n📊 インポート結果`);
        console.log(`成功: ${successCount}件`);
        console.log(`失敗: ${errorCount}件`);
        console.log(`\n✨ インポート完了！`);
    } catch (error: any) {
        console.error(`\n❌ エラー: ${error.message}`);
        process.exit(1);
    }
}

// ブランド名を抽出（簡易版）
function extractBrand(productName: string): string {
    const brands = [
        'Apple',
        'Sony',
        'Samsung',
        'Bose',
        'Anker',
        'JBL',
        'Beats',
        'Sennheiser',
        'Audio-Technica',
        'Panasonic',
        'ASUS',
        'Dell',
        'HP',
        'Lenovo',
        'Microsoft',
        'Google',
        'Xiaomi',
        'Huawei',
        'Canon',
        'Nikon',
        'Fujifilm',
        'GoPro',
    ];

    for (const brand of brands) {
        if (productName.includes(brand)) {
            return brand;
        }
    }

    return '不明';
}

// 商品名からカテゴリーを自動判定
function detectCategory(productName: string): string {
    const lowerName = productName.toLowerCase();

    // 優先度順にチェック（より具体的なキーワードを先に）
    if (lowerName.includes('スマートグラス') || lowerName.includes('スマートメガネ') || lowerName.includes('smart glass') || lowerName.includes('ar glass')) {
        return 'スマートグラス';
    }
    if (lowerName.includes('スマートウォッチ') || lowerName.includes('smartwatch') || lowerName.includes('apple watch') || lowerName.includes('fitbit') || lowerName.includes('garmin')) {
        return 'スマートウォッチ';
    }
    if (lowerName.includes('ワイヤレスイヤホン') || lowerName.includes('イヤホン') || lowerName.includes('earphone') || lowerName.includes('airpods') || lowerName.includes('earbuds')) {
        return 'ワイヤレスイヤホン';
    }
    if (lowerName.includes('ノートpc') || lowerName.includes('ノートパソコン') || lowerName.includes('laptop') || lowerName.includes('macbook') || lowerName.includes('thinkpad')) {
        return 'ノートPC';
    }
    if (lowerName.includes('タブレット') || lowerName.includes('ipad') || lowerName.includes('tablet')) {
        return 'タブレット';
    }
    if (lowerName.includes('カメラ') || lowerName.includes('デジカメ') || lowerName.includes('デジタルカメラ') || lowerName.includes('ミラーレス')) {
        return 'カメラ';
    }
    if (lowerName.includes('スマートフォン') || lowerName.includes('スマホ') || lowerName.includes('iphone') || lowerName.includes('galaxy') || lowerName.includes('xperia')) {
        return 'スマートフォン';
    }

    return 'ガジェット'; // デフォルト
}

// スペック情報を抽出（簡易版）
function extractSpecs(productName: string): Record<string, string> {
    const specs: Record<string, string> = {};

    // ノイズキャンセリング
    if (productName.includes('ノイズキャンセリング') || productName.includes('ANC')) {
        specs['ノイズキャンセリング'] = 'あり';
    }

    // 防水
    if (productName.includes('防水') || productName.includes('IPX')) {
        const ipxMatch = productName.match(/IPX(\d)/);
        specs['防水'] = ipxMatch ? `IPX${ipxMatch[1]}` : '対応';
    }

    // Bluetooth
    if (productName.includes('Bluetooth')) {
        const btMatch = productName.match(/Bluetooth\s*(\d\.\d)/);
        specs['接続'] = btMatch ? `Bluetooth ${btMatch[1]}` : 'Bluetooth';
    }

    // ワイヤレス
    if (productName.includes('ワイヤレス') || productName.includes('Wireless')) {
        specs['接続方式'] = 'ワイヤレス';
    }

    return specs;
}

// コマンドライン引数を解析
const args = process.argv.slice(2);
const categoryIndex = args.indexOf('--category');
const limitIndex = args.indexOf('--limit');

const CATEGORIES = [
    'ワイヤレスイヤホン',
    'スマートウォッチ',
    'ノートPC',
    'スマートフォン',
    'カメラ',
    'タブレット',
];

let category: string;

if (categoryIndex === -1) {
    console.log('カテゴリーが指定されていないため、ランダムに選択します...');
    category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
    console.log(`選択されたカテゴリー: ${category}`);
} else {
    category = args[categoryIndex + 1];
}

const limit = limitIndex !== -1 ? parseInt(args[limitIndex + 1]) : 5;

importFromRakuten({ category, limit });
