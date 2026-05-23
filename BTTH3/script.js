// 1. Lấy phần tử từ HTML sang JavaScript
const btnOpenForm = document.getElementById('btnOpenForm');
const btnCloseForm = document.getElementById('btnCloseForm');
const formModal = document.getElementById('formModal');
const formTitle = document.getElementById('formTitle');
const notification = document.getElementById('notification');

// 2. Thử thay đổi nội dung tiêu đề, thông báo
// Đoạn này dùng để test DOM thay đổi nội dung giao diện
formTitle.innerText = "Thêm sinh viên - Biên (66TTNT2)"; 
notification.innerText = "Hệ thống DOM đã được load thành công!";

// 3. Thử hiển thị và ẩn popup thông qua các hàm cơ bản
function openModal() {
    formModal.classList.add('show');
}

function closeModal() {
    formModal.classList.remove('show');
}

// Bạn có thể bỏ comment dòng bên dưới để test xem modal có tự động bật lên không
// openModal();