## PHẦN A — KIỂM TRA ĐỌC HIỂU (15 điểm)

### Câu A1 (5đ) — Đồng bộ vs Bất đồng bộ

**1. Thứ tự đầu ra (Output):**
1 - Start
4 - End
3 - Promise
6 - Promise 2
2 - Timeout 0ms
7 - Nested timeout
5 - Timeout 100ms

**2. Giải thích cơ chế (Event Loop):**
- **Call Stack (Đồng bộ chạy trước):** Trình duyệt luôn ưu tiên chạy code đồng bộ từ trên xuống dưới. Do đó in ra `1 - Start` và `4 - End` đầu tiên.
- **Microtask Queue (Ưu tiên số 1):** Các lệnh Promise (bất đồng bộ) được đưa vào hàng đợi ưu tiên cao (Microtask). Ngay sau khi Call Stack trống, Event Loop sẽ lấy chúng ra chạy → in ra `3 - Promise` và `6 - Promise 2`. Trong lúc chạy Promise 2, nó phát hiện 1 `setTimeout` và đẩy vào Macrotask.
- **Macrotask Queue (Ưu tiên số 2):** Các lệnh `setTimeout` nằm ở đây. Event Loop sẽ nhặt các timeout có thời gian chờ ngắn nhất (0ms) chạy trước → in ra `2 - Timeout 0ms` và `7 - Nested timeout`. Cuối cùng mới chạy đến cái chờ lâu nhất là `5 - Timeout 100ms`.

---

### Câu A2 (5đ) — Fetch API

**Giải thích từng dòng code:**
- **`await fetch(...)`**: Hàm `fetch()` gửi một request HTTP lên server và trả về một đối tượng `Promise`. Ta cần dùng `await` để yêu cầu JavaScript "tạm dừng, đợi đến khi server trả kết quả mạng về" rồi mới gán vào biến `response`.
- **`response.ok`**: Sẽ trả về `false` nếu HTTP Status Code không nằm trong khoảng 200-299 (nghĩa là gọi API bị lỗi). **3 mã trạng thái lỗi ví dụ:** `404` (Not Found - Không tìm thấy), `500` (Internal Server Error - Lỗi máy chủ), `403` (Forbidden - Cấm truy cập).
- **`response.json()`**: Việc chuyển đổi chuỗi dữ liệu (stream) nhận được từ server sang object JSON cũng mất một khoảng thời gian xử lý nhất định (nó trả về Promise), nên ta bắt buộc phải dùng `await` một lần nữa để đợi quá trình phân tích cú pháp (parse) hoàn tất.
- **`try...catch`**: Khối này dùng để bắt các lỗi phát sinh trong quá trình chạy. `fetch` mặc định chỉ văng vào `catch` khi **mất mạng (Network error)**. Những lỗi như 404, 500 nó vẫn tính là gọi thành công, do đó ta phải tự ném lỗi bằng lệnh `throw new Error(...)` ở trên để `catch` có thể bắt được và xử lý tập trung (hiển thị lỗi UI).

---

### Câu A3 (5đ) — Lời hứa (Promise)

**1. Sơ đồ trạng thái của Promise:**
```text
          /---> Fulfilled (Thành công: Lấy được dữ liệu)
Pending -|
(Đang chờ)\---> Rejected  (Thất bại: Mất mạng, từ chối...)
```

**2. Callback Hell là gì?**
Callback Hell là tình trạng lồng ghép quá nhiều hàm callback (hàm gọi lại) vào bên trong nhau khi xử lý các tác vụ bất đồng bộ liên tiếp. Code bị thụt lề liên tục tạo thành hình kim tự tháp (Pyramid of Doom), cực kỳ khó đọc, khó gỡ lỗi và khó bảo trì.

**3. Ví dụ Callback Hell & Refactor:**
```javascript
// Callback Hell (4 cấp độ)
getUser(1, function(user) {
    getPosts(user.id, function(posts) {
        getComments(posts[0].id, function(comments) {
            displayComments(comments, function() {
                console.log("Hoàn thành tất cả!");
            });
        });
    });
});

// Refactor bằng Async/Await (Sạch đẹp, dễ đọc như code đồng bộ)
async function fetchUserData() {
    try {
        const user = await getUser(1);
        const posts = await getPosts(user.id);
        const comments = await getComments(posts[0].id);
        await displayComments(comments);
        console.log("Hoàn thành tất cả!");
    } catch (error) {
        console.error("Có lỗi xảy ra", error);
    }
}
```

---

## PHẦN C — PHÂN TÍCH (20 điểm)

### Câu C1 (10đ) — Chiến lược xử lý lỗi

Khi xây dựng ứng dụng thực tế gọi nhiều API, ta cần thiết kế chiến lược xử lý lỗi toàn diện:

