// 表示件数を画面幅で動的に変更
function getItemsPerPage() {
  const width = window.innerWidth;
  if (width >= 992) return 12;
  if (width >= 768) return 9;
  return 6;
}

// YouTubeのvideoIdをURLから取得する関数
function extractVideoId(url) {
  const match = url.match(/[?&]v=([^&]+)/);
  return match ? match[1] : null;
}

// YouTubeのサムネイル画像URLを取得する関数（videoIdを元に）
function getYouTubeThumbnail(videoId) {
  return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`; // 中サイズ
}

// 動画カードを描画
function renderMovieCards(movieArray, containerId, page, itemsPerPage) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const items = movieArray.slice(start, end);

  items.forEach(item => {
    const videoId = extractVideoId(item.youtubeUrl);
    const thumbnail = getYouTubeThumbnail(videoId);

    const col = document.createElement("div");
    col.className = "col";
    col.innerHTML = `
      <a href="${item.youtubeUrl}" target="_blank" class="text-decoration-none text-dark">
        <div class="card h-100">
          <img src="${thumbnail}" class="card-img-top" alt="${item.title}">
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

// ページネーション描画（共通関数）
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

// 初期化
let currentPage = 1;
let itemsPerPage = getItemsPerPage();
const containerId = "movie-list";
const sortedMovies = [...movieItems].sort((a, b) => new Date(b.date) - new Date(a.date));

// 初期描画
function render() {
  renderMovieCards(sortedMovies, containerId, currentPage, itemsPerPage);
  renderPagination(sortedMovies.length, itemsPerPage, currentPage, (newPage) => {
    currentPage = newPage;
    render();
  });
}

// リサイズ対応
function onResize() {
  const newItemsPerPage = getItemsPerPage();
  if (newItemsPerPage !== itemsPerPage) {
    itemsPerPage = newItemsPerPage;
    const totalPages = Math.ceil(sortedMovies.length / itemsPerPage);
    if (currentPage > totalPages) currentPage = totalPages;
    render();
  }
}

window.addEventListener("load", render);
window.addEventListener("resize", onResize);
