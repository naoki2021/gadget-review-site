import { Metadata } from 'next';
import { notFound } from 'next/navigation';

// プレースホルダーデータ（Contentful連携後に削除）
const mockProduct = {
    title: 'AirPods Pro（第2世代）',
    slug: 'airpods-pro-2',
    category: 'ワイヤレスイヤホン',
    brand: 'Apple',
    price: 39800,
    rating: 4.5,
    rakutenUrl: 'https://rakuten.co.jp',
    amazonUrl: 'https://amazon.co.jp',
    mainImage: '/placeholder.jpg',
    specs: {
        ノイズキャンセリング: 'あり',
        バッテリー: '最大6時間（ANC使用時）',
        防水: 'IPX4',
        接続: 'Bluetooth 5.3',
    },
    pros: [
        '優れたノイズキャンセリング性能',
        '快適な装着感',
        'Apple製品との高い親和性',
    ],
    cons: ['価格が高め', 'Android端末では一部機能が制限される'],
    reviewContent: `
# AirPods Pro（第2世代）レビュー

Apple の最新ワイヤレスイヤホン「AirPods Pro（第2世代）」を実際に使用してレビューします。

## 商品概要

AirPods Pro（第2世代）は、Appleが2022年に発売したプレミアムワイヤレスイヤホンです。
優れたノイズキャンセリング機能と、Apple製品との高い親和性が特徴です。

## 主な特徴

### 1. 進化したノイズキャンセリング

第1世代と比較して、ノイズキャンセリング性能が大幅に向上しています。
電車内や飛行機内でも、周囲の騒音をしっかりと遮断してくれます。

### 2. 快適な装着感

耳の形状に合わせた設計で、長時間の使用でも疲れにくいです。
付属のイヤーチップは3サイズあり、自分に合ったサイズを選べます。

### 3. Apple製品との連携

iPhoneやMacとの接続が非常にスムーズです。
デバイス間の切り替えも自動で行われます。

## メリット

実際に使用して感じたメリットをまとめます。

- **優れたノイズキャンセリング**: 電車内でも音楽に集中できる
- **快適な装着感**: 長時間使用しても耳が痛くならない
- **Apple製品との親和性**: iPhoneとの接続が瞬時

## デメリット・注意点

一方で、以下のような点には注意が必要です。

- **価格が高め**: 約4万円と高価格帯
- **Android端末では制限**: 一部機能がiPhoneでしか使えない

## おすすめユーザー

以下のような方におすすめです。

- iPhoneユーザー
- 高品質なノイズキャンセリングを求める方
- 通勤・通学で電車を利用する方

## まとめ

AirPods Pro（第2世代）は、高価格ではありますが、その価格に見合った性能を持つ
優れたワイヤレスイヤホンです。特にiPhoneユーザーには強くおすすめできます。
  `,
    publishedDate: '2024-11-25',
};

