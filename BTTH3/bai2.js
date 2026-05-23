// ==========================================
// 1. LẤY PHẦN TỬ DOM
// ==========================================
const btnOpenTaskForm = document.getElementById('btnOpenTaskForm');
const btnCloseTaskForm = document.getElementById('btnCloseTaskForm');
const taskModal = document.getElementById('taskModal');
const taskForm = document.getElementById('taskForm');
const taskNotification = document.getElementById('taskNotification');
const taskFormTitle = document.getElementById('taskFormTitle');
const taskList = document.getElementById('taskList');

// Các phần tử thống kê
const totalTasksSpan = document.getElementById('totalTasks');
const completedTasksSpan = document.getElementById('completedTasks');
const pendingTasksSpan = document.getElementById('pendingTasks');

// ==========================================
// 2. BIẾN LƯU TRỮ
// ==========================================
let tasks = [];
let editTaskIndex = -1; // -1 là Thêm mới, >=0 là Sửa

// ==========================================
// 3. CÁC HÀM XỬ LÝ CHÍNH
// ==========================================

function openTaskModal() {
    taskFormTitle.innerText = "Thêm công việc mới";
    taskModal.classList.add('show');
}

function closeTaskModal() {
    taskModal.classList.remove('show');
    taskForm.reset(); 
    editTaskIndex = -1;
}

// Cập nhật thống kê công việc
function updateTaskSummary() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed === true).length;
    const pending = total - completed;

    totalTasksSpan.innerText = total;
    completedTasksSpan.innerText = completed;
    pendingTasksSpan.innerText = pending;
}

// Vẽ danh sách công việc ra màn hình
function renderTasks() {
    taskList.innerHTML = ''; 

    tasks.forEach(function(task, index) {
        // Tạo một thẻ div cho mỗi công việc
        const taskDiv = document.createElement('div');
        // Nếu công việc đã hoàn thành, thêm class 'completed' để đổi CSS
        taskDiv.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        taskDiv.innerHTML = `
            <div>
                <h3>${task.title} ${task.completed ? '(Đã xong)' : ''}</h3>
                <p>${task.desc}</p>
                <small>Hạn: ${task.dueDate} | Ưu tiên: <strong>${task.priority}</strong></small>
            </div>
            <div>
                <button onclick="toggleTaskStatus(${index})">
                    ${task.completed ? 'Chưa xong' : 'Hoàn thành'}
                </button>
                <button onclick="editTask(${index})">Sửa</button>
                <button onclick="deleteTask(${index})">Xóa</button>
            </div>
        `;
        taskList.appendChild(taskDiv);
    });

    updateTaskSummary(); // Cập nhật thống kê
}

// Hàm Xóa công việc
function deleteTask(index) {
    if (confirm("Xóa công việc này nhé?")) {
        tasks.splice(index, 1);
        renderTasks();
        taskNotification.innerText = "Đã xóa công việc!";
    }
}

// Hàm Đổi trạng thái hoàn thành
function toggleTaskStatus(index) {
    tasks[index].completed = !tasks[index].completed; // Đảo ngược trạng thái true/false
    renderTasks();
}

// Hàm Sửa công việc
function editTask(index) {
    const task = tasks[index];
    
    document.getElementById('taskTitle').value = task.title;
    document.getElementById('taskDesc').value = task.desc;
    document.getElementById('taskDueDate').value = task.dueDate;
    document.getElementById('taskPriority').value = task.priority;

    editTaskIndex = index;
    taskFormTitle.innerText = "Cập nhật công việc";
    taskModal.classList.add('show');
}

// ==========================================
// 4. BẮT SỰ KIỆN FORM
// ==========================================
btnOpenTaskForm.addEventListener('click', openTaskModal);
btnCloseTaskForm.addEventListener('click', closeTaskModal);

taskForm.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const newTask = {
        title: document.getElementById('taskTitle').value,
        desc: document.getElementById('taskDesc').value,
        dueDate: document.getElementById('taskDueDate').value,
        priority: document.getElementById('taskPriority').value,
        completed: false // Mặc định khi mới tạo là chưa hoàn thành
    };

    if (editTaskIndex === -1) {
        tasks.push(newTask);
        taskNotification.innerText = "Đã thêm công việc!";
    } else {
        // Giữ lại trạng thái completed cũ khi sửa thông tin
        newTask.completed = tasks[editTaskIndex].completed; 
        tasks[editTaskIndex] = newTask;
        taskNotification.innerText = "Đã cập nhật công việc!";
    }

    renderTasks();
    closeTaskModal();
});