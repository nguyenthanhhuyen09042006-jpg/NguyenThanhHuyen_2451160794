// ==========================================
// 1. LẤY PHẦN TỬ DOM (Giữ nguyên)
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
// 2. BIẾN LƯU TRỮ (CẬP NHẬT: Đọc từ localStorage)
// ==========================================
// Lấy dữ liệu từ localStorage, nếu chưa có thì dùng mảng rỗng []
let students = JSON.parse(localStorage.getItem('studentsList')) || []; 
let editIndex = -1;

// ==========================================
// 3. CÁC HÀM XỬ LÝ CHÍNH
// ==========================================

// --- (THÊM MỚI) Hàm lưu dữ liệu xuống LocalStorage ---
function saveStudents() {
    localStorage.setItem('studentsList', JSON.stringify(students));
}

function openModal() {
    formTitle.innerText = "Thêm sinh viên"; 
    formModal.classList.add('show');
}

function closeModal() {
    formModal.classList.remove('show');
    studentForm.reset(); 
    editIndex = -1;
}

function updateStatistics() {
    // (Giữ nguyên như cũ)
    totalStudentsSpan.innerText = students.length;
    
    if (students.length === 0) {
        averageScoreSpan.innerText = '0.0';
        return;
    }

    let totalScore = 0;
    students.forEach(function(student) {
        totalScore += parseFloat(student.score); 
    });
    
    let avg = totalScore / students.length;
    averageScoreSpan.innerText = avg.toFixed(2); 
}

function renderTable() {
    // (Giữ nguyên như cũ)
    studentTableBody.innerHTML = ''; 
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
                <button onclick="editStudent(${index})">Sửa</button>
                <button onclick="deleteStudent(${index})">Xóa</button>
            </td>
        `;
        studentTableBody.appendChild(tr); 
    });
    updateStatistics(); 
}

function deleteStudent(index) {
    if (confirm("Bạn có chắc chắn muốn xóa sinh viên này?")) {
        students.splice(index, 1); 
        saveStudents(); // THÊM MỚI: Lưu lại sau khi xóa
        renderTable();
        notification.innerText = "Đã xóa sinh viên thành công!";
    }
}

function editStudent(index) {
    // (Giữ nguyên như cũ)
    const student = students[index]; 
    document.getElementById('studentId').value = student.id;
    document.getElementById('fullName').value = student.name;
    document.getElementById('dob').value = student.dob;
    document.getElementById('className').value = student.className;
    document.getElementById('score').value = student.score;
    document.getElementById('email').value = student.email;

    editIndex = index; 
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

    if (editIndex === -1) {
        students.push(newStudent);
        notification.innerText = `Đã thêm thành công sinh viên: ${newStudent.name}`;
    } else {
        students[editIndex] = newStudent; 
        notification.innerText = `Đã cập nhật thành công sinh viên: ${newStudent.name}`;
    }

    saveStudents(); // THÊM MỚI: Lưu lại sau khi thêm hoặc sửa
    renderTable();
    closeModal();
});

// ==========================================
// 5. CHẠY KHI TẢI TRANG (THÊM MỚI)
// ==========================================
// Gọi hàm renderTable() ngay lập tức để in dữ liệu từ localStorage ra bảng khi vừa mở web
renderTable();