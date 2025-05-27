// 最新のLive情報を表示する関数（index.html用）
function renderLiveCards(liveArray, containerId, maxCount = 3) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const sortedLive = liveArray.sort((a, b) => new Date(b.date) - new Date(a.date));
  const displayLive = sortedLive.slice(0, maxCount);

  displayLive.forEach(item => {
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
renderLiveCards(liveItems, "latest-live");