export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    // TODO: Contentfulから商品情報を取得
    const product = mockProduct;

    return {
        title: `${product.title} レビュー | 口コミ・評価`,
        description: `${product.title}の詳細レビュー。実際の使用感、メリット・デメリット、おすすめユーザーを解説します。価格: ¥${product.price.toLocaleString()}`,
        keywords: [
            product.title,
            'レビュー',
            '口コミ',
            '評価',
            product.category,
            product.brand,
        ],
        openGraph: {
            title: `${product.title} レビュー`,
            description: `${product.title}の詳細レビュー。実際の使用感をもとに解説します。`,
            type: 'article',
            publishedTime: product.publishedDate,
        },
    };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
    // TODO: Contentfulから商品情報を取得
    const product = mockProduct;

    if (!product) {
        notFound();
    }

    return (
        <div className="mx-auto max-w-4xl space-y-8">
            {/* パンくずリスト */}
            <nav className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
                <a href="/" className="hover:text-slate-900 dark:hover:text-slate-100">
                    ホーム
                </a>
                <span>/</span>
                <a
                    href={`/category/${product.category}`}
                    className="hover:text-slate-900 dark:hover:text-slate-100"
                >
                    {product.category}
                </a>
                <span>/</span>
                <span className="text-slate-900 dark:text-slate-100">
                    {product.title}
                </span>
            </nav>

            {/* 商品ヘッダー */}
            <div className="rounded-3xl bg-white p-8 shadow-lg dark:bg-slate-800">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {/* 商品画像 */}
                    <div className="aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600"></div>

                    {/* 商品情報 */}
                    <div className="space-y-6">
                        <div>
                            <div className="mb-2 text-sm font-medium text-blue-600 dark:text-blue-400">
                                {product.category}
                            </div>
                            <h1 className="mb-4 text-4xl font-bold text-slate-900 dark:text-slate-100">
                                {product.title}
                            </h1>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <svg
                                            key={star}
                                            className={`h-6 w-6 ${star <= product.rating
                                                    ? 'text-yellow-400'
                                                    : 'text-slate-300 dark:text-slate-600'
                                                }`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                                    {product.rating}
                                </span>
                            </div>
                        </div>

                        <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                            ¥{product.price.toLocaleString()}
                        </div>

                        {/* アフィリエイトボタン */}
                        <div className="space-y-3">
                            <a
                                href={product.rakutenUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary flex items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-red-600 px-6 py-3 font-semibold text-white hover:from-red-600 hover:to-red-700 transition-all"
                            >
                                <span>楽天で購入する</span>
                                <svg
                                    className="ml-2 h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                    />
                                </svg>
                            </a>
                            {product.amazonUrl && (
                                <a
                                    href={product.amazonUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 font-semibold text-white hover:from-orange-600 hover:to-orange-700 transition-all"
                                >
                                    <span>Amazonで購入する</span>
                                    <svg
                                        className="ml-2 h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                        />
                                    </svg>
                                </a>
                            )}
                        </div>

                        {/* スペック */}
                        <div className="rounded-2xl bg-slate-50 p-6 dark:bg-slate-900">
                            <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
                                主なスペック
                            </h3>
                            <dl className="space-y-2">
                                {Object.entries(product.specs).map(([key, value]) => (
                                    <div
                                        key={key}
                                        className="flex justify-between border-b border-slate-200 pb-2 dark:border-slate-700"
                                    >
                                        <dt className="font-medium text-slate-600 dark:text-slate-400">
                                            {key}
                                        </dt>
                                        <dd className="text-slate-900 dark:text-slate-100">
                                            {value}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                </div>
            </div>

            {/* メリット・デメリット */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="rounded-2xl bg-green-50 p-6 dark:bg-green-900/20">
                    <h3 className="mb-4 text-lg font-semibold text-green-900 dark:text-green-100">
                        ✓ メリット
                    </h3>
                    <ul className="space-y-2">
                        {product.pros.map((pro, index) => (
                            <li
                                key={index}
                                className="flex items-start text-green-800 dark:text-green-200"
                            >
                                <svg
                                    className="mr-2 mt-1 h-5 w-5 flex-shrink-0"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                {pro}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="rounded-2xl bg-red-50 p-6 dark:bg-red-900/20">
                    <h3 className="mb-4 text-lg font-semibold text-red-900 dark:text-red-100">
                        ✗ デメリット
                    </h3>
                    <ul className="space-y-2">
                        {product.cons.map((con, index) => (
                            <li
                                key={index}
                                className="flex items-start text-red-800 dark:text-red-200"
                            >
                                <svg
                                    className="mr-2 mt-1 h-5 w-5 flex-shrink-0"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                {con}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* レビュー本文 */}
            <div className="prose prose-slate max-w-none rounded-3xl bg-white p-8 shadow-lg dark:prose-invert dark:bg-slate-800">
                <div
                    dangerouslySetInnerHTML={{
                        __html: product.reviewContent.replace(/\n/g, '<br />'),
                    }}
                />
            </div>

            {/* CTA */}
            <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center text-white">
                <h3 className="mb-4 text-2xl font-bold">この商品をチェック</h3>
                <p className="mb-6 text-white/90">
                    最安値で購入できるショップを比較しましょう
                </p>
                <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                    <a
                        href={product.rakutenUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary rounded-full bg-white px-8 py-3 font-semibold text-blue-600 hover:bg-white/90 transition-all"
                    >
                        楽天で見る
                    </a>
                    {product.amazonUrl && (
                        <a
                            href={product.amazonUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full border-2 border-white px-8 py-3 font-semibold text-white hover:bg-white/10 transition-all"
                        >
                            Amazonで見る
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
