const api = {
    baseURL: "https://jsonplaceholder.typicode.com/users",
    async getUsers() {
        const res = await fetch(this.baseURL);
        if (!res.ok) throw new Error("Lỗi tải danh sách");
        return await res.json();
    },
    async deleteUser(id) {
        const res = await fetch(`${this.baseURL}/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error("Xóa thất bại");
        return true;
    }
};

const ui = {
    list: document.getElementById('userList'),
    loading: document.getElementById('loading'),
    showLoading() { this.loading.style.display = 'block'; },
    hideLoading() { this.loading.style.display = 'none'; },
    renderUsers(users) {
        this.list.innerHTML = users.map(u => `
            <div class="user-card">
                <strong>${u.name}</strong> - ${u.email} 
                <button onclick="handleDelete(${u.id})" style="float:right; color:red;">Xóa</button>
            </div>
        `).join('');
    }
};

async function initApp() {
    ui.showLoading();
    try {
        const users = await api.getUsers();
        ui.renderUsers(users);
    } catch (error) {
        alert(error.message);
    } finally {
        ui.hideLoading();
    }
}

async function handleDelete(id) {
    if(!confirm("Bạn có chắc muốn xóa user này?")) return;
    try {
        await api.deleteUser(id);
        alert("Xóa thành công (Giả lập trên JSONPlaceholder)!");
        initApp(); // Tải lại danh sách
    } catch (error) {
        alert(error.message);
    }
}

initApp();