# PHẦN A — KIỂM TRA ĐỌC HIỂU

## Câu A1 — Input Types
1. `type="email"` → Ô nhập text, tự động kiểm tra định dạng xem có ký tự `@` và tên miền hay không → Dùng cho trường nhập email ở form đăng nhập/đăng ký.
2. `type="password"` → Ô nhập text nhưng bị ẩn ký tự thành dấu chấm/sao, không tự validate độ mạnh yếu (phải kết hợp thuộc tính khác) → Dùng để nhập mật khẩu.
3. `type="number"` → Ô nhập số có nút tăng/giảm (spinner), chặn nhập chữ cái (trừ chữ 'e' - số mũ) → Dùng để nhập số lượng sản phẩm mua trong giỏ hàng.
4. `type="tel"` → Ô nhập text mở bàn phím số trên mobile, KHÔNG tự động validate định dạng (cần dùng regex) → Dùng để nhập số điện thoại giao hàng.
5. `type="date"` → Mở popup lịch (date picker), tự validate giá trị ngày tháng hợp lệ → Dùng để chọn ngày nhận hàng mong muốn hoặc ngày sinh.
6. `type="search"` → Ô nhập text có thêm dấu "x" ở góc phải để xóa nhanh từ khóa → Dùng cho thanh tìm kiếm sản phẩm trên Header.
7. `type="color"` → Mở bảng chọn màu (color picker), trả về mã màu hex → Dùng để người dùng chọn hệ màu yêu thích khi lọc sản phẩm.
8. `type="range"` → Hiển thị thanh trượt (slider), trả về số trong khoảng min-max → Dùng để kéo thanh trượt lọc khoảng giá tiền.
9. `type="checkbox"` → Ô vuông cho phép tích chọn nhiều lựa chọn cùng lúc → Dùng cho các bộ lọc (chọn nhiều Brands, Size) hoặc tích "Đồng ý điều khoản".
10. `type="radio"` → Nút tròn chọn 1 trong nhiều lựa chọn (cùng name) → Dùng chọn phương thức thanh toán (COD, Chuyển khoản, Thẻ).

---

## Câu A2 — Validation Attributes
**Dự đoán kết quả khi nhấn Submit:**
*   **Trường hợp 1:** Bị chặn Submit. Trình duyệt hiện thông báo "Vui lòng điền vào trường này" vì có thuộc tính `required` nhưng người dùng đang để trống.
*   **Trường hợp 2:** Bị chặn Submit. Trình duyệt cảnh báo thiếu ký tự `@` và tên miền vì `type="email"` yêu cầu chuẩn định dạng email, nhưng giá trị hiện tại chỉ là chuỗi "abc".
*   **Trường hợp 3:** Bị chặn Submit. Trình duyệt cảnh báo giá trị phải nhỏ hơn hoặc bằng 10 do đã thiết lập `max="10"`, nhưng giá trị truyền vào là `15` (vượt quá giới hạn).
*   **Trường hợp 4:** Bị chặn Submit. Trình duyệt báo lỗi "Vui lòng khớp với định dạng" vì thuộc tính `pattern="[0-9]{10}"` bắt buộc nhập đúng 10 chữ số, trong khi chuỗi "abc123" chứa chữ cái và sai độ dài.
*   **Trường hợp 5:** Bị chặn Submit. Trình duyệt báo lỗi dữ liệu quá ngắn vì thuộc tính `minlength="8"` yêu cầu văn bản có tối thiểu 8 ký tự, nhưng giá trị hiện tại ("123") chỉ có 3.

---

## Câu A3 — Accessibility
1. **Vai trò của `<label for="...">`:** Giúp trình đọc màn hình (Screen Reader) nhận diện và đọc to tên của input khi người khiếm thị focus vào ô đó. Đồng thời, nó tăng diện tích click chuột (click vào text của label thì input tự động được focus), cực kỳ tối ưu trải nghiệm cho màn hình cảm ứng.
2. **Dùng `<fieldset>` + `<legend>` khi nào:** Dùng khi cần gom nhóm một tập hợp các thẻ input có liên quan logic chặt chẽ với nhau trong một form dài, giúp giao diện có cấu trúc rõ ràng. 
   * *Ví dụ cụ thể:* Trong form thanh toán, gom các trường `Tỉnh/Thành phố`, `Quận/Huyện`, `Địa chỉ chi tiết` vào một `<fieldset>` có `<legend>Thông tin giao hàng</legend>`.
3. **Sử dụng `aria-label`:** 
   * Dùng khi một nút bấm (button) hoặc input chỉ thể hiện chức năng qua icon (ví dụ: nút bấm hình kính lúp) mà KHÔNG có văn bản đi kèm trên màn hình để Screen Reader đọc.
   * **KHÔNG nên dùng** khi thẻ `<input>` đã có `<label>` đi kèm, vì điều này gây thừa thãi, khiến Screen Reader có thể đọc lặp lại thông tin 2 lần gây bối rối cho người dùng.

