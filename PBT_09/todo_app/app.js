const form = document.querySelector("#todoForm");
const input = document.querySelector("#todoInput");
const list = document.querySelector("#todoList");
const countDisplay = document.querySelector("#todoCount");
const filters = document.querySelector("#filters");
const clearBtn = document.querySelector("#clearCompleted");

// Khởi tạo data từ LocalStorage
let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "all";

// 1. Hàm Render giao diện
function render() {
    list.innerHTML = ""; 
    
    // Lọc theo trạng thái
    let filteredTodos = todos;
    if (currentFilter === "active") filteredTodos = todos.filter(t => !t.completed);
    if (currentFilter === "completed") filteredTodos = todos.filter(t => t.completed);

    filteredTodos.forEach(todo => {
        const li = document.createElement("li");
        li.className = `todo-item ${todo.completed ? "completed" : ""}`;
        li.dataset.id = todo.id;

        const textSpan = document.createElement("span");
        textSpan.textContent = todo.text;
        
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.className = "delete-btn";

        li.appendChild(textSpan);
        li.appendChild(deleteBtn);
        list.appendChild(li);
    });

    // Cập nhật Count & LocalStorage
    const activeCount = todos.filter(t => !t.completed).length;
    countDisplay.textContent = `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;
    localStorage.setItem("todos", JSON.stringify(todos));
}

// 2. Thêm Todo
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    
    todos.push({ id: Date.now(), text, completed: false });
    input.value = "";
    render();
});

// 3. Event Delegation (Xóa, Toggle & Bật chế độ Sửa)
list.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li) return;
    const id = Number(li.dataset.id);

    // Xóa
    if (e.target.classList.contains("delete-btn")) {
        todos = todos.filter(t => t.id !== id);
        render();
    } 
    // Toggle hoàn thành
    else if (e.target.tagName === "SPAN") {
        const todo = todos.find(t => t.id === id);
        todo.completed = !todo.completed;
        render();
    }
});

// 4. Tính năng: Double-click để Edit
list.addEventListener("dblclick", (e) => {
    if (e.target.tagName === "SPAN") {
        const li = e.target.closest("li");
        const id = Number(li.dataset.id);
        const todo = todos.find(t => t.id === id);

        // Tạo ô input để gõ text mới
        const editInput = document.createElement("input");
        editInput.type = "text";
        editInput.className = "edit-input";
        editInput.value = todo.text;

        // Thay thẻ span bằng thẻ input
        li.classList.add("editing");
        li.replaceChild(editInput, e.target);
        editInput.focus();

        // Hàm lưu dữ liệu
        const saveEdit = () => {
            const newText = editInput.value.trim();
            if (newText) {
                todo.text = newText;
            } else {
                todos = todos.filter(t => t.id !== id); // Xóa luôn nếu để trống
            }
            render();
        };

        // Lưu khi ấn Enter hoặc khi click ra ngoài (blur)
        editInput.addEventListener("blur", saveEdit);
        editInput.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                editInput.removeEventListener("blur", saveEdit);
                saveEdit();
            }
        });
    }
});

// 5. Tính năng Filter
filters.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        document.querySelectorAll("#filters button").forEach(btn => btn.classList.remove("active"));
        e.target.classList.add("active");
        currentFilter = e.target.dataset.filter;
        render();
    }
});

// 6. Xóa các việc đã hoàn thành
clearBtn.addEventListener("click", () => {
    todos = todos.filter(t => !t.completed);
    render();
});

// Chạy lần đầu
render();