// novel_webpage.js

async function loadNovel() {
  const params = new URLSearchParams(window.location.search);
  const novelId = params.get("novel");

  // if no novel parameter, show an error
  if (!novelId) {
    document.body.innerHTML = "<h2>Novel not found or not yet available. (Missing ?novel= parameter)</h2>";
    return;
  }

  try {
    // fetch JSON
    const res = await fetch(`../novel_json/${novelId}.json`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const novel = await res.json();

    // Update novel cover
    const cover = document.querySelector(".novel-cover-large img");
    if (cover) cover.src = novel.image || "../../img/placeholder.png";

    // Update title and description
    const title = document.querySelector(".novel-title");
    if (title) title.textContent = novel.title?.toUpperCase() || "Unknown Title";

    const desc = document.querySelector(".novel-description");
    if (desc) desc.textContent = novel.description || "No description available.";

    // Update meta info
    const authorEl = document.querySelector(".meta-left p:nth-child(1) span");
    const statusEl = document.querySelector(".meta-left p:nth-child(2) span");
    const ratingEl = document.querySelector(".meta-left p:nth-child(3) span");
    const genreEl = document.querySelector(".genre-text");

    if (authorEl) authorEl.textContent = novel.author || "Unknown Author";
    if (statusEl) statusEl.textContent = novel.status || "Unknown";
    if (ratingEl) ratingEl.textContent = novel.ratings || "N/A";
    if (genreEl) genreEl.textContent = novel.genre || "Uncategorized";

    // Build chapter list
    const chapterList = document.querySelector(".chapter-list");
    if (chapterList && Array.isArray(novel.chapters)) {
      chapterList.innerHTML = ""; // clear placeholder

      // create each chapter entry
      for (let i = novel.chapters.length - 1; i >= 0; i--) {
        const ch = novel.chapters[i];
        const li = document.createElement("li");

        const link = document.createElement("a");
        link.href = `novel_chapter.html?novel=${novelId}&chapter=${ch.number}`;
        link.textContent = `Chapter ${ch.number}: ${ch.title}`;

        li.appendChild(link);
        chapterList.appendChild(li);
      }
    }
  } catch (err) {
    console.error("Error loading novel:", err);
    document.body.innerHTML = `<h2>Failed to load novel data. Check console for details.</h2>`;
  }
}

// run the loader when page opens
loadNovel();
