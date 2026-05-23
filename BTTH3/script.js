// ==========================================
// 1. LẤY PHẦN TỬ DOM
// ==========================================
const btnOpenForm = document.getElementById('btnOpenForm');
const btnCloseForm = document.getElementById('btnCloseForm');
const formModal = document.getElementById('formModal');
const formTitle = document.getElementById('formTitle');
const notification = document.getElementById('notification');
const studentForm = document.getElementById('studentForm');
const studentTableBody = document.getElementById('studentTableBody'); // Lấy phần thân bảng

// ==========================================
// 2. BIẾN LƯU TRỮ (GIAI ĐOẠN 4)
// ==========================================
// Mảng chứa danh sách sinh viên
let students = []; 

// ==========================================
// 3. CÁC HÀM XỬ LÝ CHÍNH
// ==========================================

function openModal() {
    formTitle.innerText = "Thêm sinh viên"; 
    formModal.classList.add('show');
}

function closeModal() {
    formModal.classList.remove('show');
    studentForm.reset(); 
}

// Hàm mới: Vẽ lại bảng dữ liệu
function renderTable() {
    studentTableBody.innerHTML = ''; // Xóa sạch dữ liệu cũ trong bảng để vẽ lại từ đầu

    // Duyệt qua mảng sinh viên, mỗi sinh viên tạo 1 dòng <tr>
    students.forEach(function(student, index) {
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.dob}</td>
            <td>${student.className}</td>
            <td>${student.score}</td>
            <td>${student.email}</td>
            <td>
                <button>Sửa</button>
                <button>Xóa</button>
            </td>
        `;
        studentTableBody.appendChild(tr); // Thêm dòng vào bảng
    });
}

// ==========================================
// 4. BẮT SỰ KIỆN
// ==========================================
btnOpenForm.addEventListener('click', openModal);
btnCloseForm.addEventListener('click', closeModal);

// Sự kiện khi bấm "Lưu" form
studentForm.addEventListener('submit', function(event) {
    event.preventDefault(); 

    // 1. Gom tất cả dữ liệu từ các ô input thành 1 object
    const newStudent = {
        id: document.getElementById('studentId').value,
        name: document.getElementById('fullName').value,
        dob: document.getElementById('dob').value,
        className: document.getElementById('className').value, // class là từ khóa của JS nên dùng className
        score: document.getElementById('score').value,
        email: document.getElementById('email').value
    };

    // 2. Đẩy object sinh viên mới vào mảng
    students.push(newStudent);

    // 3. Gọi hàm vẽ lại bảng để cập nhật giao diện
    renderTable();

    // 4. Hiển thị thông báo
    notification.innerText = `Đã thêm thành công sinh viên: ${newStudent.name}`;
    
    // 5. Đóng form
    closeModal();
});