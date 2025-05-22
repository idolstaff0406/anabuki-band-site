// js/common.js
// ページの読み込みが終わったら実行
document.addEventListener("DOMContentLoaded", function () {
    // 現在のURLのパスを取得（例: /index.html や /pages/newsblog/news1.html）
    const path = window.location.pathname;

    // パスの深さをカウント（例: /pages/newsblog/news1.html → ["", "pages", "newsblog", "news1.html"] → 3階層）
    const depth = path.split("/").filter(p => p !== "").length;

    // ルートからcomponentsまで戻るための "../" を depth-1 回繰り返す（ルート直下は ""）
    const basePath = depth > 1 ? "../".repeat(depth - 1) + "components/" : "components/";

    // ヘッダーを読み込む
    fetch(basePath + "header.html")
        .then(response => response.text())
        .then(data => {
            const headerElem = document.getElementById("header");
            if (headerElem) headerElem.innerHTML = data;
        });

    // フッターを読み込む
    fetch(basePath + "footer.html")
        .then(response => response.text())
        .then(data => {
            const footerElem = document.getElementById("footer");
            if (footerElem) footerElem.innerHTML = data;
        });
});
