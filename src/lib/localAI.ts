import axios from 'axios';

const OLLAMA_API_URL = 'http://localhost:11434/api/generate';
const MODEL = 'llama3.1:8b';

export interface ProductData {
    title: string;
    category: string;
    price: number;
    specs: any;
    brand?: string;
}

export async function generateReview(productData: ProductData): Promise<string> {
    const prompt = `あなたはガジェットレビューの専門家です。
以下の商品について、ユーザーの悩みに寄り添った、親しみやすいレビュー記事を日本語で作成してください。

商品名: ${productData.title}
ブランド: ${productData.brand || '不明'}
カテゴリー: ${productData.category}
価格: ¥${productData.price.toLocaleString()}
スペック: ${JSON.stringify(productData.specs, null, 2)}

記事構成:

## 1. 導入文（150文字）
- ユーザーの悩みに共感する書き出し
- 例：「${productData.category}って種類が多すぎて、どれを選べばいいか分からない...そんな悩みを持っている方も多いのではないでしょうか。」
- 親しみやすい語り口（「〜ですよね」「〜だと思います」など）

## 2. この記事で分かること（100文字）
- 箇条書きで3〜4項目
- 例：
  - ${productData.title}の特徴と他製品との違い
  - 実際に使ってみた感想
  - どんな人におすすめか

## 3. 商品の基本情報（300文字）
- 商品の概要
- ターゲットユーザー
- 主な用途

## 4. 実際に使ってみた感想（800文字）

### メリット（良かった点）
- 3つの具体的なメリット
- それぞれ具体的なエピソードや数値を含める
- 例：「音質が素晴らしい」→「特にクラシック音楽を聴いた時の繊細な音の表現力に驚きました」

### デメリット（気になった点）
- 2つの正直な評価
- ただし、フォローも入れる
- 例：「価格が高めですが、この品質なら納得できます」

## 5. こんな人におすすめ（200文字）
- ✅ おすすめな人（3項目）
- ❌ おすすめしない人（1〜2項目）

## 6. よくある質問（FAQ）（300文字）
- Q&A形式で2〜3個
- 例：
  Q: バッテリーはどのくらい持ちますか？
  A: 実際に使用したところ、約8時間連続で使用できました。

## 7. まとめ（150文字）
- 総合評価
- 購入判断のポイント
- 「結論として、${productData.title}は〜」で始める

重要なポイント:
- 親しみやすく、読者に語りかけるような文体
- 具体的な使用シーンやエピソードを含める
- SEOキーワード「${productData.title}」「レビュー」「口コミ」を自然に含める
- 売り込みではなく、客観的で正直な評価
- 見出しは「##」で明確に区切る

それでは記事を作成してください:`;

    try {
        const response = await axios.post(
            OLLAMA_API_URL,
            {
                model: MODEL,
                prompt: prompt,
                stream: false,
                options: {
                    temperature: 0.7,
                    top_p: 0.9,
                },
            },
            {
                timeout: 300000, // 5分タイムアウト
            }
        );

        return response.data.response;
    } catch (error) {
        console.error('AI記事生成エラー:', error);
        throw new Error('AI記事生成に失敗しました');
    }
}

export async function generateComparison(
    products: ProductData[]
): Promise<string> {
    const productList = products
        .map(
            (p, i) =>
                `${i + 1}. ${p.title} (¥${p.price.toLocaleString()}) - ${p.brand || '不明'}`
        )
        .join('\n');

    const prompt = `あなたはガジェット比較の専門家です。
以下の商品を比較した記事を日本語で作成してください。

比較商品:
${productList}

記事構成:
1. 導入（100文字）- 比較の目的
2. 各商品の概要（各200文字）
3. スペック比較表
4. 価格比較
5. 用途別おすすめ
6. まとめ

それでは記事を作成してください:`;

    try {
        const response = await axios.post(
            OLLAMA_API_URL,
            {
                model: MODEL,
                prompt: prompt,
                stream: false,
                options: {
                    temperature: 0.7,
                },
            },
            {
                timeout: 300000,
            }
        );

        return response.data.response;
    } catch (error) {
        console.error('AI比較記事生成エラー:', error);
        throw new Error('AI比較記事生成に失敗しました');
    }
}

export async function testOllamaConnection(): Promise<boolean> {
    try {
        const response = await axios.post(
            OLLAMA_API_URL,
            {
                model: MODEL,
                prompt: 'こんにちは',
                stream: false,
            },
            {
                timeout: 30000,
                headers: {
                    'Content-Type': 'application/json',
                },
                validateStatus: (status) => status === 200,
            }
        );

        return response.status === 200 && response.data.response;
    } catch (error: any) {
        console.error('Ollama接続エラー:', error.message);
        if (error.code === 'ECONNREFUSED') {
            console.error('Ollamaサービスが起動していません');
        }
        return false;
    }
}
