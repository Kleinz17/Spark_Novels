// novel_chapter.js

async function loadChapter() {
  const params = new URLSearchParams(window.location.search);
  const novelId = params.get("novel");
  const chapterNum = parseInt(params.get("chapter"));

  // Error handling
  if (!novelId || isNaN(chapterNum)) {
    document.body.innerHTML = "<h2>Chapter not found.</h2>";
    return;
  }

  try {
    // Fetch JSON file (same as novel_page.js)
    const res = await fetch(`../novel_json/${novelId}.json`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const novel = await res.json();

    // Find the selected chapter
    const chapter = novel.chapters.find(ch => ch.number === chapterNum);
    if (!chapter) {
      document.body.innerHTML = "<h2>Chapter not found in this novel.</h2>";
      return;
    }

    // Update the title and content
    document.querySelector(".chapter-title").textContent = novel.title || "Unknown Novel";
    document.querySelector(".chapter-subtitle").textContent = `Chapter ${chapter.number}: ${chapter.title}`;
    document.querySelector(".chapter-content").innerHTML = `<p>${chapter.content.replace(/\n/g, "</p><p>")}</p>`;

    // --- Navigation Buttons ---
    const prevBtn = document.querySelector(".nav-button:first-child");
    const listBtn = document.querySelector(".chapter-list");
    const nextBtn = document.querySelector(".nav-button:last-child");

    // Chapter List button → back to novel info page
    if (listBtn) {
      listBtn.href = `novel_page.html?novel=${novelId}`;
    }

    // Prev button
    if (prevBtn) {
      if (chapterNum > 0) {
        prevBtn.href = `novel_chapter.html?novel=${novelId}&chapter=${chapterNum - 1}`;
      } else {
        prevBtn.classList.add("disabled");
        prevBtn.removeAttribute("href");
      }
    }

    // Next button
    if (nextBtn) {
      if (chapterNum < novel.chapters.length - 1) {
        nextBtn.href = `novel_chapter.html?novel=${novelId}&chapter=${chapterNum + 1}`;
      } else {
        nextBtn.classList.add("disabled");
        nextBtn.removeAttribute("href");
      }
    }

  } catch (err) {
    console.error("Error loading chapter:", err);
    document.body.innerHTML = "<h2>Failed to load chapter data.</h2>";
  }
}

// Run it
loadChapter();

// ====== Dark Mode Toggle for Chapter Container ======
const darkToggle = document.querySelector(".dark-mode-toggle");
const chapterContainer = document.querySelector(".chapter-container");
const container = document.querySelector(".container");

if (darkToggle && chapterContainer) {
  darkToggle.addEventListener("click", () => {
    chapterContainer.classList.toggle("dark-mode");

    // Optional: save preference
    if (chapterContainer.classList.contains("dark-mode")) {
      localStorage.setItem("chapterTheme", "dark");
    } else {
      localStorage.setItem("chapterTheme", "light");
    }
  });


  // Apply saved theme on load
  const savedTheme = localStorage.getItem("chapterTheme");
  if (savedTheme === "dark") {
    chapterContainer.classList.add("dark-mode");
  }
}

if (darkToggle && container) {
  darkToggle.addEventListener("click", () => {
    container.classList.toggle("dark-mode");

    // Optional: save preference
    if (container.classList.contains("dark-mode")) {
      localStorage.setItem("chapterTheme", "dark");
    } else {
      localStorage.setItem("chapterTheme", "light");
    }
  });


  // Apply saved theme on load
  const savedTheme = localStorage.getItem("chapterTheme");
  if (savedTheme === "dark") {
    container.classList.add("dark-mode");
  }
}