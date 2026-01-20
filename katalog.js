console.log("LoansBooks Katalog loaded");

// Hamburger Menu Toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

// Data Katalog Buku
const books = [
  {
    id: 1,
    title: "Hujan",
    category: "Novel",
    image: "image/hujan.png",
    description:
      "Blurb novel 'Hujan' karya Tere Liye menceritakan tentang persahabatan, cinta, dan perpisahan...",
    tag: "Tere Liye",
  },
  {
    id: 2,
    title: "Hujan",
    category: "Novel",
    image: "image/hujan.png",
    description:
      "Blurb novel 'Hujan' karya Tere Liye menceritakan tentang persahabatan, cinta, dan perpisahan...",
    tag: "Tere Liye",
  },
  {
    id: 3,
    title: "Hujan",
    category: "Novel",
    image: "image/hujan.png",
    description:
      "Blurb novel 'Hujan' karya Tere Liye menceritakan tentang persahabatan, cinta, dan perpisahan...",
    tag: "Tere Liye",
  },
  {
    id: 4,
    title: "Hujan",
    category: "Novel",
    image: "image/hujan.png",
    description:
      "Blurb novel 'Hujan' karya Tere Liye menceritakan tentang persahabatan, cinta, dan perpisahan...",
    tag: "Tere Liye",
  },
  {
    id: 5,
    title: "Hujan",
    category: "Novel",
    image: "image/hujan.png",
    description:
      "Blurb novel 'Hujan' karya Tere Liye menceritakan tentang persahabatan, cinta, dan perpisahan...",
    tag: "Tere Liye",
  },
  {
    id: 6,
    title: "Hujan",
    category: "Novel",
    image: "image/hujan.png",
    description:
      "Blurb novel 'Hujan' karya Tere Liye menceritakan tentang persahabatan, cinta, dan perpisahan...",
    tag: "Tere Liye",
  },
  {
    id: 7,
    title: "Bumi",
    category: "Novel",
    image: "image/bumi.png",
    description:
      "Petualangan Raib, Seli, dan Ali di dunia paralel yang penuh dengan misteri dan kekuatan...",
    tag: "Tere Liye",
  },
  {
    id: 8,
    title: "Pulang",
    category: "Novel",
    image: "image/bumi.png",
    description:
      "Sebuah kisah tentang perjalanan pulang, melalui pertarungan demi pertarungan...",
    tag: "Tere Liye",
  },
  {
    id: 9,
    title: "Bulan",
    category: "Novel",
    image: "image/bulan.png",
    description:
      "Lanjutan kisah petualangan di dunia paralel dengan karakter Bulan yang misterius...",
    tag: "Tere Liye",
  },
];

function renderBooks(booksToRender = books) {
  const bookGrid = document.getElementById("bookGrid");
  const noResults = document.getElementById("noResults");

  if (!bookGrid) return;

  bookGrid.innerHTML = "";

  if (booksToRender.length === 0) {
    bookGrid.style.display = "none";
    noResults.classList.remove("hidden");
    return;
  }

  bookGrid.style.display = "grid";
  noResults.classList.add("hidden");

  booksToRender.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.className = "book-card";
    bookCard.setAttribute("data-category", book.category);
    bookCard.setAttribute("data-title", book.title.toLowerCase());

    bookCard.innerHTML = `
      <div class="book-image-container">
        <img 
          src="${book.image}" 
          alt="${book.title}" 
          class="book-image"
          onerror="this.src='https://via.placeholder.com/280x320?text=${book.title}'"
        >
        <div class="book-tag">${book.tag}</div>
      </div>
      <div class="book-content-row">
        <div class="book-text-col">
          <h3 class="book-title">${book.title}</h3>
          <p class="book-desc">${book.description}</p>
        </div>
        <a href="detail.html?id=${book.id}" class="btn-arrow">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </a>
      </div>
    `;

    bookGrid.appendChild(bookCard);
  });
}

function filterBooks() {
  const searchInput = document.getElementById("searchInput");
  const categorySelect = document.getElementById("categorySelect");

  const searchTerm = searchInput.value.toLowerCase().trim();
  const selectedCategory = categorySelect.value;

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      searchTerm === "" || book.title.toLowerCase().includes(searchTerm);
    const matchesCategory =
      selectedCategory === "Semua" || book.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  renderBooks(filteredBooks);
}

document.addEventListener("DOMContentLoaded", () => {
  renderBooks();

  const searchBtn = document.getElementById("searchBtn");
  if (searchBtn) {
    searchBtn.addEventListener("click", filterBooks);
  }

  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        filterBooks();
      }
    });
  }

  const categorySelect = document.getElementById("categorySelect");
  if (categorySelect) {
    categorySelect.addEventListener("change", filterBooks);
  }

  const resetBtn = document.getElementById("resetBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      searchInput.value = "";
      categorySelect.value = "Semua";
      renderBooks();
    });
  }
});

if (typeof module !== "undefined" && module.exports) {
  module.exports = { books, renderBooks, filterBooks };
}
