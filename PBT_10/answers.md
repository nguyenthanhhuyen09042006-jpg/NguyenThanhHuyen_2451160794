# PHẦN A — KIỂM TRA ĐỌC HIỂU (15 điểm)

## Câu A1 (5đ) — Đồng bộ vs Bất đồng bộ

**1. Thứ tự đầu ra (Output Order):**
`1 - Start` ➔ `4 - End` ➔ `3 - Promise` ➔ `6 - Promise 2` ➔ `2 - Timeout 0ms` ➔ `7 - Nested timeout` ➔ `5 - Timeout 100ms`

**2. Giải thích cơ chế:**
* **Call Stack (Đồng bộ):** JavaScript chạy từ trên xuống. In ra `1` và `4` ngay lập tức.
* **Microtask Queue (Ưu tiên cao):** Chứa các callback của Promise. `Promise.resolve()` đẩy callback vào đây. In ra `3`, sau đó chạy Promise thứ 2 in ra `6` và đẩy một `setTimeout` mới vào Macrotask Queue.
* **Macrotask Queue (Ưu tiên thấp):** Chứa `setTimeout`. Sau khi Call Stack và Microtask trống, Event Loop mới gọi đến đây. Nó chạy timeout 0ms in ra `2`, sau đó chạy timeout 0ms lồng bên trong in ra `7`, và cuối cùng là timeout 100ms in ra `5`.

---

## Câu A2 (5đ) — Fetch API

* **`await fetch(...)` trả về gì? Tại sao cần `await`?**
  * `fetch(...)` trả về một **Promise** đại diện cho HTTP Response. 
  * Cần `await` để tạm dừng thực thi hàm cho đến khi nhận được phản hồi từ server mà không làm đóng băng luồng chính của trình duyệt.
* **`response.ok` – Khi nào false? 3 mã trạng thái tương ứng:**
  * Trả về `false` khi HTTP status code nằm ngoài khoảng 200-299.
  * 3 mã phổ biến: `404 (Not Found)`, `500 (Internal Server Error)`, `401 (Unauthorized)`.
* **`response.json()` — Tại sao cần `await` một lần nữa?**
  * Việc đọc luồng dữ liệu (stream) từ body và phân tích cú pháp thành JSON tốn thời gian nên hàm này tiếp tục trả về một Promise. Cần `await` để lấy dữ liệu thực tế.
* **`try...catch` — Bắt lỗi gì?**
  * Bắt lỗi mạng (Network Error như mất mạng, đứt cáp, lỗi CORS).
  * Lỗi do lập trình viên chủ động ném ra (`throw new Error`).
  * Lỗi phân tích cú pháp JSON nếu server trả về định dạng sai (ví dụ trả về HTML thay vì JSON).

---

## Câu A3 (5đ) — Lời hứa (Promise)

**1. Sơ đồ 3 trạng thái của Promise:**
* `Pending` (Đang chờ) ➔ `Fulfilled` (Thành công, chạy vào `.then()`)
* `Pending` (Đang chờ) ➔ `Rejected` (Thất bại, chạy vào `.catch()`)

**2. Callback Hell là gì?**
Là tình trạng lồng ghép quá nhiều hàm callback vào nhau để xử lý các tác vụ bất đồng bộ liên tiếp, khiến code có hình tháp (Pyramid of Doom), rất khó đọc, khó gỡ lỗi và bảo trì.

**3. Ví dụ 4 cấp độ Callback Hell:**
```javascript
getUser(1, (user) => {
    getPosts(user.id, (posts) => {
        getComments(posts[0].id, (comments) => {
            displayComments(comments, () => {
                console.log("Hoàn thành!");
            });
        });
    });
});
```

**4. Refactor thành async/await:**
```javascript
async function displayUserComments() {
    try {
        const user = await getUser(1);
        const posts = await getPosts(user.id);
        const comments = await getComments(posts[0].id);
        await displayComments(comments);
        console.log("Hoàn thành!");
    } catch (error) {
        console.error("Lỗi:", error);
    }
}
```

---

# PHẦN C — PHÂN TÍCH (20 điểm)

## Câu C1 (10đ) — Chiến lược xử lý lỗi

**1. Lỗi mạng (mất mạng):**
Dùng `try...catch` bao bọc `fetch`. Khi `fetch` thất bại hoàn toàn do mạng, nó sẽ nhảy vào `catch`. Có thể kết hợp kiểm tra `navigator.onLine` để hiển thị UI "Vui lòng kiểm tra lại kết nối internet".

