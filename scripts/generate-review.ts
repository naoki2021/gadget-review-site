import { config } from 'dotenv';
import { resolve } from 'path';
import { createClient } from 'contentful-management';
import { generateReview } from '../src/lib/localAI';

// 環境変数を読み込み
config({ path: resolve(__dirname, '../.env.local') });

const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID!;
const CONTENTFUL_MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN!;

const client = createClient({
    accessToken: CONTENTFUL_MANAGEMENT_TOKEN,
});

interface GenerateOptions {
    productId?: string;
    limit?: number;
}

async function generateReviews(options: GenerateOptions) {
    console.log('\n🤖 AI記事生成を開始します...\n');

    try {
        // Contentfulスペースと環境を取得
        const space = await client.getSpace(CONTENTFUL_SPACE_ID);
        const environment = await space.getEnvironment('master');

        // 商品エントリーを取得
        const entries = await environment.getEntries({
            content_type: 'product',
            limit: options.limit || 10,
            'fields.reviewContent[exists]': false, // レビューがまだないもの
        });

        console.log(`📦 ${entries.items.length}件の商品を見つけました\n`);

        let successCount = 0;
        let errorCount = 0;

        for (const [index, entry] of entries.items.entries()) {
            const title = entry.fields.title?.['en-US'] as string;
            const category = entry.fields.category?.['en-US'] as string;
            const price = entry.fields.price?.['en-US'] as number;
            const specs = entry.fields.specs?.['en-US'] as Record<string, string>;
            const rating = entry.fields.rating?.['en-US'] as number;

            console.log(`\n[${index + 1}/${entries.items.length}] ${title}`);
            console.log(`  カテゴリー: ${category}`);
            console.log(`  価格: ¥${price?.toLocaleString()}`);
            console.log(`  評価: ${rating}/5`);

            try {
                // AI記事生成
                console.log('  🤖 AI記事を生成中...');

                const productInfo = {
                    title: title,
                    category: category || 'ガジェット',
                    price: price || 0,
                    specs: specs || {},
                    rating: rating || 0,
                };

                const reviewContent = await generateReview(productInfo);

                // Contentfulエントリーを更新
                entry.fields.reviewContent = {
                    'en-US': {
                        nodeType: 'document',
                        data: {},
                        content: [
                            {
                                nodeType: 'paragraph',
                                data: {},
                                content: [
                                    {
                                        nodeType: 'text',
                                        value: reviewContent,
                                        marks: [],
                                        data: {},
                                    },
                                ],
                            },
                        ],
                    },
                };

                const updatedEntry = await entry.update();
                await updatedEntry.publish();

                console.log('  ✅ AI記事を生成・公開しました');
                console.log(`  文字数: ${reviewContent.length}文字`);

                successCount++;

                // レート制限対策（2秒待機）
                await new Promise((resolve) => setTimeout(resolve, 2000));
            } catch (error: any) {
                console.error(`  ❌ エラー: ${error.message}`);
                errorCount++;
            }
        }

        console.log(`\n\n📊 AI記事生成結果`);
        console.log(`成功: ${successCount}件`);
        console.log(`失敗: ${errorCount}件`);
        console.log(`\n✨ AI記事生成完了！`);
    } catch (error: any) {
        console.error(`\n❌ エラー: ${error.message}`);
        process.exit(1);
    }
}

// コマンドライン引数を解析
const args = process.argv.slice(2);
const limitIndex = args.indexOf('--limit');
const productIdIndex = args.indexOf('--product-id');

const limit = limitIndex !== -1 ? parseInt(args[limitIndex + 1]) : 5;
const productId = productIdIndex !== -1 ? args[productIdIndex + 1] : undefined;

generateReviews({ limit, productId });
