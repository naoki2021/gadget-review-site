import { config } from 'dotenv';
import { resolve } from 'path';
import { createClient } from 'contentful-management';

// 環境変数を読み込み
config({ path: resolve(__dirname, '../.env.local') });

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID!;
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN!;

const client = createClient({
    accessToken: MANAGEMENT_TOKEN,
});

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

    return 'ガジェット';
}

async function fixCategories() {
    console.log('🔧 既存商品のカテゴリーを修正中...\n');

    try {
        const space = await client.getSpace(SPACE_ID);
        const environment = await space.getEnvironment('master');

        const entries = await environment.getEntries({
            content_type: 'product',
        });

        console.log(`📦 ${entries.items.length}件の商品を確認中...\n`);

        let updatedCount = 0;

        for (const entry of entries.items) {
            const title = entry.fields.title?.['en-US'] as string;
            const currentCategory = entry.fields.category?.['en-US'] as string;
            const detectedCategory = detectCategory(title);

            if (currentCategory !== detectedCategory) {
                console.log(`\n📝 ${title}`);
                console.log(`  現在: ${currentCategory} → 修正後: ${detectedCategory}`);

                entry.fields.category = {
                    'en-US': detectedCategory,
                };

                const updatedEntry = await entry.update();
                await updatedEntry.publish();

                console.log('  ✅ 更新・公開完了');
                updatedCount++;

                // レート制限対策
                await new Promise((resolve) => setTimeout(resolve, 1000));
            } else {
                console.log(`✓ ${title} (カテゴリー: ${currentCategory}) - 変更なし`);
            }
        }

        console.log(`\n\n📊 修正結果`);
        console.log(`更新: ${updatedCount}件`);
        console.log(`変更なし: ${entries.items.length - updatedCount}件`);
        console.log(`\n✨ カテゴリー修正完了！`);
    } catch (error: any) {
        console.error(`\n❌ エラー: ${error.message}`);
        process.exit(1);
    }
}

fixCategories();
