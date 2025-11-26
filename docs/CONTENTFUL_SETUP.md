# Contentful設定ガイド

このガイドに従って、Contentfulアカウントを作成し、商品データベースを構築します。

## 1. Contentfulアカウント作成

### ステップ1: アカウント登録

1. [Contentful公式サイト](https://www.contentful.com/)にアクセス
2. 「Start for free」をクリック
3. メールアドレスとパスワードを入力（またはGitHubアカウントでサインアップ）
4. メール認証を完了

### ステップ2: 初回セットアップ

**重要**: 最近のContentfulは初回サインアップ時に自動的にスペースを作成し、すぐにContent Model定義画面に誘導されます。これは正常な動作です。

そのまま次のステップ（Content Model定義）に進んでください。

## 2. Content Model定義

### Productモデルの作成

初回ログイン時は自動的にContent Model作成画面が表示されます。表示されない場合：

1. 左サイドバーから「Content model」をクリック
2. 「Add content type」または「Create content type」をクリック

以下の設定を入力：
- Name: `Product`
- API Identifier: `product`（自動生成されます）
- Description: `ガジェット・家電商品`

「Create」または「Create and configure」をクリック

### フィールド追加の基本手順

各フィールドは以下の流れで追加します：

1. 「Add field」をクリック
2. フィールドタイプを選択（Text、Number、Date and timeなど）
3. Name（フィールド名）を入力
4. 「Create and configure」をクリック
5. 必要に応じて Settings、Validations、Appearance を設定
6. 「Confirm」をクリック

### フィールド一覧

以下のフィールドを順番に追加します：

#### 1. title（商品名）

**フィールド作成**:
- Field type: **Text** を選択
- Name: `title`
- 「Create and configure」をクリック

**Settings タブ**:
- 「Required field」をチェック ✅
- 「Confirm」をクリック

---

#### 2. slug（URL用スラッグ）

**フィールド作成**:
- Field type: **Text** を選択
- Name: `slug`
- 「Create and configure」をクリック

**Validations タブ**:
- 「Unique」をチェック ✅
- 「Confirm」をクリック

**Settings タブ**:
- 「Required field」をチェック ✅
- 「Confirm」をクリック

---

#### 3. category（カテゴリー）⚠️ 重要

**フィールド作成**:
- Field type: **Text** を選択
- Name: `category`
- 「Create and configure」をクリック

**⚠️ 重要: 以下の順番で設定してください**

**ステップ1 - Validations タブ**（先にこれを設定）:
1. 「Accept only specified values」をクリック
2. 以下の値を1つずつ追加：
   - `ワイヤレスイヤホン`
   - `スマートウォッチ`
   - `ノートPC`
   - `スマートフォン`
   - `カメラ`
   - `タブレット`
3. 「Confirm」をクリック

**ステップ2 - Appearance タブ**（Validations設定後）:
1. 「Dropdown」を選択
2. 「Confirm」をクリック

**ステップ3 - Settings タブ**:
1. 「Required field」をチェック ✅
2. 「Confirm」をクリック
---

#### 4. brand（ブランド）

**フィールド作成**:
- Field type: **Text** を選択
- Name: `brand`
- 「Create and configure」をクリック
- そのまま「Confirm」をクリック（任意フィールド）

---

#### 5. price（価格）

**フィールド作成**:
- Field type: **Number** を選択
- Name: `price`
- 「Create and configure」をクリック

**Settings タブ**:
- 「Required field」をチェック ✅
- 「Confirm」をクリック

---

#### 6. rakutenUrl（楽天アフィリエイトURL）

**フィールド作成**:
- Field type: **Text** を選択
- Name: `rakutenUrl`
- 「Create and configure」をクリック

**Settings タブ**:
- 「Required field」をチェック ✅
- 「Confirm」をクリック

---

#### 7. amazonUrl（AmazonアフィリエイトURL）

**フィールド作成**:
- Field type: **Text** を選択
- Name: `amazonUrl`
- 「Create and configure」をクリック
- そのまま「Confirm」をクリック（任意フィールド）

---

#### 8. mainImage（メイン画像）

**フィールド作成**:
- Field type: **Media** を選択
- Name: `mainImage`
- 「Create and configure」をクリック

**Validations タブ**:
- 「Accept only specified file types」をクリック
- 「Images」のみチェック ✅
- 「Confirm」をクリック

**Settings タブ**:
- 「Required field」をチェック ✅
- 「Confirm」をクリック

---

#### 9. specs（スペック情報）

**フィールド作成**:
- Field type: **JSON object** を選択
- Name: `specs`
- 「Create and configure」をクリック
- そのまま「Confirm」をクリック

---

#### 10. rating（評価）

**フィールド作成**:
- Field type: **Number** を選択
- Name: `rating`
- 「Create and configure」をクリック

**Validations タブ**:
- 「Value range」をクリック
- Minimum: `1`
- Maximum: `5`
- 「Confirm」をクリック

---

#### 11. reviewContent（レビュー本文）

**フィールド作成**:
- Field type: **Rich text** を選択
- Name: `reviewContent`
- 「Create and configure」をクリック

**Settings タブ**:
- 「Required field」をチェック ✅
- 「Confirm」をクリック

---

#### 12. pros（メリット）

**フィールド作成**:
- Field type: **Text** を選択
- Name: `pros`
- 「Create and configure」をクリック

**Appearance タブ**:
- 「List」を選択
- 「Confirm」をクリック

---

#### 13. cons（デメリット）

**フィールド作成**:
- Field type: **Text** を選択
- Name: `cons`
- 「Create and configure」をクリック

**Appearance タブ**:
- 「List」を選択
- 「Confirm」をクリック

---

#### 14. publishedDate（公開日）

**フィールド作成**:
- Field type: **Date and time** を選択
- Name: `publishedDate`
- 「Create and configure」をクリック

**Settings タブ**:
- 「Required field」をチェック ✅
- 「Confirm」をクリック

---

### 保存

すべてのフィールドを追加したら、右上の「Save」をクリック

**最小構成で試す場合**: 最初は以下の6フィールドだけでも動作確認できます：
- title
- slug
- category
- price
- rakutenUrl
- publishedDate

## 3. API Key取得

### Content Delivery API（読み取り用）

1. 左サイドバーから「Settings」→「API keys」をクリック
2. 「Add API key」をクリック
3. 名前を入力（例: "Production"）
4. 「Save」をクリック
5. 以下の情報をコピー：
   - **Space ID**
   - **Content Delivery API - access token**

### Content Management API（書き込み用）

1. 同じページで「Content Management tokens」タブをクリック
2. 「Generate personal token」をクリック
3. 名前を入力（例: "Auto Import"）
4. 「Generate」をクリック
5. **Personal access token**をコピー

## 4. 環境変数設定

プロジェクトルートに`.env.local`ファイルを作成：

```bash
cd /Users/naoki/small_monetize/gadget-review-site
cp env.example .env.local
```

`.env.local`を編集して、以下の値を設定：

```env
CONTENTFUL_SPACE_ID=your_space_id_here
CONTENTFUL_ACCESS_TOKEN=your_access_token_here
CONTENTFUL_MANAGEMENT_TOKEN=your_management_token_here

RAKUTEN_APP_ID=your_rakuten_app_id_here

NEXT_PUBLIC_GA_ID=your_ga_id_here
```

## 5. 楽天アプリID取得

### ステップ1: 楽天デベロッパー登録

1. [楽天ウェブサービス](https://webservice.rakuten.co.jp/)にアクセス
2. 「新規アプリ登録」をクリック
3. 楽天会員IDでログイン
4. アプリ情報を入力：
   - アプリ名: `ガジェットレビューサイト`
   - アプリURL: `http://localhost:3000`（開発用）
5. 利用規約に同意して「新規アプリを作成」をクリック

### ステップ2: アプリIDコピー

1. 作成したアプリの詳細ページで「アプリID/デベロッパーID」を確認
2. **アプリID**をコピー
3. `.env.local`の`RAKUTEN_APP_ID`に貼り付け

## 6. 動作確認

環境変数が正しく設定されているか確認：

```bash
cd /Users/naoki/small_monetize/gadget-review-site
npm run dev
```

開発サーバーが起動したら、次のステップ（楽天API連携）に進みます。

## トラブルシューティング

### Contentfulに接続できない

- Space IDとAccess Tokenが正しいか確認
- `.env.local`ファイルがプロジェクトルートにあるか確認
- 開発サーバーを再起動

### 楽天APIが動作しない

- アプリIDが正しいか確認
- 楽天ウェブサービスの利用規約に同意しているか確認
- APIリクエスト制限（1秒に1リクエスト）を守っているか確認

## 次のステップ

1. ✅ Contentfulアカウント作成
2. ✅ Content Model定義
3. ✅ API Key取得
4. ✅ 環境変数設定
5. ✅ 楽天アプリID取得
6. → 楽天API連携スクリプト実行
7. → AI記事生成
8. → 最初の5記事公開
