let page = 1;
let loading = false;
const gallery = document.getElementById('gallery');
const trigger = document.getElementById('load-trigger');
const spinner = document.getElementById('spinner');

async function loadMorePhotos() {
    if (loading) return;
    loading = true;
    spinner.style.display = 'block';

    try {
        // Fetch ảnh từ JSONPlaceholder
        const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=20`);
        const photos = await res.json();
        
        photos.forEach(p => {
            const img = document.createElement('img');
            img.src = p.thumbnailUrl;
            img.loading = "lazy"; // Bật lazy loading của trình duyệt
            gallery.appendChild(img);
        });
        page++;
    } catch (error) {
        console.error("Lỗi tải ảnh:", error);
    } finally {
        loading = false;
        spinner.style.display = 'none';
    }
}

// Lắng nghe khi người dùng cuộn đến phần tử trigger ở cuối trang
const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        loadMorePhotos();
    }
});

observer.observe(trigger);