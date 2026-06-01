### 💡 Trả lời câu hỏi lý thuyết:

**1. File `.jsx` khác gì file `.js`?**
- File `.js` chỉ chứa code JavaScript thuần.
- File `.jsx` là cú pháp mở rộng của React, cho phép viết thẻ HTML trực tiếp ngay bên trong code JavaScript.

**2. Tại sao phải `export default App`?**
- Để "xuất" (export) component `App` ra ngoài. Nhờ đó, file gốc khởi chạy dự án (`main.jsx`) mới có thể "nhập" (import) nó vào và vẽ lên màn hình.

**3. Thử xóa `export default` → chuyện gì xảy ra?**
- Trình duyệt sẽ báo lỗi (Error) đỏ rực. Lý do là React đang cố gắng tìm component chính để chạy nhưng không thấy component nào được xuất ra cả.
