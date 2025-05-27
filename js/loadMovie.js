// YouTubeのvideoIdをURLから取得
function extractVideoId(url) {
  const match = url.match(/[?&]v=([^&]+)/);
  return match ? match[1] : null;
}

// YouTubeのサムネイル取得（videoIdを元に）
function getYouTubeThumbnail(videoId) {
  return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`; // 中サイズ
}

// Movieセクションを描画（index.html用）
function renderMovieCards(movieArray, containerId, maxCount = 3) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const sortedMovies = movieArray.sort((a, b) => new Date(b.date) - new Date(a.date));
  const displayMovies = sortedMovies.slice(0, maxCount);

  displayMovies.forEach(item => {
    const col = document.createElement("div");
    col.className = "col";

    // URLからvideoIdを抽出
    const videoId = extractVideoId(item.youtubeUrl);
    const thumbnail = getYouTubeThumbnail(videoId);

    col.innerHTML = `
      <a href="${item.youtubeUrl}" class="text-decoration-none text-dark" target="_blank" rel="noopener">
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

// index.html用
renderMovieCards(movieItems, "latest-movie");

