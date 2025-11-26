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
                            'en-US': options.category,
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

if (categoryIndex === -1) {
    console.error('❌ エラー: --category オプションが必要です');
    console.log('\n使用方法:');
    console.log('  npm run import-rakuten -- --category "ワイヤレスイヤホン" --limit 5');
    console.log('\nカテゴリー:');
    console.log('  - ワイヤレスイヤホン');
    console.log('  - スマートウォッチ');
    console.log('  - ノートPC');
    console.log('  - スマートフォン');
    console.log('  - カメラ');
    console.log('  - タブレット');
    process.exit(1);
}

const category = args[categoryIndex + 1];
const limit = limitIndex !== -1 ? parseInt(args[limitIndex + 1]) : 5;

importFromRakuten({ category, limit });
