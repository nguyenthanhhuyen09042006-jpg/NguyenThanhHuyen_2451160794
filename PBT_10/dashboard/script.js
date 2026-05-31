async function loadDashboard() {
    const startTime = Date.now();
    document.getElementById('status').textContent = "⏳ Đang lấy dữ liệu từ 3 API...";
    
    // Xóa nội dung cũ khi bấm làm mới
    document.getElementById('widget1').innerHTML = "...";
    document.getElementById('widget2').innerHTML = "...";
    document.getElementById('widget3').innerHTML = "...";

    // Promise.allSettled giúp các API chạy độc lập, lỗi 1 cái không sập cả trang
    const results = await Promise.allSettled([
        fetch("https://jsonplaceholder.typicode.com/users").then(r => r.json()),
        fetch("https://dog.ceo/api/breeds/image/random").then(r => r.json()),
        fetch("https://api.loi-co-tinh-de-test.com/data").then(r => r.json()) // API giả lập lỗi
    ]);

    // Widget 1
    if (results[0].status === "fulfilled") {
        document.getElementById('widget1').innerHTML = `<h3>Tổng User</h3><p>${results[0].value.length} người</p>`;
    } else {
        document.getElementById('widget1').innerHTML = `<p class="error">Lỗi tải User</p>`;
    }

    // Widget 2
    if (results[1].status === "fulfilled") {
        document.getElementById('widget2').innerHTML = `<h3>Chó ngẫu nhiên</h3><img src="${results[1].value.message}" width="100%">`;
    } else {
        document.getElementById('widget2').innerHTML = `<p class="error">Lỗi tải ảnh</p>`;
    }

    // Widget 3
    if (results[2].status === "fulfilled") {
        document.getElementById('widget3').innerHTML = `Thành công`;
    } else {
        document.getElementById('widget3').innerHTML = `<h3>API 3</h3><p class="error">❌ Lỗi: Failed to fetch</p>`;
    }

    document.getElementById('status').textContent = `✅ Dữ liệu được tải trong ${Date.now() - startTime}ms`;
}

loadDashboard(); // Chạy ngay khi mở trang