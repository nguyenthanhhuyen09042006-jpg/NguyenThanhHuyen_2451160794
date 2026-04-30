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
