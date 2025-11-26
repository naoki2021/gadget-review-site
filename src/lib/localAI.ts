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
以下の商品について、SEOに最適化された2000文字のレビュー記事を日本語で作成してください。

商品名: ${productData.title}
ブランド: ${productData.brand || '不明'}
カテゴリー: ${productData.category}
価格: ¥${productData.price.toLocaleString()}
スペック: ${JSON.stringify(productData.specs, null, 2)}

記事構成:
1. 導入（100文字）- 読者の興味を引く
2. 商品概要（300文字）- 基本情報とターゲットユーザー
3. 主な特徴（500文字）- 3-5つの主要機能を詳しく解説
4. メリット（400文字）- 実際の使用感を含めた利点
5. デメリット・注意点（300文字）- 正直な評価
6. おすすめユーザー（200文字）- どんな人に向いているか
7. まとめ（200文字）- 総合評価と購入判断のポイント

重要なポイント:
- SEOキーワード「${productData.title}」「レビュー」「口コミ」「評価」を自然に含める
- 具体的な数値やスペックを活用する
- 読者の悩みを解決する視点で書く
- 売り込みではなく、客観的な評価を心がける

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
