document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("news-list");
  if (!container || !newsList) return;

  const sorted = newsList.sort((a, b) => new Date(b.date) - new Date(a.date));

  sorted.forEach(news => {
    const card = document.createElement("div");
    card.className = "col";

    card.innerHTML = `
      <div class="card h-100">
        <img src="../${news.img}" class="card-img-top" alt="${news.alt}">
        <div class="card-body">
          <small class="text-muted">${news.date}</small>
          <h5 class="card-title mt-1">${news.title}</h5>
          <p class="card-text">${news.text}</p>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
});
