let currentIndex = 1;
const maxImages = 3; // Giả lập 3 ảnh
let autoPlayInterval = null;

const imageBox = document.getElementById("imageBox");
const imageTitle = document.getElementById("imageTitle");
const playStatus = document.getElementById("playStatus");
const cmdPalette = document.getElementById("cmdPalette");
const cmdInput = document.getElementById("cmdInput");

// Update Gallery UI
function updateGallery() {
    imageBox.textContent = currentIndex;
    imageTitle.textContent = `Ảnh ${currentIndex}`;
}

// 1. Keyboard Navigation cho Gallery
window.addEventListener("keydown", (e) => {
    // Bỏ qua nếu đang gõ trong input
    if (e.target.tagName === "INPUT") return;

    if (e.key === "ArrowRight") {
        currentIndex = currentIndex < maxImages ? currentIndex + 1 : 1;
        updateGallery();
    } 
    else if (e.key === "ArrowLeft") {
        currentIndex = currentIndex > 1 ? currentIndex - 1 : maxImages;
        updateGallery();
    }
    else if (e.key >= "1" && e.key <= maxImages.toString()) {
        currentIndex = parseInt(e.key);
        updateGallery();
    }
    else if (e.key === " ") {
        e.preventDefault(); // Ngăn trang cuộn xuống
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
            playStatus.textContent = "Đang dừng";
        } else {
            autoPlayInterval = setInterval(() => {
                currentIndex = currentIndex < maxImages ? currentIndex + 1 : 1;
                updateGallery();
            }, 1000);
            playStatus.textContent = "▶ Auto-playing...";
        }
    }
});

// 2. Command Palette (Ctrl + K)
window.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key.toLowerCase() === "k") {
        e.preventDefault(); // Chặn default browser search
        cmdPalette.classList.remove("hidden");
        cmdInput.focus(); // Focus ngay vào ô input
    }
    
    // Nút Escape để đóng Modal
    if (e.key === "Escape" && !cmdPalette.classList.contains("hidden")) {
        cmdPalette.classList.add("hidden");
        document.querySelector(".gallery").focus(); // Trả focus về gallery
    }
});

// Enter để chọn lệnh trong Command Palette
document.getElementById("cmdList").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        alert("Bạn đã chọn: " + e.target.textContent);
        cmdPalette.classList.add("hidden");
    }
});