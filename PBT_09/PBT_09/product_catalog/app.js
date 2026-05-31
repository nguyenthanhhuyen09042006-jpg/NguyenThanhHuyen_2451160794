const products = [
    { id: 1, name: "iPhone 16", price: 25990000, category: "phone", rating: 4.8 },
    { id: 2, name: "MacBook Pro", price: 45990000, category: "laptop", rating: 4.9 },
    { id: 3, name: "AirPods Pro", price: 6990000, category: "accessory", rating: 4.5 },
    { id: 4, name: "iPad Air", price: 16990000, category: "tablet", rating: 4.6 },
    { id: 5, name: "Samsung S24", price: 22990000, category: "phone", rating: 4.7 },
    { id: 6, name: "Dell XPS 15", price: 35990000, category: "laptop", rating: 4.8 },
    { id: 7, name: "Galaxy Buds", price: 3490000, category: "accessory", rating: 4.2 },
    { id: 8, name: "Xiaomi Pad 6", price: 7990000, category: "tablet", rating: 4.3 },
    { id: 9, name: "Pixel 9", price: 19990000, category: "phone", rating: 4.6 },
    { id: 10, name: "ThinkPad X1", price: 32990000, category: "laptop", rating: 4.7 },
    { id: 11, name: "Apple Watch", price: 9990000, category: "accessory", rating: 4.8 },
    { id: 12, name: "Surface Pro", price: 28990000, category: "tablet", rating: 4.5 }
];

let currentProducts = [...products];
let cartCount = 0;

const grid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const categoryButtons = document.getElementById("categoryButtons");
const sortSelect = document.getElementById("sortSelect");
const modal = document.getElementById("productModal");

// 1. Render Products
function renderProducts(items) {
    grid.innerHTML = "";
    items.forEach(product => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.price.toLocaleString('vi-VN')}đ</p>
            <p>⭐ ${product.rating}</p>
            <button class="add-cart" data-id="${product.id}">Thêm vào giỏ</button>
        `;
        // Click thẻ để mở Modal (trừ nút Thêm vào giỏ)
        card.addEventListener("click", (e) => {
            if(!e.target.classList.contains("add-cart")) showModal(product);
        });
        grid.appendChild(card);
    });
}

// 2. Search
searchInput.addEventListener("input", (e) => {
    const keyword = e.target.value.toLowerCase();
    currentProducts = products.filter(p => p.name.toLowerCase().includes(keyword));
    renderProducts(currentProducts);
});

// 3. Filter by Category
categoryButtons.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        document.querySelectorAll("#categoryButtons button").forEach(btn => btn.classList.remove("active"));
        e.target.classList.add("active");
        
        const cat = e.target.dataset.category;
        currentProducts = cat === "all" ? [...products] : products.filter(p => p.category === cat);
        renderProducts(currentProducts);
    }
});

// 4. Sort
sortSelect.addEventListener("change", (e) => {
    const val = e.target.value;
    if (val === "price-asc") currentProducts.sort((a, b) => a.price - b.price);
    if (val === "price-desc") currentProducts.sort((a, b) => b.price - a.price);
    if (val === "name-asc") currentProducts.sort((a, b) => a.name.localeCompare(b.name));
    if (val === "rating-desc") currentProducts.sort((a, b) => b.rating - a.rating);
    renderProducts(currentProducts);
});

// 5. Add to Cart (Event Delegation)
grid.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-cart")) {
        cartCount++;
        document.getElementById("cartBadge").textContent = cartCount;
        e.stopPropagation(); // Ngăn chặn nổi bọt để không mở Modal
    }
});

// Modal Logic
function showModal(product) {
    document.getElementById("modalBody").innerHTML = `
        <h2>${product.name}</h2>
        <p>Giá: ${product.price.toLocaleString('vi-VN')}đ</p>
        <p>Đánh giá: ⭐${product.rating}</p>
        <p>Danh mục: ${product.category}</p>
    `;
    modal.classList.remove("hidden");
}

document.querySelector(".close-btn").addEventListener("click", () => modal.classList.add("hidden"));
window.addEventListener("click", (e) => { if (e.target === modal) modal.classList.add("hidden"); });

// Dark Mode Toggle
document.getElementById("themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

// Khởi chạy
renderProducts(currentProducts);