---

## Câu A4 — Media
1. **Thuộc tính `loading="lazy"`:** 
   * **Cải thiện:** Trì hoãn tải hình ảnh cho đến khi người dùng cuộn chuột đến gần vị trí của nó. Giúp website tải cực nhanh ở màn hình đầu tiên (First Contentful Paint) và tiết kiệm băng thông mạng.
   * **Không nên dùng:** Với các hình ảnh nằm ở khu vực hiển thị ngay lập tức khi vừa vào web ("above the fold" như banner chính, logo) vì sẽ làm chậm việc hiển thị nội dung quan trọng nhất.
2. **Nên cung cấp nhiều `<source>` trong `<video>`:** Do các trình duyệt (Chrome, Safari, Firefox) hỗ trợ các bộ giải mã video (codec) khác nhau. Việc có nhiều source giúp trình duyệt tự động ưu tiên quét từ trên xuống và chọn ra định dạng tốt nhất mà nó có thể chạy được.
   * *3 format phổ biến:* `.mp4` (H.264), `.webm`, `.ogg`.
3. **Thuộc tính `alt`:** Dùng để hiển thị văn bản thay thế khi hình ảnh bị lỗi mạng không tải được, hỗ trợ Screen Reader đọc nội dung cho người khiếm thị và giúp Google Bot lập chỉ mục hình ảnh (rất quan trọng cho SEO).
   * Ảnh iPhone 16: `alt="Điện thoại iPhone 16 Pro Max 256GB màu Titan"`
   * Ảnh trang trí: `alt=""` (Để rỗng để Screen Reader tự động bỏ qua).
   * Ảnh biểu đồ: `alt="Biểu đồ cột thể hiện doanh thu quý 1 năm 2026 đạt 500 tỷ đồng"`

---

## Câu A5 — So sánh `<figure>` vs `<img>`
*   **Cách 1 (Dùng thẻ `<img>`):** Dùng khi hình ảnh chỉ là chi tiết minh họa nhỏ lẻ, đứng lẫn vào luồng văn bản, không mang ý nghĩa độc lập và không cần chú thích rõ ràng.
    * *Ví dụ 1:* Ảnh icon avatar đại diện của người dùng.
    * *Ví dụ 2:* Ảnh logo website nằm ở góc trái thanh điều hướng (Header).
*   **Cách 2 (Dùng `<figure>` + `<figcaption>`):** Dùng khi khối hình ảnh mang ý nghĩa trọn vẹn, có tính chất độc lập với khối văn bản xung quanh và bắt buộc phải đi kèm đoạn mô tả (caption) để giải thích ngữ nghĩa.
    * *Ví dụ 1:* Bức ảnh chi tiết một sản phẩm E-commerce, bên dưới kèm chú thích tên sản phẩm và giá tiền.
    * *Ví dụ 2:* Một biểu đồ số liệu kỹ thuật hoặc ảnh báo chí cần có ghi chú nguồn gốc tác giả ở ngay bên dưới.
## PHẦN C — PHÂN TÍCH & SUY LUẬN

### Câu C1 — Debug Form
Dưới đây là 8 lỗi của đoạn code form và cách khắc phục để đạt chuẩn HTML5, Accessibility và Best Practices:

**Lỗi 1: Dòng 1 — Thẻ `<form>` thiếu thuộc tính gửi dữ liệu.**
*   **Chi tiết:** Không có `action` (nơi nhận dữ liệu) và `method` (phương thức gửi).
*   **Sửa:** `<form action="#" method="POST">`

**Lỗi 2: Dòng 2 — Input "Tên" thiếu `<label for="...">` và thiếu thuộc tính `name`.**
*   **Chi tiết:** Viết chữ "Tên:" rỗng trơ trọi ra ngoài vi phạm accessibility, và input không có `name` thì không thể gửi dữ liệu lên server.
*   **Sửa:** `<label for="firstName">Tên:</label> <input type="text" id="firstName" name="firstName" required>`

**Lỗi 3: Dòng 4 — Input "Email" lạm dụng placeholder làm nhãn.**
*   **Chi tiết:** Không có thẻ `<label>`, điều này gây khó khăn cho người dùng dùng Screen Reader. Thiếu `name`.
*   **Sửa:** `<label for="email">Email:</label> <input type="email" id="email" name="email" placeholder="Email của bạn" required>`

