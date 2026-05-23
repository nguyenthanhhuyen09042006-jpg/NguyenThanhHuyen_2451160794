// ==========================================
// 1. LẤY PHẦN TỬ DOM
// ==========================================
const btnOpenForm = document.getElementById('btnOpenForm');
const btnCloseForm = document.getElementById('btnCloseForm');
const formModal = document.getElementById('formModal');
const formTitle = document.getElementById('formTitle');
const notification = document.getElementById('notification');
const studentForm = document.getElementById('studentForm');
const studentTableBody = document.getElementById('studentTableBody');
const totalStudentsSpan = document.getElementById('totalStudents');
const averageScoreSpan = document.getElementById('averageScore');

// ==========================================
// 2. BIẾN LƯU TRỮ
// ==========================================
let students = []; 
let editIndex = -1; // -1 nghĩa là đang ở chế độ Thêm mới. Nếu >= 0 là đang Sửa.

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
    editIndex = -1; // Đảm bảo khi đóng form thì luôn reset về trạng thái Thêm mới
}

// Cập nhật thống kê
function updateStatistics() {
    totalStudentsSpan.innerText = students.length;
    
    if (students.length === 0) {
        averageScoreSpan.innerText = '0.0';
        return;
    }

    let totalScore = 0;
    students.forEach(function(student) {
        totalScore += parseFloat(student.score); // Chuyển chuỗi thành số thực để cộng
    });
    
    let avg = totalScore / students.length;
    averageScoreSpan.innerText = avg.toFixed(2); // Làm tròn 2 chữ số thập phân
}

// Vẽ lại bảng dữ liệu
function renderTable() {
    studentTableBody.innerHTML = ''; 
    students.forEach(function(student, index) {
        const tr = document.createElement('tr');
        
        // Truyền trực tiếp index vào hàm editStudent và deleteStudent
        tr.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.dob}</td>
            <td>${student.className}</td>
            <td>${student.score}</td>
            <td>${student.email}</td>
            <td>
                <button onclick="editStudent(${index})">Sửa</button>
                <button onclick="deleteStudent(${index})">Xóa</button>
            </td>
        `;
        studentTableBody.appendChild(tr); 
    });

    updateStatistics(); // Gọi hàm cập nhật thống kê mỗi khi vẽ lại bảng
}

// Hàm Xóa sinh viên
function deleteStudent(index) {
    // Hiển thị hộp thoại xác nhận
    if (confirm("Bạn có chắc chắn muốn xóa sinh viên này?")) {
        students.splice(index, 1); // Xóa 1 phần tử tại vị trí index
        renderTable();
        notification.innerText = "Đã xóa sinh viên thành công!";
    }
}

// Hàm Sửa sinh viên (đẩy dữ liệu lên form)
function editStudent(index) {
    const student = students[index]; // Lấy sinh viên cần sửa
    
    // Nạp dữ liệu lên các ô input
    document.getElementById('studentId').value = student.id;
    document.getElementById('fullName').value = student.name;
    document.getElementById('dob').value = student.dob;
    document.getElementById('className').value = student.className;
    document.getElementById('score').value = student.score;
    document.getElementById('email').value = student.email;

    // Đổi trạng thái và mở form
    editIndex = index; // Ghi nhớ vị trí đang sửa
    formTitle.innerText = "Cập nhật sinh viên";
    formModal.classList.add('show');
}

// ==========================================
// 4. BẮT SỰ KIỆN
// ==========================================
btnOpenForm.addEventListener('click', openModal);
btnCloseForm.addEventListener('click', closeModal);

studentForm.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const newStudent = {
        id: document.getElementById('studentId').value,
        name: document.getElementById('fullName').value,
        dob: document.getElementById('dob').value,
        className: document.getElementById('className').value, 
        score: document.getElementById('score').value,
        email: document.getElementById('email').value
    };

    // Kiểm tra xem đang Thêm hay Sửa
    if (editIndex === -1) {
        // Chế độ Thêm
        students.push(newStudent);
        notification.innerText = `Đã thêm thành công sinh viên: ${newStudent.name}`;
    } else {
        // Chế độ Sửa
        students[editIndex] = newStudent; // Ghi đè dữ liệu mới vào vị trí cũ
        notification.innerText = `Đã cập nhật thành công sinh viên: ${newStudent.name}`;
    }

    renderTable();
    closeModal();
});