## PHẦN A — KIỂM TRA ĐỌC HIỂU (15 điểm)

### Câu A1 (5đ) — DOM Tree

**1. Sơ đồ DOM Tree:**
```text
div#app
 ├── header
 │    ├── h1 (Todo App)
 │    └── nav
 │         ├── a.active (All)
 │         ├── a (Active)
 │         └── a (Completed)
 └── main
      ├── form#todoForm
      │    ├── input#todoInput
      │    └── button (Add)
      └── ul#todoList
           ├── li.todo-item (Learn HTML)
           └── li.todo-item.completed (Learn CSS)
```

**2. Viết querySelector:**
* Chọn thẻ `<h1>`: `document.querySelector('h1')`
* Chọn input trong form: `document.querySelector('#todoInput')`
* Chọn tất cả `.todo-item`: `document.querySelectorAll('.todo-item')`
* Chọn link đang active: `document.querySelector('a.active')`
* Chọn `<li>` đầu tiên trong `#todoList`: `document.querySelector('#todoList li:first-child')`
* Chọn tất cả `<a>` bên trong `<nav>`: `document.querySelectorAll('nav a')`

---

### Câu A2 (5đ) — innerHTML vs textContent

* **innerHTML:** Trả về hoặc thiết lập nội dung dưới dạng mã HTML. Trình duyệt sẽ phân tích cú pháp (parse) chuỗi này và render thành các phần tử DOM.
  * *Khi nào dùng:* Khi bạn muốn chèn thêm một đoạn cấu trúc HTML phức tạp từ JavaScript vào giao diện một cách nhanh chóng.
* **textContent:** Trả về hoặc thiết lập nội dung dưới dạng văn bản thuần túy (raw text). Bất kỳ thẻ HTML nào nằm trong chuỗi cũng sẽ bị biến thành chữ bình thường và không được render.
  * *Khi nào dùng:* Khi bạn chỉ muốn cập nhật văn bản hiển thị cho người dùng, giúp bảo mật hơn.

**Tại sao innerHTML gây lỗ hổng XSS (Cross-Site Scripting)?**
Nếu dùng `innerHTML` để hiển thị dữ liệu do user nhập vào, kẻ xấu có thể nhập các đoạn mã độc (script). Trình duyệt tưởng đó là cấu trúc trang web nên sẽ thực thi đoạn mã độc đó, dẫn đến việc bị đánh cắp cookie hoặc session.

**Cách sửa code:**
Thay vì dùng `innerHTML`, ta phải dùng `textContent` để ép dữ liệu nhập vào thành văn bản thuần:
```javascript
// Mã an toàn:
const userInput = document.querySelector("#search").value;
document.querySelector("#result").textContent = userInput;
```

---

### Câu A3 (5đ) — Event Bubbling

* **Khi click vào button (Mặc định):**
  Output sẽ in ra lần lượt là:
  `BUTTON`
  `INNER`
  `OUTER`
  *(Giải thích: Theo cơ chế Bubbling - nổi bọt, khi một sự kiện xảy ra trên phần tử con, nó sẽ tự động lan truyền ngược lên các phần tử cha bao bọc nó).*

* **Nếu uncomment `e.stopPropagation()`:**
  Output sẽ in ra:
  `BUTTON`
  *(Giải thích: Lệnh này giúp ngăn chặn sự lan truyền. Sự kiện chỉ chạy đúng ở phần tử được click rồi dừng lại, không nổi bọt lên thẻ cha nữa).*

---

## PHẦN C — DEBUG & PHÂN TÍCH (15 điểm)

### Câu C1 (8đ) — Debug DOM Code

**7 lỗi sai trong đoạn code và cách sửa:**

