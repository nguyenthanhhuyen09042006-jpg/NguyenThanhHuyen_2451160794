# PHẦN A — KIỂM TRA ĐỌC HIỂU

## Câu A1 — Input Types
1. `type="email"` → Ô nhập văn bản, tự động kiểm tra xem có ký tự `@` và tên miền hay không → Dùng cho trường nhập email đăng ký/đăng nhập.
2. `type="password"` → Ô nhập văn bản nhưng các ký tự bị mã hóa thành dấu chấm/sao, không tự validate quy tắc mật khẩu trừ khi dùng thêm pattern → Dùng để nhập mật khẩu.
3. `type="number"` → Ô nhập số có kèm nút tăng/giảm (spinner), tự động chặn nhập chữ cái → Dùng để nhập số lượng sản phẩm muốn mua.
4. `type="tel"` → Ô nhập văn bản tối ưu cho bàn phím số trên điện thoại, KHÔNG tự động validate định dạng (phải dùng pattern) → Dùng để nhập số điện thoại.
5. `type="date"` → Hiển thị giao diện lịch (date picker) để chọn ngày, kiểm tra tính hợp lệ của ngày tháng → Dùng để chọn ngày sinh.
6. `type="url"` → Ô nhập văn bản, tự động kiểm tra xem có bắt đầu bằng `http://` hoặc `https://` không → Dùng để nhập link trang cá nhân.
7. `type="search"` → Giao diện giống ô text nhưng có thêm nút "x" để xóa nhanh nội dung → Dùng cho thanh tìm kiếm.
8. `type="color"` → Hiển thị bảng chọn màu (color picker) → Dùng để người dùng chọn màu sắc sản phẩm.
9. `type="range"` → Hiển thị thanh trượt (slider) để chọn giá trị trong khoảng → Dùng để lọc giá sản phẩm.
10. `type="checkbox"` → Ô vuông để tích chọn, có thể chọn nhiều cái → Dùng cho mục "Tôi đồng ý với điều khoản".

---

## Câu A2 — Validation Attributes
**Dự đoán kết quả khi Submit:**
*   **Trường hợp 1:** Bị chặn Submit. Trình duyệt báo lỗi yêu cầu điền vào trường này vì có thuộc tính `required` nhưng đang để trống.
*   **Trường hợp 2:** Bị chặn Submit. Trình duyệt báo lỗi sai định dạng email do giá trị "abc" thiếu ký tự `@` (quy định của `type="email"`).
*   **Trường hợp 3:** Bị chặn Submit. Trình duyệt báo lỗi giá trị phải nhỏ hơn hoặc bằng 10, vì giá trị nhập vào là 15 đã vượt quá giới hạn `max="10"`.
*   **Trường hợp 4:** Bị chặn Submit. Trình duyệt báo giá trị không khớp định dạng. Thuộc tính `pattern="[0-9]{10}"` bắt buộc đúng 10 chữ số, nhưng "abc123" lại chứa chữ cái.
*   **Trường hợp 5:** Bị chặn Submit. Trình duyệt báo lỗi văn bản quá ngắn. Thuộc tính `minlength="8"` yêu cầu ít nhất 8 ký tự, nhưng hiện tại chỉ có 3.

---

## Câu A3 — Accessibility
1. **Tại sao `<label for="email">` quan trọng:** 
   * Trình đọc màn hình (Screen Reader) sẽ đọc to nội dung label khi người dùng focus vào input, giúp người khiếm thị biết cần nhập gì. 
   * Giúp tăng diện tích click: Người dùng bấm vào chữ của thẻ label thì input sẽ tự động được focus.
2. **Sử dụng `<fieldset>` + `<legend>`:** Dùng để gom nhóm một tập hợp các thẻ input có liên quan logic với nhau. 
   * *Ví dụ:* Gom nhóm các ô nhập (Thành phố, Quận, Số nhà) vào một `<fieldset>` có `<legend>` là "Thông tin giao hàng".
3. **Sử dụng `aria-label`:** 
   * Dùng khi một nút bấm hoặc input thực hiện chức năng qua icon (như nút kính lúp tìm kiếm) mà không có văn bản hiển thị ra màn hình để screen reader đọc.
   * **KHÔNG nên dùng** khi đã có thẻ `<label>` vì sẽ gây thừa thãi, screen reader có thể đọc lặp lại 2 lần gây khó chịu.

---

## Câu A4 — Media
1. **Thuộc tính `loading="lazy"`:** 
   * **Cải thiện:** Trì hoãn việc tải ảnh cho đến khi cuộn trang đến gần nó, giúp web load nhanh lúc đầu và tiết kiệm băng thông.
   * **Không nên dùng:** Đối với các ảnh ở ngay màn hình đầu tiên (banner chính, logo) vì sẽ làm web có vẻ bị lỗi hiển thị lúc mới tải.
2. **Nên cung cấp nhiều `<source>` trong `<video>`:** Vì mỗi trình duyệt hỗ trợ định dạng video khác nhau. Trình duyệt sẽ tự chọn định dạng tốt nhất mà nó phát được.
   * *3 format phổ biến:* `.mp4`, `.webm`, `.ogg`.
3. **Thuộc tính `alt`:** Hiển thị văn bản thay thế nếu ảnh bị lỗi, hỗ trợ screen reader và giúp SEO.
   * Ảnh iPhone 16: `alt="Điện thoại iPhone 16 Pro Max màu Titan"`
   * Ảnh trang trí: `alt=""` (Để rỗng để screen reader bỏ qua).
   * Ảnh biểu đồ: `alt="Biểu đồ cột hiển thị doanh thu quý 1 năm 2026 đạt 500 tỷ"`

---

## Câu A5 — So sánh `<figure>` vs `<img>`
*   **Cách 1 (`<img>`):** Dùng cho ảnh thông thường, đứng lẫn vào văn bản, không có tính độc lập và không cần chú thích rõ ràng (VD: Ảnh logo web, icon avatar user).
*   **Cách 2 (`<figure>` + `<figcaption>`):** Dùng khi bức ảnh mang ý nghĩa trọn vẹn, độc lập với luồng văn bản chính và bắt buộc cần có dòng chú thích giải nghĩa (VD: Ảnh sản phẩm kèm giá tiền trong trang E-commerce, Biểu đồ phân tích tài chính).
