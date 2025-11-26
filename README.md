# ガジェットレビューサイト

AI自動化を活用したガジェット・家電レビューサイト

## 🚀 特徴

- **完全無料のAI記事生成**: Ollama + Llama 3.1でローカル実行
- **自動商品情報収集**: 楽天API + Amazon PA-API
- **SEO最適化**: Next.js 14 App Router
- **ヘッドレスCMS**: Contentful
- **無料ホスティング**: Vercel

## 📋 必要な環境

- Node.js 18以上
- メモリ: 最低8GB（推奨16GB）
- ストレージ: 10GB以上の空き容量
- Ollama（ローカルAI実行用）

## 🛠️ セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. Ollamaのセットアップ

```bash
# Ollamaインストール（macOS）
brew install ollama

# Ollamaサービス起動
brew services start ollama

# Llama 3.1モデルダウンロード（約4.9GB）
ollama pull llama3.1:8b
```

### 3. Contentfulアカウント作成

1. [Contentful](https://www.contentful.com/)でアカウント作成
2. 新しいスペースを作成
3. Content Modelを定義（詳細は後述）
4. API KeyとSpace IDを取得

### 4. 環境変数の設定

`.env.local`ファイルを作成:

```bash
cp env.example .env.local
```

以下の値を設定:

```env
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token
CONTENTFUL_MANAGEMENT_TOKEN=your_management_token

RAKUTEN_APP_ID=your_rakuten_app_id

NEXT_PUBLIC_GA_ID=your_ga_id
```

### 5. 開発サーバー起動

```bash
npm run dev
```

http://localhost:3000 でアクセス

## 📝 Contentful Content Model

### Product（商品）

- `title` (Short text): 商品名
- `slug` (Short text): URL用スラッグ
- `category` (Short text): カテゴリー
- `brand` (Short text): ブランド
- `price` (Number): 価格
- `rakutenUrl` (Short text): 楽天アフィリエイトURL
- `amazonUrl` (Short text): AmazonアフィリエイトURL
- `mainImage` (Media): メイン画像
- `specs` (Object): スペック情報（JSON）
- `rating` (Number): 評価（1-5）
- `reviewContent` (Rich text): レビュー本文
- `pros` (Short text, list): メリット
- `cons` (Short text, list): デメリット
- `publishedDate` (Date): 公開日

## 🤖 AI記事生成

### レビュー記事生成

```bash
npm run generate-review -- --product-id "product-id-here"
```

### 比較記事生成

```bash
npm run generate-comparison -- --products "id1,id2,id3"
```

### バッチ処理（夜間実行推奨）

```bash
npm run generate-reviews-batch -- --count 10
```

## 🔄 自動化

### 楽天API商品検索

```bash
npm run fetch-rakuten -- --keyword "ワイヤレスイヤホン" --limit 10
```

### 価格更新

```bash
npm run update-prices
```

## 📊 収益目標

| 期間 | 記事数 | 月間PV | 予想収益 |
|------|--------|--------|----------|
| 1ヶ月 | 20記事 | 500 | ¥0-1,000 |
| 2ヶ月 | 50記事 | 2,000 | ¥2,000-5,000 |
| 3ヶ月 | 80記事 | 5,000 | ¥5,000-10,000 |
| 6ヶ月 | 150記事 | 15,000 | ¥15,000-30,000 |

## 🚢 デプロイ

### Vercel

```bash
npm install -g vercel
vercel
```

## 📚 ドキュメント

- [実装プラン](../implementation_plan.md)
- [タスクリスト](../task.md)

## 📄 ライセンス

MIT