1. **Gán lại giá trị cho hằng số (DOM Element):** `countDisplay = count` là sai vì `countDisplay` đang chứa một Node DOM. Phải sửa thành `countDisplay.textContent = count;`.
2. **Sai tên sự kiện:** Lệnh `addEventListener("onclick", ...)` bị sai cú pháp. Phải bỏ chữ "on", sửa thành `addEventListener("click", ...)`.
3. **Lỗi gán kiểu dữ liệu:** `historyList.innerHTML = null;`. Thuộc tính `innerHTML` nhận vào chuỗi, nên gán bằng rỗng mới chuẩn: `historyList.innerHTML = "";`.
4. **Gọi hàm sai cú pháp:** `item.remove;` thiếu cặp ngoặc đơn. Sửa thành `item.remove();`.
5. **Lỗi logic khi Load dữ liệu (Ép kiểu):** Dữ liệu lấy từ `localStorage` luôn ở dạng chuỗi (String). Khi gán `count = localStorage.getItem("count")`, số `count` sẽ biến thành chuỗi (ví dụ `"1"`). Lần click tiếp theo `count++` có thể chạy, nhưng các thao tác cộng dồn khác sẽ bị lỗi nối chuỗi. Sửa thành: `count = Number(localStorage.getItem("count")) || 0;`.
6. **Lỗi mất sự kiện (Event) khi lưu bằng innerHTML:** Lưu toàn bộ mã HTML (`historyList.innerHTML`) vào localStorage và render lại sẽ làm mất các hàm lắng nghe sự kiện (`li.addEventListener`) đã được gắn trước đó. Sửa: Nên lưu dữ liệu vào mảng (Array), lưu mảng đó dưới dạng JSON vào localStorage, rồi viết hàm `render` để tạo lại các phần tử DOM.
7. **Cách xóa phần tử lỗi thời:** Hàm `deleteHistory` dùng `element.parentNode.removeChild(element)` là cú pháp rất cũ và dài dòng. Có thể xóa luôn hàm này và gọi trực tiếp `this.remove()` ngay trong sự kiện click của thẻ `<li>`.

---

### Câu C2 (7đ) — Performance

**1. Tại sao bind event lên 1000 elements riêng lẻ là BAD PRACTICE?**
Việc gắn 1000 bộ lắng nghe sự kiện (Event Listener) lên 1000 thẻ khác nhau sẽ tiêu tốn lượng lớn bộ nhớ (RAM) của trình duyệt. Nó khiến trang web nặng nề, khởi tạo chậm và dễ gây rò rỉ bộ nhớ (memory leak) nếu các phần tử bị xóa mà không gỡ bỏ sự kiện đúng cách.
* **Cách Event Delegation giải quyết:** Thay vì gắn 1000 event lên 1000 thẻ con, ta chỉ gắn **1 event duy nhất** lên thẻ cha bao bọc chúng. Khi click, sự kiện sẽ nổi bọt từ thẻ con lên thẻ cha. Ta dùng `event.target` ở thẻ cha để biết thẻ con nào vừa bị click và xử lý tương ứng.

**2. Refactor dùng DocumentFragment:**
```javascript
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    fragment.appendChild(div);   
}
document.body.appendChild(fragment); // Chỉ append vào DOM thật đúng 1 lần ở ngoài vòng lặp
```
* **Giải thích tại sao nhanh hơn:** Trong đoạn code cũ, mỗi lần `document.body.appendChild(div)` được gọi trong vòng lặp, nó sẽ thay đổi cấu trúc DOM thật. Trình duyệt bắt buộc phải thực hiện **Reflow** (tính toán lại kích thước, vị trí) và **Repaint** (vẽ lại giao diện) liên tục 1000 lần, cực kỳ tốn tài nguyên.
`DocumentFragment` là một DOM ảo nằm trong bộ nhớ (không hiển thị trên giao diện). Ta append 1000 thẻ vào cái hộp ảo này (không gây reflow), sau đó bê cả cái hộp 1000 thẻ đó gắn vào DOM thật chỉ với **1 lần duy nhất**, giúp tối ưu hiệu suất tối đa.
