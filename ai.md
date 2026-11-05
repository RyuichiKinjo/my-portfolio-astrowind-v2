# AIプログラミングワークフロー設計書（プロフィールサイト制作）

## 1. プロジェクト概要

- **目的**: Cursor Compose主導のAIプログラミング開発手順および手法の確立
- **開発対象**: 個人プロフィールサイト（プロトタイプ）
- **ベーステンプレート**: AstroWind (`src/pages/homes/personal.astro` をメインランディングページとして採用)

---

## 2. システム構成・技術スタック

| カテゴリ                    | 使用技術 / ツール              | 役割・用途                                          |
| :-------------------------- | :----------------------------- | :-------------------------------------------------- |
| **エディタ / AI**           | Cursor (Composer / Agent)      | コーディング・プロンプトベースでの全自動/半自動操作 |
| **フレームワーク**          | Astro (AstroWind テンプレート) | 静的サイトジェネレーター (SSG)                      |
| **ソース管理**              | GitHub                         | リポジトリ管理・バージョンコントロール              |
| **デプロイ / ホスティング** | Vercel                         | `main` ブランチから自動公開する本番環境             |
| **確認環境**                | GitHub Pages (GitHub Actions)  | `develop` ブランチから自動公開する確認環境          |
| **パッケージマネージャー**  | pnpm                           | 依存関係管理                                        |

---

## 3. Cursor Composer 連携ポリシー

Cursor Compose（Agentモード）を最大限活用し、手動でのコマンド実行やファイル編集を極力避けるためのルールを設定します。

1. **指示の出し方**:
   - 可能な限り「機能単位」「コンポーネント単位」でタスクを分割してComposerに依頼する。
   - ルールファイル（`.cursor/rules/*.mdc`）を作成し、プロジェクトの規約・スタイリング規則（Tailwind CSS・Astro形式）を事前学習させる。
     - ※ 旧形式の `.cursorrules` は非推奨のため使用しない。
2. **Git & GitHub 連携**:
   - Cursor内ターミナルまたはComposerへの指示経由で、Git commit / push、ブランチ作成等を自動化する。
3. **公開フロー（確認環境 → 本番）**:
   - `develop` ブランチへ push → GitHub Actions で **GitHub Pages（確認環境）** に自動公開
     - URL: https://ryuichikinjo.github.io/my-portfolio-astrowind-v2/
   - 確認して問題なければ `develop` を `main` にマージ → **Vercel（本番）** に自動公開
   - 公開先ごとの URL / base の違いは、ビルド時の環境変数 `SITE_URL` / `BASE_PATH` で切り替える（本番値は `src/config.yaml`）。

---

## 4. 開発手順・ワークフロー

### Step 1: プロジェクトの初期セットアップ

1. **AstroWind テンプレートのクローン/セットアップ**
   - Cursor Composer に指示: AstroWind リポジトリをクローンし、必要なパッケージをインストール。
2. **リポジトリ連携 (GitHub)**
   - GitHub 上に `portfolio-site` などのリポジトリを作成し、リモート設定・初回 push。
3. **ホスティング設定 (Vercel)**
   - Vercel コンソール上で GitHub リポジトリと連携（Import Project）。

---

### Step 2: テンプレートの切り替えと構成調整

1. **トップページの差し替え**
   - 原則として `src/pages/homes/personal.astro` のレイアウトと構造を `src/pages/index.astro` に適用（またはルーティングを調整）。
2. **不要なページの整理**
   - 不要なブログ記事データやサンプルページのクリーンアップを Composer に依頼。

---

### Step 3: プロフィール情報のカスタマイズ (要詳細化)

以下のセクションについて、Composer へプロンプトを与えてカスタマイズを進めます。

1. **Hero セクション**
   - 氏名、肩書き、キャッチコピー、プロフィール画像の設定
2. **About / Experience (経歴・スキルの紹介)**
   - 職歴、使用ツール/技術スタック、得意領域
3. **Projects / Portfolio (実績・制作物)**
   - 過去の成果物リンク、画像、簡単な説明
4. **Contact / Social Links**
   - GitHub、X (旧Twitter)、Qiita/Zenn、メールフォームなどの導線

---

## 5. 今後の検討・詳細化が必要な項目（To-Do）

設計書をさらに詰めるため、以下の点について仕様を確定していく必要があります。

- [ ] **掲載コンテンツの詳細**: Heroテキスト、経歴データ、アバター画像の差し替え方針
- [ ] **コンポーネント構成**: `personal.astro` 内で使用されているセクションのうち、残すもの・削除するものの選定
- [x] **`.cursor/rules/*.mdc` の導入**（`project-core.mdc` / `astro-pages.mdc` を作成済み）: Composer が AstroWind の流儀（Tailwind CSS、Astroコンポーネント設計）を崩さないようにするためのプロンプト定義

---

## 6. 次のステップ

ルールは AstroWind の実際の構成を確認したうえで作成するため、以下の順で進める。

1. [x] Step 1-1: AstroWind のクローンとパッケージインストール
2. [x] `.cursor/rules/*.mdc` のルール作成（クローンしたコードの構成をもとに定義）
3. [x] Step 1-2: GitHub リポジトリ連携、GitHub Pages（確認環境）の公開
4. [ ] Step 1-3: Vercel（本番）連携
5. [ ] `personal.astro` から `index.astro` への移行手順の指示文作成
