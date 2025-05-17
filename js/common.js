// js/common.js
// ページの読み込みが終わったら実行
document.addEventListener("DOMContentLoaded", function () {
    // 現在のURLのパスを取得（例: /index.html や /pages/apple.html）
    const path = window.location.pathname;

    // トップページ(index.html)の場合とサブページの場合で読み込みパスを変える
    // index.htmlはルート直下なので "components/"
    // サブページは " ../components/" とする
    const isRoot = path === "/" || path.endsWith("/index.html");

    // 読み込み元のベースパスを決定
    const basePath = isRoot ? "components/" : "../components/";

    // ヘッダーのHTMLを読み込み、#headerに挿入する
    fetch(basePath + "header.html")
        .then(response => response.text())
        .then(data => {
            const headerElem = document.getElementById("header");
            if (headerElem) headerElem.innerHTML = data;
        });

    // フッターのHTMLを読み込み、#footerに挿入する
    fetch(basePath + "footer.html")
        .then(response => response.text())
        .then(data => {
            const footerElem = document.getElementById("footer");
            if (footerElem) footerElem.innerHTML = data;
        });
});
