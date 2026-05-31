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

const totalTasksSpan = document.getElementById('totalTasks');
const completedTasksSpan = document.getElementById('completedTasks');
const pendingTasksSpan = document.getElementById('pendingTasks');

// ==========================================
// 2. BIẾN LƯU TRỮ (Lấy từ LocalStorage)
// ==========================================
let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];
let editTaskIndex = -1;

// ==========================================
// 3. CÁC HÀM XỬ LÝ CHÍNH
// ==========================================

// --- HÀM MỚI: Lưu dữ liệu ---
function saveTasks() {
    localStorage.setItem('myTasks', JSON.stringify(tasks));
}

function openTaskModal() {
    taskFormTitle.innerText = "Thêm công việc mới";
    taskModal.classList.add('show');
}

function closeTaskModal() {
    taskModal.classList.remove('show');
    taskForm.reset(); 
    editTaskIndex = -1;
}

function updateTaskSummary() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed === true).length;
    const pending = total - completed;

    totalTasksSpan.innerText = total;
    completedTasksSpan.innerText = completed;
    pendingTasksSpan.innerText = pending;
}

function renderTasks() {
    taskList.innerHTML = ''; 

    tasks.forEach(function(task, index) {
        const taskDiv = document.createElement('div');
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

    updateTaskSummary(); 
}

function deleteTask(index) {
    if (confirm("Xóa công việc này nhé?")) {
        tasks.splice(index, 1);
        saveTasks(); // Lưu sau khi xóa
        renderTasks();
        taskNotification.innerText = "Đã xóa công việc!";
    }
}

function toggleTaskStatus(index) {
    tasks[index].completed = !tasks[index].completed; 
    saveTasks(); // Lưu sau khi đổi trạng thái
    renderTasks();
}

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
        completed: false 
    };

    if (editTaskIndex === -1) {
        tasks.push(newTask);
        taskNotification.innerText = "Đã thêm công việc!";
    } else {
        newTask.completed = tasks[editTaskIndex].completed; 
        tasks[editTaskIndex] = newTask;
        taskNotification.innerText = "Đã cập nhật công việc!";
    }

    saveTasks(); // Lưu sau khi thêm/sửa
    renderTasks();
    closeTaskModal();
});

// ==========================================
// 5. CHẠY KHI TẢI TRANG
// ==========================================
// Render dữ liệu từ localStorage ngay khi mở web
renderTasks();