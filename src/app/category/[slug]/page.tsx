import { getProductsByCategory } from '@/lib/contentful';
import Link from 'next/link';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const CATEGORY_INFO: Record<string, { name: string; description: string; icon: string }> = {
    'wireless-earphones': {
        name: 'ワイヤレスイヤホン',
        description: '最新のノイズキャンセリングモデルから高音質モデルまで',
        icon: '🎧',
    },
    'smart-watches': {
        name: 'スマートウォッチ',
        description: '健康管理からビジネスまで使える多機能モデル',
        icon: '⌚️',
    },
    'gadgets': {
        name: 'ガジェット',
        description: '生活を便利にする最新ガジェット',
        icon: '📱',
    },
    'smart-glasses': {
        name: 'スマートグラス',
        description: 'AR/VR機能を搭載した次世代ウェアラブルデバイス',
        icon: '👓',
    },
    'laptops': {
        name: 'ノートPC',
        description: 'ビジネスからゲーミングまで幅広いラインナップ',
        icon: '💻',
    },
    'smartphones': {
        name: 'スマートフォン',
        description: '最新のフラッグシップモデルから格安スマホまで',
        icon: '📱',
    },
    'cameras': {
        name: 'カメラ',
        description: 'ミラーレスからアクションカメラまで',
        icon: '📷',
    },
    'tablets': {
        name: 'タブレット',
        description: 'エンタメから仕事まで使える万能デバイス',
        icon: '📱',
    },
};

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: PageProps) {
    headers();

    const { slug } = await params;
    const categoryInfo = CATEGORY_INFO[slug];

    if (!categoryInfo) {
        notFound();
    }

    const products = await getProductsByCategory(categoryInfo.name);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            <div className="container mx-auto px-4 py-12">
                {/* ヘッダー */}
                <div className="mb-12 text-center">
                    <div className="mb-4 text-6xl">{categoryInfo.icon}</div>
                    <h1 className="mb-4 text-4xl font-bold text-slate-900 dark:text-slate-100">
                        {categoryInfo.name}
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400">
                        {categoryInfo.description}
                    </p>
                </div>

                {/* 商品一覧 */}
                {products.length === 0 ? (
                    <div className="rounded-2xl bg-white p-12 text-center shadow-lg dark:bg-slate-800">
                        <p className="text-lg text-slate-600 dark:text-slate-400">
                            このカテゴリーの商品はまだありません
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {products.map((product) => {
                            const imageUrl = (product.fields.mainImage as any)?.fields?.file?.url
                                ? `https:${(product.fields.mainImage as any).fields.file.url}`
                                : 'https://placehold.co/600x400?text=No+Image';

                            return (
                                <Link
                                    key={product.sys.id}
                                    href={`/products/${product.fields.slug}`}
                                    className="card-hover overflow-hidden rounded-2xl bg-white shadow-lg dark:bg-slate-800 block"
                                >
                                    <div className="h-48 bg-slate-200 dark:bg-slate-700 relative">
                                        {imageUrl.includes('placehold.co') ? (
                                            <div className="w-full h-full flex items-center justify-center text-slate-400">
                                                No Image
                                            </div>
                                        ) : (
                                            <img
                                                src={imageUrl}
                                                alt={product.fields.title}
                                                className="h-full w-full object-cover"
                                            />
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <div className="mb-2 text-sm font-medium text-blue-600 dark:text-blue-400">
                                            {product.fields.category}
                                        </div>
                                        <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-slate-100 line-clamp-2">
                                            {product.fields.title}
                                        </h3>
                                        <div className="flex items-center justify-between">
                                            <span className="text-lg font-bold text-slate-900 dark:text-slate-100">
                                                ¥{(product.fields.price as number).toLocaleString()}
                                            </span>
                                            {product.fields.rating && (
                                                <div className="flex items-center text-yellow-400">
                                                    {'★'.repeat(product.fields.rating as number)}
                                                    <span className="ml-1 text-sm text-slate-600 dark:text-slate-400">
                                                        ({product.fields.rating})
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}

                {/* 戻るリンク */}
                <div className="mt-12 text-center">
                    <Link
                        href="/"
                        className="inline-block rounded-full bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700 transition-all"
                    >
                        トップページに戻る
                    </Link>
                </div>
            </div>
        </div>
    );
}
