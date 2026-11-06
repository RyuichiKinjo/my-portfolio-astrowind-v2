# AIプログラミングワークフロー設計書（プロフィールサイト制作）

## 1. プロジェクト概要

- **目的**: Cursor Compose主導のAIプログラミング開発手順および手法の確立
- **開発対象**: 個人プロフィールサイト（プロトタイプ）
- **ベーステンプレート**: AstroWind (`src/pages/homes/personal.astro` をメインランディングページとして採用)

### サイトの目的・方針

- **制作の目的**: システムエンジニアとしての AI 開発スキルアップ。前回は自分でコマンド実行・修正していたため、今回は **Cursor の Agent に任せる練習**として進める。
- **見せたい相手**: 同業の仲間、顧客。自身のポートフォリオとして公開する。
- **掲載内容**: 自分のプロフィール
- **ページ構成**: トップ 1 ページにまとめる（`personal.astro` と同じく、ヘッダーのメニューはページ内リンク）
- **ブログ**: 使わない

### ページ構成（上から順に）

ヘッダー・セクション見出し・ボタンは英語でそろえる（About / Experience / Skills / Works / Tech Stack / Contact）。

| #   | セクション | 使用ウィジェット | 内容                                 |
| :-- | :--------- | :--------------- | :----------------------------------- |
| 1   | Hero       | `Hero`           | 名前・肩書き・キャッチコピー         |
| 2   | About      | `Content`        | 自己紹介文・写真・SNS リンク         |
| 3   | Experience | `Steps`          | 職務経歴                             |
| 4   | Skills     | `Features3`      | 得意領域・スキル                     |
| 5   | Works      | `Projects`       | 制作物・成果物（画像・説明・リンク） |
| 6   | Tech Stack | `Integrations`   | このサイトの使用技術                 |
| 7   | Contact    | `CallToAction`   | 締めの呼びかけ（メールへの導線）     |

- `personal.astro` から外すセクション: 学歴（Education）、お客様の声（Testimonials）、ブログ一覧（BlogLatestPosts）

### 掲載情報の方針

| 項目              | 方針                                                                                     |
| :---------------- | :--------------------------------------------------------------------------------------- |
| サイト名          | `RK Playground`（ヘッダーのロゴ、ブラウザのタブ、検索結果・SNS 共有時の表示）            |
| 表示名            | `Ryuichi Kinjo`（Hero に大きく表示する人物名）                                           |
| プロフィール画像  | 自分の写真（`src/assets/images/` に配置して最適化）                                      |
| 連絡手段          | 公開用メールアドレス `playground.rk@gmail.com`（`mailto:` リンク）。フォームは設置しない |
| SNS・外部サービス | GitHub: https://github.com/RyuichiKinjo 、X: `@rkplayground`（いずれも公開用）           |

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
     - URL: https://rk-playground-v2.vercel.app
   - 公開先ごとの URL / base の違いは、ビルド時の環境変数 `SITE_URL` / `BASE_PATH` で切り替える（本番値は `src/config.yaml`）。

---

## 4. 開発環境・前提

| 項目              | 内容                                                                                                    |
| :---------------- | :------------------------------------------------------------------------------------------------------ |
| OS                | Windows 10                                                                                              |
| Node.js           | ローカル v24 / GitHub Actions は `.nvmrc`（22）                                                         |
| pnpm              | 12.16.1（`npm install -g pnpm --allow-scripts=pnpm` で導入。`package.json` の `packageManager` で固定） |
| GitHub CLI (`gh`) | `winget install GitHub.cli` で導入                                                                      |
| git               | 2.31.1                                                                                                  |

### 認証・権限

- GitHub CLI はブラウザ認証（`gh auth login --web`）でログイン。デバイスコード入力 → Authorize → スマホでの認証まで必要。
- ワークフローファイル（`.github/workflows/`）を push するには `workflow` 権限が必要（`gh auth refresh --scopes workflow`）。
- `gh auth setup-git` により、git の push は GitHub CLI の認証情報を使う。

### 注意点（ハマりどころ）

- Cursor のサンドボックスがこの PC では使えないため、エージェントのコマンド実行は毎回許可が必要。
- git 2.31 は `git commit --trailer` に未対応。Cursor が自動付与する Co-authored-by はメッセージ本文に直接書いて回避している（git を更新すれば不要）。
- Windows の git 設定 `core.autocrlf=true` により改行が CRLF になり Prettier が失敗したため、`.gitattributes` で LF に固定。

---

## 5. テンプレートからの変更点

AstroWind 標準から変えた箇所。テンプレート更新を取り込む際は競合に注意する。

| ファイル                                    | 変更内容                                                                                                                                                                      |
| :------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `package-lock.json` / `.gitignore`          | npm 用ロックファイルを削除し、`pnpm-lock.yaml` を管理対象に変更（テンプレートは npm 前提）                                                                                    |
| `package.json`                              | `packageManager: pnpm@12.16.1` を追加                                                                                                                                         |
| `.gitattributes`                            | 新規。改行コードを LF に固定                                                                                                                                                  |
| `.github/workflows/actions.yaml`            | CI を pnpm 化、Node.js 24 対応版のアクションに更新、`develop` への push でも実行                                                                                              |
| `.github/workflows/deploy-pages.yaml`       | 新規。`develop` への push で GitHub Pages（確認環境）へ公開                                                                                                                   |
| `vendor/integration/utils/configBuilder.ts` | 環境変数 `SITE_URL` / `BASE_PATH` で `site` / `base` を上書きできるよう変更                                                                                                   |
| `vercel.json`                               | `develop` ブランチのデプロイを無効化                                                                                                                                          |
| `src/config.yaml`                           | 本番 URL、サイト名 `RK Playground`、説明文、X アカウント、言語 `ja`、ブログ無効化。テンプレート作者の `googleSiteVerificationId` を削除                                       |
| `.cursor/rules/*.mdc`                       | 新規。Cursor 用ルール（テンプレートの規約は `AGENTS.md` / `.agents/skills/` を参照させる）                                                                                    |
| `src/navigation.ts`                         | 全面書き換え。`profile`（名前・メール・GitHub・X）を一元管理し、ヘッダー（ページ内リンク）とフッター（SNS アイコン・著作権表示）を定義                                        |
| `src/pages/index.astro`                     | `personal.astro` の構成をもとに作り直し。構造化データを組織（Organization）から個人（Person）に変更                                                                           |
| `src/layouts/PageLayout.astro`              | テンプレートの告知バー（Announcement）と RSS アイコンを既定で表示しないよう変更                                                                                               |
| `src/pages/404.astro`                       | 文言を日本語化                                                                                                                                                                |
| 削除                                        | デモページ（`homes/`、`landing/`、about、contact、pricing、services、terms、privacy）、ブログ記事（`src/data/post/`）、`LandingLayout.astro`、Decap CMS（`public/decapcms/`） |