**2. Lỗi API:**
* **404 (Not Found):** Thông báo "Không tìm thấy dữ liệu".
* **500 (Internal Server Error):** Thông báo "Lỗi hệ thống máy chủ, vui lòng thử lại sau".
* **429 (Too Many Requests):** Thông báo "Hệ thống đang quá tải, vui lòng đợi 1 phút" và vô hiệu hóa các nút gửi/tương tác.

**3. Hết thời gian chờ (Timeout):**
```javascript
async function fetchWithTimeout(url, ms = 5000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), ms);
    
    try {
        const response = await fetch(url, { signal: controller.signal });
        return response;
    } catch (error) {
        if (error.name === 'AbortError') throw new Error("Hết thời gian chờ API");
        throw error;
    } finally {
        clearTimeout(timeoutId);
    }
}
```

**4. Thử lại logic (Retry):**
```javascript
async function fetchWithRetry(url, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`Lỗi HTTP ${res.status}`);
            return res; // Thành công thì thoát vòng lặp trả về kết quả luôn
        } catch (error) {
            if (i === maxRetries - 1) throw error; // Hết lượt thử thì ném lỗi
            console.warn(`Lỗi, đang thử lại lần ${i + 1}...`);
        }
    }
}
```

---

## Câu C2 (10đ) — So sánh các phương thức Promise

| Phương thức | Khi nào Resolve? | Khi nào Reject? | Trường hợp sử dụng |
| :--- | :--- | :--- | :--- |
| **`.all()`** | Cả mảng đều thành công | **Một** cái thất bại là reject ngay | Cần lấy nhiều dữ liệu mang tính phụ thuộc chặt chẽ (VD: Cần cả Dữ liệu User và Quyền truy cập để render trang). |
| **`.allSettled()`** | Chạy xong toàn bộ (dù thành công hay lỗi) | Không bao giờ | Dashboard gọi nhiều API độc lập. Cái nào lỗi thì hiện báo lỗi riêng, không làm sập cả trang. |
| **`.race()`** | Cái **đầu tiên** thành công | Cái **đầu tiên** thất bại | Implement Timeout cho API (cho một hàm `fetch` và một hàm `setTimeout` chạy đua). |
| **`.any()`** | Cái **đầu tiên** thành công | Cả mảng đều thất bại | Cân bằng tải. Gọi nhiều server dự phòng cùng lúc, server nào trả data nhanh và thành công nhất thì lấy. |

**Ví dụ Code minh họa cho từng kịch bản thực tế:**

* **`.all()` (Đòi hỏi có đủ 100% dữ liệu):**
```javascript
async function loadAppData() {
    try {
        const [user, posts] = await Promise.all([
            fetch('/api/user').then(r => r.json()),
            fetch('/api/posts').then(r => r.json())
        ]);
        renderApp(user, posts);
    } catch (error) {
        console.error("Thiếu dữ liệu quan trọng để chạy app!", error);
    }
}
```

* **`.allSettled()` (Dashboard nhiều widget độc lập):**
```javascript
async function loadDashboard() {
    const results = await Promise.allSettled([ 
        fetch('/api/weather').then(r => r.json()), 
        fetch('/api/news').then(r => r.json()) 
    ]);
    
    // Check từng kết quả, lỗi cái nào xử lý cái đó
    if (results[0].status === 'fulfilled') renderWeather(results[0].value);
    else renderWeatherError(results[0].reason);

    if (results[1].status === 'fulfilled') renderNews(results[1].value);
    else renderNewsError(results[1].reason);
}
```

* **`.race()` (Ép timeout cho một request):**
```javascript
async function fetchWithRace() {
    try {
        const res = await Promise.race([
            fetch('/api/data'),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Quá thời gian tải!')), 5000))
        ]);
        const data = await res.json();
        console.log(data);
    } catch (error) {
        console.error(error.message); // In ra lỗi nếu timeout chạy xong trước
    }
}
```

* **`.any()` (Lấy dữ liệu từ server dự phòng nhanh nhất):**
```javascript
async function fetchFromMultipleServers() {
    try {
        const res = await Promise.any([
            fetch('[https://server-chinh.com/data](https://server-chinh.com/data)').then(r => r.json()),
            fetch('[https://server-duphong-1.com/data](https://server-duphong-1.com/data)').then(r => r.json()),
            fetch('[https://server-duphong-2.com/data](https://server-duphong-2.com/data)').then(r => r.json())
        ]);
        console.log("Lấy data thành công từ server phản hồi nhanh nhất:", res);
    } catch (error) {
        console.error("Tất cả các server đều sập!", error);
    }
}
```
