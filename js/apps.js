/* =====================================================================
 *  アプリ一覧データ  ―  アプリを追加・編集するのは「このファイルだけ」
 * =====================================================================
 *
 *  ▼ アプリを1つ追加する手順
 *    1) 下の該当カテゴリの apps:[ ... ] の中に { ... } を1つ足す
 *    2) スクリーンショットを thumbnails/ に置き、thumb にそのパスを書く
 *    3) 保存して GitHub に push（または index.html を再読み込み）すれば反映
 *
 *  ▼ 各項目の意味
 *    name    … カードに出るアプリ名（先頭に絵文字を付けてもOK）
 *    desc    … 一言説明
 *    url     … クリックで開く公開URL
 *    thumb   … サムネイル画像のパス（例 "thumbnails/xxx.jpg"）
 *    tags    … 小さなタグ（# は自動で付くので不要）
 *    status  … "published"（公開中）/ "wip"（開発中）
 *    launch  … ボタンの文言（省略すると "▶ ひらく"）
 *
 *  ▼ まだ公開していない枠（プレースホルダ）を置きたいとき
 *    { placeholder:true, icon:"🎮", badge:"制作中", name:"...", desc:"...", tags:[...] }
 * ===================================================================== */

window.APP_DATA = {
  categories: [

    {
      id: "python",
      icon: "🐍",
      title: "Python 学習用",
      sub: "study · 遊びながら Python を身につける",
      apps: [
        {
          name: "⚔️ Collection Quest",
          desc: "list / dict / set / tuple / str のメソッドを、進化する勇者と一緒に RPG風クイズで学ぶ。",
          url: "https://kamurai42tokyo.github.io/collection-methods-quiz/",
          thumb: "thumbnails/collection-quest.jpg",
          tags: ["PWA", "コレクション型", "クイズ"],
          status: "published",
          launch: "▶ ぼうけんに でる"
        },
        {
          name: "🧑‍💻 Python Module Quest",
          desc: "PythonModule 00〜10 の内容を、人生が進化するキャラと一緒にカテゴリ別クイズで学ぶ。",
          url: "https://kamurai42tokyo.github.io/python-quest/",
          thumb: "thumbnails/module-quest.jpg",
          tags: ["PWA", "Module00-10", "5キャラ"],
          status: "wip",
          launch: "▶ じんせいを はじめる"
        },
        {
          name: "🎯 Python Module Quiz",
          desc: "11 モジュール・220 問。モジュール別に基礎から対策できる一問一答ドリル。",
          url: "https://kamurai42tokyo.github.io/python-module-quiz/",
          thumb: "thumbnails/module-quiz.jpg",
          tags: ["220問", "11モジュール", "対策"],
          status: "published",
          launch: "▶ ひらく"
        },
        {
          name: "📚 Python Module 予習",
          desc: "クイズに挑む前に、モジュールごとの要点をフラッシュカードでさっと確認。",
          url: "https://kamurai42tokyo.github.io/python-study/",
          thumb: "thumbnails/study.jpg",
          tags: ["フラッシュカード", "予習"],
          status: "published",
          launch: "▶ ひらく"
        }
      ]
    },

    {
      id: "game",
      icon: "🎮",
      title: "ゲーム",
      sub: "game · これから増えていきます",
      count_label: "coming soon",
      apps: [
        {
          placeholder: true,
          icon: "🎮",
          badge: "制作中",
          name: "最初のゲーム",
          desc: "いま制作中。完成したら、ここから起動してそのまま遊べるようになります。",
          tags: ["coming-soon"]
        },
        {
          placeholder: true,
          icon: "＋",
          badge: "これから追加",
          name: "次のゲーム",
          desc: "作ったゲームは js/apps.js に追記するだけで、ここに並びます。",
          tags: ["planned"]
        }
      ]
    }

  ]
};