---

## 6. 開発手順・ワークフロー

### Step 1: プロジェクトの初期セットアップ（完了）

1. **AstroWind テンプレートのクローン/セットアップ**
   - [arthelokyo/astrowind](https://github.com/arthelokyo/astrowind)（Astro 7 / Tailwind CSS v4）を `--depth 1` でクローンし、テンプレートの履歴は引き継がずに新規リポジトリとして `git init`。
   - `pnpm install` → `pnpm build` で動作確認。
2. **リポジトリ連携 (GitHub)**
   - リポジトリ: [RyuichiKinjo/my-portfolio-astrowind-v2](https://github.com/RyuichiKinjo/my-portfolio-astrowind-v2)（Public）
   - GitHub Pages の公開方式は「GitHub Actions」。Pages 用の環境 `github-pages` で `develop` ブランチからのデプロイを許可。
3. **ホスティング設定 (Vercel)**
   - Vercel コンソールで GitHub リポジトリを Import。プロジェクト名は `rk-playground-v2`（URL に使われる）。
   - `vercel.json` で `develop` ブランチのデプロイを無効化（確認は GitHub Pages で行うため）。

---

### Step 2: テンプレートの切り替えと構成調整（完了）

1. **トップページの差し替え**
   - `personal.astro` の構成を `index.astro` に移し、「ページ構成」の 6 セクションに絞った。本文はテンプレートのまま（Step 3 で差し替え）。
   - セクションの id（ページ内リンク先）: `#hero` / `#about` / `#career` / `#skills` / `#works`
   - ボタン・リンクはメール（`mailto:`）、GitHub、X に付け替え。
2. **不要なページの整理**
   - ブログを無効化（`.agents/skills/disable-blog.md` に従う）。`src/pages/[...blog]/` と `rss.xml.ts` はページを生成しないので残置。
   - デモページ・ブログ記事・Decap CMS を削除。生成されるページはトップと 404 のみ。
3. **ヘッダー・フッター**
   - ヘッダー: ロゴ（サイト名）、メニュー（プロフィール / 職歴 / スキル / 実績）、テーマ切替、「お問い合わせ」ボタン（メール）
   - フッター: サイト名、GitHub / X / メールのアイコン、`© 年 Ryuichi Kinjo`
4. **既知の警告**
   - ビルド時に `[glob-loader] No files found ... src/data/post` が出る。ブログ記事を削除したためで、動作に影響はない。

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

## 7. 今後の検討・詳細化が必要な項目（To-Do）

設計書をさらに詰めるため、以下の点について仕様を確定していく必要があります。

- [ ] **掲載コンテンツの詳細**: Heroテキスト、経歴データ、アバター画像の差し替え方針
- [x] **コンポーネント構成**: 「ページ構成」の 6 セクションに決定
- [x] **サイトの表示言語**: 日本語（`src/config.yaml` の `i18n.language: ja`）。本文の日本語化は Step 3 で行う
- [x] **`.cursor/rules/*.mdc` の導入**（`project-core.mdc` / `astro-pages.mdc` を作成済み）: Composer が AstroWind の流儀（Tailwind CSS、Astroコンポーネント設計）を崩さないようにするためのプロンプト定義

### テンプレートの残り

- [x] `src/config.yaml` のテンプレート作者の情報（サイト名、`googleSiteVerificationId`、X アカウント）→ Step 2 で対応済み
- [x] ヘッダー・フッターのデモページへのリンク → Step 2 で対応済み
- [ ] トップページの本文・画像（Step 3 で差し替え）
- [x] ロゴの 🚀 絵文字（`src/components/Logo.astro`）→ Step 2 で削除済み
- [ ] ファビコン、SNS 共有用の画像（`src/assets/images/default.png`）→ 仕上げで差し替え

### 未対応の検討事項

- [ ] 確認環境（GitHub Pages）が検索エンジンにインデックスされないよう `noindex` にするか
- [ ] git を 2.45 以降に更新するか（`--trailer` 問題の解消）

---

## 8. 次のステップ

1. [x] Step 1-1: AstroWind のクローンとパッケージインストール
2. [x] `.cursor/rules/*.mdc` のルール作成（クローンしたコードの構成をもとに定義）
3. [x] Step 1-2: GitHub リポジトリ連携、GitHub Pages（確認環境）の公開
4. [x] Step 1-3: Vercel（本番）連携
5. [x] Step 2: `personal.astro` をトップページ（`index.astro`）へ移行し、不要なページを整理
6. [ ] Step 3: 各セクションの本文を自分のプロフィールに差し替え（Hero → About → 職歴 → スキル → 実績 → CTA）
