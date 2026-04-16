// ブレイクポイントごとの表示件数
function getItemsPerPage() {
  const width = window.innerWidth;
  if (width >= 992) return 12; // PC
  if (width >= 768) return 9;  // タブレット
  return 6;                    // スマホ
}

// ニュースカードを1ページ分描画
function renderNewsCards(newsArray, containerId, page, itemsPerPage) {
  const container = document.getElementById(containerId);
  container.innerHTML = ""; // リセット

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const items = newsArray.slice(start, end);

  items.forEach(item => {
    const col = document.createElement("div");
    col.className = "col";
    col.innerHTML = `
      <a href="${item.link}" class="text-decoration-none text-dark">
        <div class="card h-100">
          <img src="${item.image}" class="card-img-top" alt="${item.title}">
          <div class="card-body">
            <small class="text-muted">${item.date}</small>
            <h5 class="card-title mt-1">${item.title}</h5>
            <p class="card-text">${item.text}</p>
          </div>
        </div>
      </a>
    `;
    container.appendChild(col);
  });
}

// ページネーションを生成
function renderPagination(totalItems, itemsPerPage, currentPage, onPageChange) {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = ""; // リセット

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  const ul = document.createElement("ul");
  ul.className = "pagination justify-content-center";

  // 「前へ」ボタン
  const prev = document.createElement("li");
  prev.className = `page-item ${currentPage === 1 ? "disabled" : ""}`;
  prev.innerHTML = `<a class="page-link" href="#">＜</a>`;
  prev.addEventListener("click", e => {
    e.preventDefault();
    if (currentPage > 1) onPageChange(currentPage - 1);
  });
  ul.appendChild(prev);

  // ページ番号ボタン
  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement("li");
    li.className = `page-item ${i === currentPage ? "active" : ""}`;
    li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
    li.addEventListener("click", e => {
      e.preventDefault();
      onPageChange(i);
    });
    ul.appendChild(li);
  }

  // 「次へ」ボタン
  const next = document.createElement("li");
  next.className = `page-item ${currentPage === totalPages ? "disabled" : ""}`;
  next.innerHTML = `<a class="page-link" href="#">＞</a>`;
  next.addEventListener("click", e => {
    e.preventDefault();
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  });
  ul.appendChild(next);

  pagination.appendChild(ul);
}

// 初期化用の変数
let currentPage = 1;
let itemsPerPage = getItemsPerPage();
const containerId = "news-list";

// ニュースデータを日付でソート（元配列は変えたくない場合はコピー推奨）
const sortedNews = [...newsItems].sort((a, b) => new Date(b.date) - new Date(a.date));

// 画面描画
function render() {
  renderNewsCards(sortedNews, containerId, currentPage, itemsPerPage);
  renderPagination(sortedNews.length, itemsPerPage, currentPage, (newPage) => {
    currentPage = newPage;
    render();
  });
}

// リサイズ対応は itemsPerPage を更新し、currentPageを調整してから再描画
function onResize() {
  const newItemsPerPage = getItemsPerPage();
  if (newItemsPerPage !== itemsPerPage) {
    itemsPerPage = newItemsPerPage;

    // currentPageが存在しないページなら最後のページに
    const totalPages = Math.ceil(sortedNews.length / itemsPerPage);
    if (currentPage > totalPages) currentPage = totalPages;

    render();
  }
}

// 初期表示
window.addEventListener("load", () => {
  render();
});

// リサイズ時はonResizeだけ呼ぶ
window.addEventListener("resize", onResize);