**Lỗi 4: Dòng 6, 7 — Input "Mật khẩu" thiếu validation an toàn và thiếu `name`.**
*   **Chi tiết:** Khai báo password nhưng không có giới hạn độ dài `minlength` hoặc `pattern`, và cũng thiếu `<label>`.
*   **Sửa:** `<label for="pwd">Mật khẩu:</label> <input type="password" id="pwd" name="pwd" minlength="8" placeholder="Mật khẩu">`

**Lỗi 5: Dòng 9 — Input "Phone" dùng sai loại type.**
*   **Chi tiết:** Số điện thoại nên dùng `type="tel"` thay vì `type="text"` để điện thoại hiển thị bàn phím số, đồng thời thiếu `<label>`.
*   **Sửa:** `<label for="phone">Phone:</label> <input type="tel" id="phone" name="phone" pattern="[0-9]{10}" value="0901234567">`

**Lỗi 6: Dòng 11 — Thẻ `<select>` không có định danh.**
*   **Chi tiết:** Không có `id` để liên kết với `<label>`, và quan trọng nhất là không có `name`.
*   **Sửa:** `<label for="city">Thành phố:</label> <select id="city" name="city">`

**Lỗi 7: Dòng 12, 13 — Thẻ `<option>` thiếu giá trị thực tế.**
*   **Chi tiết:** Thiếu thuộc tính `value`. Khi submit, server sẽ không biết mã chính xác của thành phố là gì.
*   **Sửa:** `<option value="HN">Hà Nội</option> <option value="HCM">TP.HCM</option>`

**Lỗi 8: Dòng 16 đến 18 — Có `<label>` nhưng lại thiếu thẻ `<input>` (Checkbox).**
*   **Chi tiết:** Người dùng có dòng chữ "Tôi đồng ý" nhưng hoàn toàn không có ô vuông nào để thực sự click vào (lỗi logic nghiêm trọng).
*   **Sửa:** `<label for="terms"><input type="checkbox" id="terms" name="terms" required> Tôi đồng ý điều khoản</label>`

---

### Câu C2 — Thiết kế chiến lược Validation

**1. Viết `pattern` regex:**
*   **CMND/CCCD (Đúng 12 số):** `pattern="[0-9]{12}"`
*   **Số tài khoản (10-15 số):** `pattern="[0-9]{10,15}"`

**2. HTML5 validation đủ an toàn cho ứng dụng ngân hàng chưa? Tại sao?**
*   **Hoàn toàn KHÔNG đủ an toàn.** HTML5 Validation chỉ là lớp phòng thủ ở mặt tiền (Client-side/Frontend) để tăng trải nghiệm người dùng (UX) - giúp báo lỗi nhanh mà không cần tải lại trang.
*   *Lý do:* Kẻ xấu có thể dễ dàng "vượt rào" (bypass) lớp validation này bằng cách: Mở F12 (DevTools) xóa thuộc tính `required` hay `pattern` đi, tắt JavaScript, hoặc dùng các công cụ như Postman/cURL để gửi request trực tiếp thẳng vào Backend mà không thèm qua giao diện HTML.

**3. 3 loại validation mà HTML5 KHÔNG THỂ làm được (Phải dùng JS hoặc Backend):**
*   **So sánh hai trường dữ liệu:** Ví dụ như kiểm tra ô "Nhập lại mật khẩu" có trùng khớp 100% với ô "Mật khẩu" ở trên hay không.
*   **Kiểm tra dữ liệu tồn tại/Trùng lặp:** Ví dụ kiểm tra xem Email hoặc Username này đã có ai đăng ký trong Cơ sở dữ liệu (Database) của hệ thống chưa.
*   **Kiểm tra logic nghiệp vụ phức tạp/Động:** Ví dụ kiểm tra xem số dư tài khoản hiện tại có đủ để chuyển khoản không, hoặc tính toán xem người dùng đã đủ 18 tuổi tính đến ngày hôm nay chưa (dựa trên ô nhập ngày sinh).

**4. 2 rủi ro bảo mật nếu chỉ validate trên Frontend mà không validate Backend:**
*   **Bị tấn công phá hoại cơ sở dữ liệu (SQL Injection / XSS):** Hacker gửi những đoạn mã độc lạ (thay vì nhập số điện thoại thì nhập câu lệnh xóa Database) đi xuyên qua Frontend. Nếu Backend không kiểm tra lại mà lưu thẳng vào hệ thống, dữ liệu sẽ bị phá hủy hoặc lộ lọt.
*   **Sai lệch logic kinh doanh (Data Corruption):** Hacker có thể sửa đổi code HTML để đổi giá tiền đơn hàng thành số âm (VD: -50.000đ) hoặc số lượng sản phẩm sai quy định. Nếu Backend nhắm mắt tin tưởng, hệ thống sẽ xử lý sai, gây thất thoát tài sản nghiêm trọng cho ngân hàng hoặc doanh nghiệp.
