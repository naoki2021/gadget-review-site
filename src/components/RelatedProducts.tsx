import Link from 'next/link';
import { Product } from '@/lib/contentful';

interface RelatedProductsProps {
    products: Product[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
    if (products.length === 0) {
        return null;
    }

    return (
        <section className="mt-12">
            <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-slate-100">
                関連商品
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => {
                    const imageUrl = (product.fields.mainImage as any)?.fields?.file?.url
                        ? `https:${(product.fields.mainImage as any).fields.file.url}`
                        : null;

                    return (
                        <Link
                            key={product.sys.id}
                            href={`/products/${product.fields.slug}`}
                            className="group overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg dark:bg-slate-800"
                        >
                            <div className="h-32 bg-slate-200 dark:bg-slate-700">
                                {imageUrl ? (
                                    <img
                                        src={imageUrl}
                                        alt={product.fields.title}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center text-slate-400">
                                        No Image
                                    </div>
                                )}
                            </div>
                            <div className="p-4">
                                <div className="mb-1 text-xs font-medium text-blue-600 dark:text-blue-400">
                                    {product.fields.category}
                                </div>
                                <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                                    {product.fields.title}
                                </h3>
                                <div className="flex items-center justify-between">
                                    <span className="text-lg font-bold text-slate-900 dark:text-slate-100">
                                        ¥{(product.fields.price as number).toLocaleString()}
                                    </span>
                                    {product.fields.rating && (
                                        <div className="flex items-center text-yellow-400">
                                            <span className="text-xs">
                                                {'★'.repeat(product.fields.rating as number)}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
