// 最新の3件を表示する関数（index.html）
function renderNewsCards(newsArray, containerId, maxCount = 3) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // 日付順で並び替え（新しい順）
  const sortedNews = newsArray.sort((a, b) => new Date(b.date) - new Date(a.date));
  const displayNews = sortedNews.slice(0, maxCount);

  // HTMLを生成して追加
  displayNews.forEach(item => {
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

// index.html用
renderNewsCards(newsItems, "latest-news");