**1. Lỗi mạng (Mất kết nối):** Kiểm tra `navigator.onLine` trước khi gọi API, hoặc bắt lỗi "Failed to fetch" trong khối catch.
**2. Lỗi API (Máy chủ trả về HTTP Error):** Đọc `response.status` để đưa ra thông báo tương ứng.
- Bắt 404: Báo dữ liệu không tồn tại.
- Bắt 429: Báo gửi quá nhiều yêu cầu, delay một chút.
- Bắt 500: Báo hệ thống máy chủ đang bảo trì.
**3. Timeout (Chờ API quá lâu):** Tự tạo hàm `fetchWithTimeout` giới hạn thời gian bằng `Promise.race()`.
**4. Retry logic (Thử lại khi rớt mạng):** Tự tạo hàm `fetchWithRetry` lặp lại việc gọi API vài lần trước khi bỏ cuộc.

**Code minh họa cho từng tình huống:**
```javascript
// Tình huống 3: Timeout (Giới hạn thời gian chờ)
async function fetchWithTimeout(url, ms) {
    const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Timeout: Yêu cầu quá hạn")), ms)
    );
    // Promise.race sẽ ép fetch và timeout đua với nhau
    return Promise.race([fetch(url), timeoutPromise]); 
}

// Tình huống 4, 1 và 2: Thử lại logic, Lỗi mạng và Lỗi API
async function fetchWithRetry(url, maxRetries) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            // Xử lý Lỗi mạng
            if (!navigator.onLine) throw new Error("Mất kết nối mạng. Vui lòng kiểm tra Wifi!");
            
            const res = await fetchWithTimeout(url, 5000); // Kèm timeout 5 giây
            
            // Xử lý Lỗi API (404, 500, 429)
            if (!res.ok) {
                if (res.status === 404) throw new Error("Không tìm thấy dữ liệu (404).");
                if (res.status === 429) throw new Error("Gửi quá nhiều yêu cầu (429), hãy thử lại sau.");
                if (res.status >= 500) throw new Error("Lỗi máy chủ (500).");
            }
            return await res.json();
        } catch (err) {
            console.warn(`Lần thử ${i + 1} thất bại: ${err.message}`);
            if (i === maxRetries - 1) throw err; // Nếu đã hết số lần thử thì ném lỗi ra ngoài
        }
    }
}
```

---

### Câu C2 (10đ) — Promise.all vs Promise.allSettled vs Promise.race

Sự khác nhau cơ bản:

| Phương pháp | Khi nào giải quyết (Thành công)? | Khi nào từ chối (Thất bại)? | Trường hợp sử dụng thực tế |
| :--- | :--- | :--- | :--- |
| **`.all()`** | Khi **TẤT CẢ** các Promise đều thành công. | Khi **CHỈ CẦN 1** Promise thất bại (chết chùm). | Lấy thông tin phụ thuộc nhau. VD: Phải load xong cả "User Profile" VÀ "Danh sách bạn bè" thì mới hiển thị giao diện trang cá nhân. |
| **`.allSettled()`**| Khi **TẤT CẢ** các Promise đã chạy xong (dù thành hay bại). | **KHÔNG BAO GIỜ** từ chối. Trả về mảng trạng thái từng cái. | Bảng điều khiển (Dashboard) có nhiều Widget độc lập. Widget nào lỗi thì hiện lỗi cục bộ, không làm sập các widget khác đang hiển thị bình thường. |
| **`.race()`** | Khi Promise **ĐẦU TIÊN** xong thành công. | Khi Promise **ĐẦU TIÊN** xong bị thất bại. | Chức năng Timeout. Cho hàm gọi API đua với hàm đếm ngược thời gian, ai xong trước lấy kết quả đó. |
| **`.any()`** | Khi Promise **ĐẦU TIÊN** thành công (Bỏ qua lỗi). | Khi **TẤT CẢ** đều thất bại. | Cân bằng tải/dự phòng: Gọi load 1 bức ảnh từ 3 máy chủ khác nhau, máy chủ nào trả về ảnh trước thì dùng luôn. |

**Ví dụ Code Kịch Bản Thực Tế:**

```javascript
// 1. Promise.all (Phải có đủ cả 2 mới chạy tiếp)
async function loadUserDashboard() {
    try {
        const [user, orders] = await Promise.all([
            fetch('/api/user/123').then(r => r.json()),
            fetch('/api/orders/user/123').then(r => r.json())
        ]);
        renderUI(user, orders);
    } catch (error) {
        console.error("Lỗi sập toàn hệ thống do 1 API hỏng:", error);
    }
}

// 2. Promise.allSettled (Lỗi API thời tiết thì API tin tức vẫn hiện)
async function loadIndependentWidgets() {
    const
