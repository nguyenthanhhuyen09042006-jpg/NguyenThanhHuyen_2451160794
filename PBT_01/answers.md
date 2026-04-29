# PHẦN A — KIỂM TRA ĐỌC HIỂU (BẢN CHI TIẾT)

## Câu A1 — HTTP & Trình duyệt
*Nguồn tham chiếu: 01_introduction_html_universe.md*

**1. Luồng xử lý chi tiết 5 bước khi nhập URL `https://shopee.vn` và nhấn Enter:**

1. **Tra cứu DNS (DNS Lookup):** Trình duyệt không hiểu tên miền dạng chữ. Nó sẽ kiểm tra bộ nhớ cache (của trình duyệt, hệ điều hành, router). Nếu không có, nó gửi yêu cầu đến máy chủ DNS của nhà cung cấp mạng (ISP) để phân giải tên miền `shopee.vn` thành địa chỉ IP thực tế của máy chủ (ví dụ: `119.81.25.x`).
2. **Thiết lập kết nối (TCP & TLS Handshake):** * **TCP:** Trình duyệt thực hiện quá trình "bắt tay 3 bước" (SYN, SYN-ACK, ACK) với máy chủ để thiết lập một kết nối truyền dữ liệu đáng tin cậy.
   * **TLS:** Vì trang web dùng `HTTPS` (bảo mật), máy chủ và trình duyệt sẽ trao đổi chứng chỉ SSL và thống nhất một khóa mã hóa chung để đảm bảo dữ liệu không bị đọc trộm trên đường truyền.
3. **Gửi yêu cầu HTTP (HTTP Request):** Trình duyệt đóng gói một yêu cầu HTTP (thường là lệnh `GET`) kèm theo các thông tin như User-Agent (thông tin trình duyệt, hệ điều hành của bạn), Accept-Language, Cookies... và gửi tới máy chủ.
4. **Nhận phản hồi HTTP (HTTP Response):** Máy chủ xử lý yêu cầu và trả về một luồng dữ liệu. Trong đó chứa mã trạng thái (Status Code - ví dụ: `200 OK` nghĩa là thành công) và phần nội dung chính (body) chính là mã nguồn HTML của trang web.
5. **Phân tích và Kết xuất (Parse & Render):** * Trình duyệt đọc mã HTML từ trên xuống dưới để xây dựng cây Cấu trúc Khách thể Tài liệu (DOM).
   * Trong quá trình đọc, nếu gặp các thẻ `<link>` hoặc `<img>`, nó sẽ tạo thêm các luồng request mới để tải CSS (xây dựng cây CSSOM), JavaScript và hình ảnh.
   * Cuối cùng, trình duyệt kết hợp DOM và CSSOM để tính toán bố cục (Layout/Reflow) và "vẽ" (Paint) các điểm ảnh lên màn hình cho bạn xem.

**2. Tab Network trong DevTools:**
*(Ảnh minh họa đã được lưu trong thư mục screenshots)*

## Câu A2 — HTML ngữ nghĩa (Semantic HTML)
*Nguồn tham chiếu: Chương 04 - Semantic HTML*

**1. Tại sao cấu trúc `<div>` làm giảm điểm SEO và Trợ năng?**

Thẻ `<div>` là một thẻ hoàn toàn vô nghĩa (non-semantic). Các công cụ tìm kiếm (như Googlebot) và trình đọc màn hình cho người khiếm thị (Screen Readers) không hiểu được các thuộc tính `class` (bởi vì class là do con người tự đặt ra). Việc lạm dụng `<div>` (Divitis) khiến Googlebot không thể phân biệt được đâu là nội dung quan trọng nhất của trang, đâu là phần menu điều hướng phụ trợ, từ đó đánh giá thấp chất lượng và thứ hạng của trang web.

**2. 4 lỗi ngữ nghĩa và bản sửa chuẩn hóa:**

* **Lỗi 1:** `<div class="header">` — Không khai báo đúng vùng đầu trang. Cần đổi thành `<header>`.
* **Lỗi 2:** `<div class="menu">` — Các liên kết điều hướng chính phải được đặt trong vùng `<nav>` (Navigation) để máy đọc nhận diện được menu.
* **Lỗi 3:** `<div class="main">` — Nội dung cốt lõi, duy nhất của trang web phải được bao bọc bởi thẻ `<main>` để hỗ trợ tính năng "Skip to main content" (Bỏ qua điều hướng).
* **Lỗi 4:** `<div class="product">` — Một sản phẩm thương mại có tính độc lập, có thể cắt mang đi nơi khác mà vẫn đầy đủ ý nghĩa thì bắt buộc phải dùng thẻ `<article>`.

