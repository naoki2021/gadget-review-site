import { config } from 'dotenv';
import { resolve } from 'path';
import { createClient } from 'contentful';

// 環境変数を読み込み
config({ path: resolve(__dirname, '../.env.local') });

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID!;
const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN!;

const client = createClient({
    space: SPACE_ID,
    accessToken: ACCESS_TOKEN,
});

async function checkData() {
    console.log('🔍 Contentfulのデータを確認中...');
    console.log(`Space ID: ${SPACE_ID}`);

    try {
        const entries = await client.getEntries({
            content_type: 'product',
            limit: 100,
        });

        console.log(`\n📦 商品数: ${entries.total}件`);

        if (entries.total === 0) {
            console.log('⚠️ 商品が見つかりません。');
        } else {
            console.log('\n最新の商品:');
            entries.items.slice(0, 5).forEach((entry: any) => {
                console.log(`- ${entry.fields.title} (Status: ${entry.sys.revision > 0 ? 'Published' : 'Draft'})`);
                console.log(`  ID: ${entry.sys.id}`);
                console.log(`  Created: ${entry.sys.createdAt}`);
            });
        }
    } catch (error: any) {
        console.error(`❌ エラー: ${error.message}`);
    }
}

checkData();
