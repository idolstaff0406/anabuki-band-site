import { memberItems } from './memberData.js';

function loadMembers() {
  const container = document.getElementById("member-list");

  memberItems.forEach(member => {
    const col = document.createElement("div");
    col.className = "col text-center";

    // Twitterのアイコン取得
    const avatarUrl = member.twitter
      ? `https://unavatar.io/twitter/${member.twitter}`
      : "https://via.placeholder.com/100?text=No+Image";

    // SNSリンク
    const snsLinks = [];

    if (member.twitter) {
      snsLinks.push(`<a href="https://twitter.com/${member.twitter}" target="_blank" rel="noopener"><i class="fab fa-x-twitter fa-lg me-2"></i></a>`);
    }
    if (member.instagram) {
      snsLinks.push(`<a href="https://instagram.com/${member.instagram}" target="_blank" rel="noopener"><i class="fab fa-instagram fa-lg me-2"></i></a>`);
    }
    if (member.tiktok) {
      snsLinks.push(`<a href="https://www.tiktok.com/@${member.tiktok}" target="_blank" rel="noopener"><i class="fab fa-tiktok fa-lg"></i></a>`);
    }

    col.innerHTML = `
      <img src="${avatarUrl}" alt="${member.name}" class="rounded-circle mb-2" style="width:100px; height:100px; object-fit:cover; border:2px solid #ccc; padding:2px;">
      <div class="fw-bold">${member.name}</div>
      <div>${snsLinks.join(" ")}</div>
    `;

    container.appendChild(col);
  });
}

document.addEventListener("DOMContentLoaded", loadMembers);