**Mã HTML chuẩn Semantic (đã tối ưu):**

```html
<header>
    <div class="logo">ShopTLU</div>
    <nav class="menu">
        <a href="/">Trang chủ</a>
        <a href="/products">Sản phẩm</a>
    </nav>
</header>
<main>
    <article class="product">
        <h3 class="title">iPhone 16 Pro</h3>
        <p class="price">25.990.000đ</p>
        <figure class="image">
            <img src="iphone.jpg" alt="Điện thoại iPhone 16 Pro">
        </figure>
    </article>
</main>
<footer>© 2026 ShopTLU</footer>
```
Câu A3 — Khối (Block) vs Nội tuyến (Inline)
Nguồn tham chiếu: Kiến thức nền tảng HTML

1. Mô phỏng cấu trúc hiển thị trên trình duyệt:

[Hộp 1]
Text AText B
[Hộp 2]
Text CText D
[Hộp 3]

2. Giải thích chuyên sâu về cơ chế hiển thị:

Phần tử Block-level (Thẻ <div>): Đặc tính của Block là luôn chiếm 100% chiều rộng của phần tử cha chứa nó và ép buộc bắt đầu ở một dòng mới. Do đó, Hộp 1, Hộp 2 và Hộp 3 sẽ tự động đẩy các phần tử khác xuống dòng dưới, tạo thành 3 khối xếp chồng lên nhau theo chiều dọc.

Phần tử Inline-level (Thẻ <span>, <strong>): Đặc tính của Inline là nó chỉ chiếm không gian vừa đúng bằng chiều rộng của nội dung (text) bên trong nó. Nó không gây ngắt dòng mà sẽ xếp nối tiếp nhau trên cùng một dòng ngang (từ trái qua phải) cho đến khi hết chỗ. Đó là lý do "Text A" đứng dính liền với "Text B", và "Text C" đứng liền với "Text D".

Câu A4 — Cấu trúc Bảng (Table)
Nguồn tham chiếu: 05_tables_hyperlinks.md

1. Sự khác nhau giữa <thead>, <tbody>, <tfoot>:

Ba thẻ này được sử dụng để phân chia dữ liệu bảng thành các phần logic, giúp trình duyệt, máy in và screen readers xử lý dễ dàng hơn.

<thead> (Table Head): Định nghĩa các hàng chứa tiêu đề cột (<th>). Nó giúp trình duyệt giữ cố định tiêu đề khi người dùng cuộn bảng (sticky header).

<tbody> (Table Body): Chứa nội dung, dữ liệu trọng tâm của bảng. Có thể có nhiều <tbody> trong một bảng để phân nhóm dữ liệu.

<tfoot> (Table Foot): Chứa hàng tổng kết (ví dụ: tổng tiền, lưu ý). Dù bạn viết <tfoot> ở giữa code HTML, một số trình duyệt vẫn tự động đẩy nó xuống hiển thị ở dưới cùng của bảng.

2. 3 lý do tuyệt đối KHÔNG DÙNG bảng để thiết kế bố cục trang web:

Phá vỡ cấu trúc ngữ nghĩa (Semantics & Accessibility): Bảng sinh ra chỉ để biểu diễn dữ liệu dạng ma trận (hàng - cột) có mối quan hệ với nhau. Khi dùng bảng để chia layout (ví dụ: cột trái làm menu, cột phải làm nội dung), trình đọc màn hình sẽ đọc nội dung theo thứ tự từng ô bảng rất cứng nhắc, gây hoang mang cho người khiếm thị.

Khó bảo trì và gây "Tag Soup" (Code phình to): Để tạo một giao diện có nhiều thành phần, bạn phải lồng ghép vô số các thẻ <table>, <tr>, <td> vào nhau. Code sẽ thụt lùi vào rất sâu, rối rắm, cực kỳ khó đọc, khó sửa lỗi và làm tăng kích thước file HTML một cách vô ích.

Mất khả năng Responsive (Thiết kế thích ứng): Đây là điểm yếu chí mạng trong thời đại Mobile-first. Bảng rất khó tự động bẻ gãy dòng hay chuyển từ xếp ngang sang xếp dọc khi xem trên điện thoại. Trong khi đó, các kỹ thuật CSS hiện đại (như Flexbox hay CSS Grid) giải quyết việc này rất dễ dàng và gọn gàng.


