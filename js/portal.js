/* =====================================================================
 *  portal.js  ―  apps.js のデータから一覧を組み立てる（通常は触らなくてOK）
 * ===================================================================== */
(function () {
  "use strict";

  var data    = window.APP_DATA;
  var catalog = document.getElementById("catalog");
  var filters = document.getElementById("filters");
  if (!data || !catalog) return;

  var STATUS = {
    published: { cls: "pub", label: "公開中" },
    wip:       { cls: "wip", label: "開発中" }
  };

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function tagsHTML(tags) {
    return (tags || []).map(function (t) {
      return '<span class="tag">#' + esc(t) + "</span>";
    }).join("");
  }
  function pad2(n) { return (n < 10 ? "0" : "") + n; }

  function makeCard(app) {
    // --- これから公開する枠（プレースホルダ） ---
    if (app.placeholder) {
      var locked = document.createElement("span");
      locked.className = "card locked";
      locked.innerHTML =
        '<div class="thumb"><span class="lockmark"><span class="big">' +
          esc(app.icon || "🔒") + "</span>" + esc(app.badge || "これから公開") + "</span></div>" +
        '<div class="body">' +
          '<h3 class="app-name" style="color:var(--muted)">' + esc(app.name) + "</h3>" +
          '<p class="app-desc">' + esc(app.desc) + "</p>" +
          '<div class="tags">' + tagsHTML(app.tags) + "</div>" +
        "</div>" +
        '<div class="launch"><span>準備中…</span><span class="arrow">·</span></div>';
      return locked;
    }

    // --- 通常のアプリカード ---
    var st = STATUS[app.status] || STATUS.published;
    var card = document.createElement("a");
    card.className = "card";
    card.href = app.url || "#";
    card.target = "_blank";
    card.rel = "noopener";
    card.innerHTML =
      '<div class="thumb">' +
        '<span class="badge ' + st.cls + '"><i></i>' + st.label + "</span>" +
        '<img src="' + esc(app.thumb) + '" alt="' + esc(app.name) + ' の画面" loading="lazy" />' +
      "</div>" +
      '<div class="body">' +
        '<h3 class="app-name">' + esc(app.name) + "</h3>" +
        '<p class="app-desc">' + esc(app.desc) + "</p>" +
        '<div class="tags">' + tagsHTML(app.tags) + "</div>" +
      "</div>" +
      '<div class="launch"><span>' + esc(app.launch || "▶ ひらく") +
        '</span><span class="arrow">→</span></div>';
    return card;
  }

  function countLabel(cat) {
    if (cat.count_label) return cat.count_label;
    var n = (cat.apps || []).filter(function (a) { return !a.placeholder; }).length;
    return n + (n === 1 ? " app" : " apps");
  }

  // --- カテゴリ各セクションを生成 ---
  data.categories.forEach(function (cat, i) {
    var sec = document.createElement("section");
    sec.className = "cat";
    sec.dataset.cat = cat.id;

    var head = document.createElement("div");
    head.className = "cat-head";
    head.innerHTML =
      '<span class="cat-idx">// ' + pad2(i + 1) + "</span>" +
      '<div class="cat-titles">' +
        '<h2 class="cat-name">' + (cat.icon ? esc(cat.icon) + " " : "") + esc(cat.title) + "</h2>" +
        (cat.sub ? '<span class="cat-sub">' + esc(cat.sub) + "</span>" : "") +
      "</div>" +
      '<span class="cat-rule"></span>' +
      '<span class="cat-count">' + esc(countLabel(cat)) + "</span>";
    sec.appendChild(head);

    var grid = document.createElement("div");
    grid.className = "grid";
    (cat.apps || []).forEach(function (app) { grid.appendChild(makeCard(app)); });
    sec.appendChild(grid);

    catalog.appendChild(sec);
  });

  // --- 絞り込みチップを生成 ---
  if (filters) {
    var chips = [{ id: "*", label: "すべて" }].concat(
      data.categories.map(function (c) { return { id: c.id, label: c.title }; })
    );
    chips.forEach(function (c, idx) {
      var b = document.createElement("button");
      b.className = "chip" + (idx === 0 ? " on" : "");
      b.textContent = c.label;
      b.dataset.filter = c.id;
      b.addEventListener("click", function () {
        var all = filters.querySelectorAll(".chip");
        for (var k = 0; k < all.length; k++) all[k].classList.remove("on");
        b.classList.add("on");
        var secs = catalog.querySelectorAll(".cat");
        for (var j = 0; j < secs.length; j++) {
          secs[j].hidden = !(c.id === "*" || secs[j].dataset.cat === c.id);
        }
      });
      filters.appendChild(b);
    });
  }
})();
