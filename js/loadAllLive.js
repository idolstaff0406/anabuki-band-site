/// 表示件数を画面幅で動的に変更（PC・タブレット・スマホ対応）
function getItemsPerPage() {
  const width = window.innerWidth;
  if (width >= 992) return 12; // PC
  if (width >= 768) return 9;  // タブレット
  return 6;                    // スマホ
}

// ライブカードを描画する関数
function renderLiveCards(liveArray, containerId, page, itemsPerPage) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const items = liveArray.slice(start, end);

  items.forEach(item => {
    const col = document.createElement("div");
    col.className = "col";
    col.innerHTML = `
      <div class="card h-100">
        <img src="${item.image}" class="card-img-top" alt="${item.title}">
        <div class="card-body">
          <small class="text-muted">${item.date}</small>
          <h5 class="card-title mt-1">${item.title}</h5>
          <p class="card-text">${item.text}</p>
        </div>
      </div>
    `;
    container.appendChild(col);
  });
}

// ページネーションの描画
function renderPagination(totalItems, itemsPerPage, currentPage, onPageChange) {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages <= 1) return;

  const ul = document.createElement("ul");
  ul.className = "pagination justify-content-center";

  const prev = document.createElement("li");
  prev.className = `page-item ${currentPage === 1 ? "disabled" : ""}`;
  prev.innerHTML = `<a class="page-link" href="#">＜</a>`;
  prev.addEventListener("click", e => {
    e.preventDefault();
    if (currentPage > 1) onPageChange(currentPage - 1);
  });
  ul.appendChild(prev);

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

// 初期化用
let currentPage = 1;
let itemsPerPage = getItemsPerPage();
const containerId = "live-list";
const sortedLive = [...liveItems].sort((a, b) => new Date(b.date) - new Date(a.date));

// 初期描画関数
function render() {
  renderLiveCards(sortedLive, containerId, currentPage, itemsPerPage);
  renderPagination(sortedLive.length, itemsPerPage, currentPage, (newPage) => {
    currentPage = newPage;
    render();
  });
}

// ウィンドウリサイズ時に再描画
function onResize() {
  const newItemsPerPage = getItemsPerPage();
  if (newItemsPerPage !== itemsPerPage) {
    itemsPerPage = newItemsPerPage;
    const totalPages = Math.ceil(sortedLive.length / itemsPerPage);
    if (currentPage > totalPages) currentPage = totalPages;
    render();
  }
}

window.addEventListener("load", render);
window.addEventListener("resize", onResize);
