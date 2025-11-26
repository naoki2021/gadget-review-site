import { testOllamaConnection, generateReview } from '../src/lib/localAI';

async function main() {
    console.log('🔍 Ollama接続テスト中...\n');

    const isConnected = await testOllamaConnection();

    if (!isConnected) {
        console.error('❌ Ollamaに接続できません');
        console.error('以下を確認してください:');
        console.error('1. Ollamaサービスが起動しているか: brew services list');
        console.error('2. Llama 3.1モデルがダウンロードされているか: ollama list');
        process.exit(1);
    }

    console.log('✅ Ollama接続成功！\n');
    console.log('🤖 AI記事生成デモを開始します...\n');

    const testProduct = {
        title: 'AirPods Pro（第2世代）',
        category: 'ワイヤレスイヤホン',
        price: 39800,
        brand: 'Apple',
        specs: {
            ノイズキャンセリング: 'あり',
            バッテリー: '最大6時間（ANC使用時）',
            防水: 'IPX4',
            接続: 'Bluetooth 5.3',
        },
    };

    console.log('📝 テスト商品情報:');
    console.log(JSON.stringify(testProduct, null, 2));
    console.log('\n⏳ AI記事生成中...（3-5分かかります）\n');

    try {
        const review = await generateReview(testProduct);

        console.log('\n✅ AI記事生成完了！\n');
        console.log('='.repeat(80));
        console.log(review);
        console.log('='.repeat(80));
        console.log('\n✨ デモ完了！');
        console.log('\n次のステップ:');
        console.log('1. Contentfulアカウントを作成');
        console.log('2. .env.localファイルを設定');
        console.log('3. npm run devで開発サーバーを起動');
    } catch (error) {
        console.error('❌ AI記事生成エラー:', error);
        process.exit(1);
    }
}

main();
