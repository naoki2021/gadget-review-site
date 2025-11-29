interface AffiliateButtonProps {
    url: string;
    price: number;
    productName: string;
    discount?: string;
    badges?: string[];
}

export default function AffiliateButton({
    url,
    price,
    productName,
    discount,
    badges = ['送料無料', 'ポイント10倍'],
}: AffiliateButtonProps) {
    return (
        <div className="my-8 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 p-6 dark:from-blue-900/20 dark:to-purple-900/20">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <div className="mb-1 text-sm font-medium text-slate-600 dark:text-slate-400">
                        現在の価格
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                            ¥{price.toLocaleString()}
                        </span>
                        {discount && (
                            <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-bold text-white">
                                {discount}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="group mb-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 font-bold text-white shadow-lg transition-all hover:from-blue-700 hover:to-purple-700 hover:shadow-xl"
            >
                <span className="text-lg">楽天で詳細を見る</span>
                <svg
                    className="h-5 w-5 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                </svg>
            </a>

            {badges && badges.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {badges.map((badge, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-1 rounded-full bg-white px-3 py-1 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                        >
                            <svg
                                className="h-4 w-4 text-green-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                            {badge}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
