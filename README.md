# 🗺️ Kamurai's AppLab

kamurai42tokyo の自作アプリを、カテゴリ別・サムネイル付きで一覧表示する**公開ポータル**です。
カードをクリックすると、各アプリがそのまま起動します。すべてクラウド（GitHub Pages）で
常時稼働するため、**自分のPCを立ち上げていなくても誰でもアクセスできます**。

公開後のURL（予定）：**https://kamurai42tokyo.github.io/**

---

## 📁 ファイル構成

```
kamurai42tokyo.github.io/
├── index.html          ページの骨組み（基本さわらない）
├── css/style.css       見た目（基本さわらない）
├── js/
│   ├── apps.js         ★アプリ一覧データ（追加・編集はここだけ）
│   └── portal.js       一覧を組み立てる処理（基本さわらない）
├── thumbnails/         サムネイル画像を置く場所
│   ├── collection-quest.jpg
│   ├── module-quest.jpg
│   ├── module-quiz.jpg
│   └── study.jpg
├── icon.svg            ファビコン
└── README.md           このファイル
```

---

## ➕ アプリを追加する（やることは2つだけ）

### 1) サムネイル画像を置く
公開したいアプリの画面をスクリーンショットし、`thumbnails/` に保存します
（例：`thumbnails/my-new-app.jpg`）。横長（16:10 くらい）だときれいに収まります。

### 2) `js/apps.js` に1ブロック追記
該当カテゴリの `apps: [ ... ]` の中に、次を足すだけです。

```js
{
  name: "🎮 My New App",
  desc: "このアプリの一言説明。",
  url: "https://kamurai42tokyo.github.io/my-new-app/",
  thumb: "thumbnails/my-new-app.jpg",
  tags: ["タグ1", "タグ2"],
  status: "published",          // 公開中: "published" / 開発中: "wip"
  launch: "▶ ひらく"            // ボタン文言（省略可）
}
```

保存して GitHub に push すれば、数十秒で公開ページに反映されます。

> **まだ公開していない枠**を先に並べたいときは、`placeholder` を使います：
> ```js
> { placeholder:true, icon:"🎮", badge:"制作中", name:"次のアプリ", desc:"準備中です。", tags:["coming-soon"] }
> ```

### カテゴリを増やすには
`js/apps.js` の `categories: [ ... ]` に、もう1ブロック足します。
```js
{ id:"tools", icon:"🛠", title:"ツール", sub:"utility", apps:[ /* ... */ ] }
```

---

## 👀 ローカルで見た目を確認する

`index.html` を**ダブルクリックしてブラウザで開くだけ**で確認できます
（データを `apps.js` に持っているため、サーバーは不要です）。

PWAなど厳密に確認したい場合は、このフォルダで簡易サーバーを立ててもOK：
```bash
python3 -m http.server 8000
# → ブラウザで http://localhost:8000 を開く
```

---

## 🚀 GitHub Pages で公開する手順

1. GitHub で **リポジトリ名を `kamurai42tokyo.github.io`** にして新規作成
   （この名前にすると、トップURL `https://kamurai42tokyo.github.io/` で公開されます）
2. このフォルダの中身を push する
   ```bash
   cd kamurai42tokyo.github.io
   git init
   git add .
   git commit -m "Add AppLab portal"
   git branch -M main
   git remote add origin https://github.com/kamurai42tokyo/kamurai42tokyo.github.io.git
   git push -u origin main
   ```
3. GitHub の **Settings → Pages** で、Source を `main` / `/(root)` に設定
4. 1〜2分待って **https://kamurai42tokyo.github.io/** を開く

---

## 🔗 各アプリ側について

このポータルは各アプリの公開URLにリンクしているだけです。
各アプリも、それぞれ別リポジトリを GitHub Pages で公開しておきます
（例：`collection-methods-quiz` → `https://kamurai42tokyo.github.io/collection-methods-quiz/`）。
アプリ側を公開したら、`js/apps.js` の `status` を `"published"` にしてください。
