import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'ガジェットレビュー | 最新ガジェット・家電の徹底レビュー',
    template: '%s | ガジェットレビュー',
  },
  description:
    '最新のガジェット・家電を徹底レビュー。ワイヤレスイヤホン、スマートウォッチ、ノートPC、スマートフォン、カメラなど、実際の使用感をもとに詳しく解説します。',
  keywords: [
    'ガジェット',
    'レビュー',
    '家電',
    'ワイヤレスイヤホン',
    'スマートウォッチ',
    'ノートPC',
    'スマートフォン',
    'カメラ',
    '口コミ',
    '評価',
  ],
  authors: [{ name: 'ガジェットレビュー編集部' }],
  creator: 'ガジェットレビュー',
  publisher: 'ガジェットレビュー',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://gadget-review.vercel.app',
    title: 'ガジェットレビュー | 最新ガジェット・家電の徹底レビュー',
    description:
      '最新のガジェット・家電を徹底レビュー。実際の使用感をもとに詳しく解説します。',
    siteName: 'ガジェットレビュー',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ガジェットレビュー | 最新ガジェット・家電の徹底レビュー',
    description:
      '最新のガジェット・家電を徹底レビュー。実際の使用感をもとに詳しく解説します。',
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={inter.variable}>
      <body className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 antialiased">
        <header className="sticky top-0 z-50 w-full border-b border-slate-200/50 bg-white/80 backdrop-blur-lg dark:border-slate-800/50 dark:bg-slate-900/80">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <a href="/" className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                <span className="text-xl font-bold text-white">G</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ガジェットレビュー
              </span>
            </a>
            <nav className="hidden md:flex items-center space-x-6">
              <a
                href="/category/wireless-earphones"
                className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
              >
                イヤホン
              </a>
              <a
                href="/category/smartwatch"
                className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
              >
                スマートウォッチ
              </a>
              <a
                href="/category/laptop"
                className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
              >
                ノートPC
              </a>
              <a
                href="/category/smartphone"
                className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
              >
                スマホ
              </a>
              <a
                href="/category/camera"
                className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
              >
                カメラ
              </a>
            </nav>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">{children}</main>
        <footer className="mt-16 border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div>
                <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
                  ガジェットレビュー
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  最新のガジェット・家電を徹底レビュー。実際の使用感をもとに詳しく解説します。
                </p>
              </div>
              <div>
                <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
                  カテゴリー
                </h3>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li>
                    <a href="/category/wireless-earphones" className="hover:text-slate-900 dark:hover:text-slate-100">
                      ワイヤレスイヤホン
                    </a>
                  </li>
                  <li>
                    <a href="/category/smartwatch" className="hover:text-slate-900 dark:hover:text-slate-100">
                      スマートウォッチ
                    </a>
                  </li>
                  <li>
                    <a href="/category/laptop" className="hover:text-slate-900 dark:hover:text-slate-100">
                      ノートPC
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
                  サイト情報
                </h3>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li>
                    <a href="/about" className="hover:text-slate-900 dark:hover:text-slate-100">
                      サイトについて
                    </a>
                  </li>
                  <li>
                    <a href="/privacy" className="hover:text-slate-900 dark:hover:text-slate-100">
                      プライバシーポリシー
                    </a>
                  </li>
                  <li>
                    <a href="/contact" className="hover:text-slate-900 dark:hover:text-slate-100">
                      お問い合わせ
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8 border-t border-slate-200 pt-8 text-center text-sm text-slate-600 dark:border-slate-800 dark:text-slate-400">
              © 2024 ガジェットレビュー. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
