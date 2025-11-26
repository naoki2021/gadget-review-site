export default function Home() {
  return (
    <div className="space-y-12">
      {/* ヒーローセクション */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-12 text-white">
        <div className="relative z-10">
          <h1 className="mb-4 text-5xl font-bold leading-tight">
            最新ガジェット・家電の
            <br />
            徹底レビュー
          </h1>
          <p className="mb-8 text-xl text-white/90">
            実際の使用感をもとに、詳しく解説します
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#latest-reviews"
              className="btn-primary rounded-full bg-white px-8 py-3 font-semibold text-blue-600 hover:bg-white/90 transition-all"
            >
              最新レビューを見る
            </a>
            <a
              href="#categories"
              className="rounded-full border-2 border-white px-8 py-3 font-semibold text-white hover:bg-white/10 transition-all"
            >
              カテゴリーから探す
            </a>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20"></div>
      </section>

      {/* カテゴリーセクション */}
      <section id="categories" className="space-y-6">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
          カテゴリーから探す
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <a
              key={category.slug}
              href={`/category/${category.slug}`}
              className="card-hover group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg dark:bg-slate-800"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-3xl">
                {category.icon}
              </div>
              <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
                {category.name}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {category.description}
              </p>
              <div className="mt-4 flex items-center text-sm font-medium text-blue-600 dark:text-blue-400">
                レビューを見る
                <svg
                  className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* 最新レビューセクション */}
      <section id="latest-reviews" className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            最新レビュー
          </h2>
          <a
            href="/reviews"
            className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            すべて見る →
          </a>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* プレースホルダー（Contentful連携後に動的に表示） */}
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="card-hover overflow-hidden rounded-2xl bg-white shadow-lg dark:bg-slate-800"
            >
              <div className="h-48 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600"></div>
              <div className="p-6">
                <div className="mb-2 text-sm font-medium text-blue-600 dark:text-blue-400">
                  カテゴリー
                </div>
                <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
                  商品名がここに入ります
                </h3>
                <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
                  レビュー概要がここに入ります。実際の使用感をもとに詳しく解説します。
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="h-5 w-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    ¥39,800
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTAセクション */}
      <section className="rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 p-12 text-center text-white">
        <h2 className="mb-4 text-3xl font-bold">
          最新のガジェット情報をお届けします
        </h2>
        <p className="mb-8 text-lg text-white/90">
          新しいレビュー記事を随時更新中
        </p>
        <a
          href="/reviews"
          className="btn-primary inline-block rounded-full bg-white px-8 py-3 font-semibold text-blue-600 hover:bg-white/90 transition-all"
        >
          レビュー一覧を見る
        </a>
      </section>
    </div>
  );
}

const categories = [
  {
    name: 'ワイヤレスイヤホン',
    slug: 'wireless-earphones',
    icon: '🎧',
    description: 'AirPods、Galaxy Budsなど人気イヤホンをレビュー',
  },
  {
    name: 'スマートウォッチ',
    slug: 'smartwatch',
    icon: '⌚',
    description: 'Apple Watch、Fitbitなど最新モデルを比較',
  },
  {
    name: 'ノートPC',
    slug: 'laptop',
    icon: '💻',
    description: 'MacBook、Surface、ThinkPadなどを徹底解説',
  },
  {
    name: 'スマートフォン',
    slug: 'smartphone',
    icon: '📱',
    description: 'iPhone、Galaxyなど最新スマホをレビュー',
  },
  {
    name: 'カメラ',
    slug: 'camera',
    icon: '📷',
    description: 'ミラーレス、一眼レフ、アクションカメラを比較',
  },
  {
    name: 'タブレット',
    slug: 'tablet',
    icon: '📲',
    description: 'iPad、Androidタブレットをレビュー',
  },
];
