// 1. Lấy phần tử từ HTML sang JavaScript
const btnOpenForm = document.getElementById('btnOpenForm');
const btnCloseForm = document.getElementById('btnCloseForm');
const formModal = document.getElementById('formModal');
const formTitle = document.getElementById('formTitle');
const notification = document.getElementById('notification');
const studentForm = document.getElementById('studentForm'); // Lấy thêm form

// Hàm hiển thị popup
function openModal() {
    formTitle.innerText = "Thêm sinh viên - Biên (66TTNT2)"; 
    formModal.classList.add('show');
}

// Hàm ẩn popup và xóa trắng form
function closeModal() {
    formModal.classList.remove('show');
    studentForm.reset(); // Xóa sạch dữ liệu vừa nhập khi đóng form
}

// ==========================================
// GIAI ĐOẠN 3: XỬ LÝ SỰ KIỆN CƠ BẢN
// ==========================================

// Bắt sự kiện click cho nút Mở và nút Đóng form
btnOpenForm.addEventListener('click', openModal);
btnCloseForm.addEventListener('click', closeModal);

// Bắt sự kiện submit khi người dùng bấm nút "Lưu"
studentForm.addEventListener('submit', function(event) {
    // Ngăn chặn hành vi tải lại trang mặc định của trình duyệt khi submit form
    event.preventDefault(); 

    // Lấy thử dữ liệu từ các ô input (Chuẩn bị cho Giai đoạn 4)
    const studentId = document.getElementById('studentId').value;
    const fullName = document.getElementById('fullName').value;

    // Hiển thị thông báo ra màn hình
    notification.innerText = `Đã nhận thông tin sinh viên: ${fullName} (${studentId})`;
    
    // Đóng form sau khi lưu
    closeModal();
});