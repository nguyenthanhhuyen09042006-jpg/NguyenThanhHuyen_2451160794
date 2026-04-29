# PHẦN A — KIỂM TRA ĐỌC HIỂU (BẢN CHI TIẾT)

## Câu A1 — HTTP & Trình duyệt
*Nguồn tham chiếu: 01_introduction_html_universe.md*

**1. Luồng xử lý chi tiết 5 bước khi nhập URL `https://shopee.vn` và nhấn Enter:**

1. **Tra cứu DNS (DNS Lookup):** Trình duyệt không hiểu tên miền dạng chữ. Nó sẽ kiểm tra bộ nhớ cache (của trình duyệt, hệ điều hành, router). Nếu không có, nó gửi yêu cầu đến máy chủ DNS của nhà cung cấp mạng để phân giải tên miền `shopee.vn` thành địa chỉ IP thực tế của máy chủ.
2. **Thiết lập kết nối (TCP & TLS Handshake):** * **TCP:** Trình duyệt thực hiện quá trình "bắt tay 3 bước" với máy chủ để thiết lập một kết nối truyền dữ liệu.
   * **TLS:** Vì trang web dùng `HTTPS` (bảo mật), máy chủ và trình duyệt sẽ trao đổi chứng chỉ SSL và thống nhất khóa mã hóa chung.
3. **Gửi yêu cầu HTTP (HTTP Request):** Trình duyệt đóng gói một yêu cầu HTTP (thường là lệnh `GET`) kèm theo các thông tin như User-Agent, Cookies... và gửi tới máy chủ.
4. **Nhận phản hồi HTTP (HTTP Response):** Máy chủ xử lý yêu cầu và trả về một luồng dữ liệu. Trong đó chứa mã trạng thái (Status Code - ví dụ: `200 OK`) và phần nội dung chính (mã nguồn HTML).
5. **Phân tích và Kết xuất (Parse & Render):** * Trình duyệt đọc mã HTML để xây dựng cây Cấu trúc (DOM).
   * Trong quá trình đọc, nó gửi thêm yêu cầu tải CSS, JavaScript và hình ảnh.
   * Cuối cùng, trình duyệt kết hợp tất cả để tính toán bố cục và "vẽ" (Render) giao diện lên màn hình.

**2. Tab Network trong DevTools:**

*(Ảnh minh họa đã được lưu trong thư mục screenshots)*

## Câu A2 — HTML ngữ nghĩa (Semantic HTML)
*Nguồn tham chiếu: Chương 04 - Semantic HTML*

**1. Tại sao cấu trúc `<div>` làm giảm điểm SEO và Trợ năng?**

Thẻ `<div>` là một thẻ hoàn toàn vô nghĩa (non-semantic). Việc lạm dụng `<div>` (Divitis) khiến các công cụ tìm kiếm (Googlebot) và trình đọc màn hình cho người khiếm thị không thể phân biệt được đâu là nội dung quan trọng nhất, đâu là menu điều hướng. Điều này làm giảm điểm SEO và trải nghiệm tiếp cận (Accessibility).

**2. 4 lỗi ngữ nghĩa và bản sửa chuẩn hóa:**

* **Lỗi 1:** `<div class="header">` — Cần đổi thành `<header>`.
* **Lỗi 2:** `<div class="menu">` — Các liên kết điều hướng phải được đặt trong vùng `<nav>`.
* **Lỗi 3:** `<div class="main">` — Nội dung cốt lõi phải được bao bọc bởi thẻ `<main>`.
* **Lỗi 4:** `<div class="product">` — Một sản phẩm độc lập bắt buộc phải dùng thẻ `<article>`.

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

---

## Câu A3 — Khối (Block) vs Nội tuyến (Inline)
*Nguồn tham chiếu: Kiến thức nền tảng HTML*

**1. Mô phỏng cấu trúc hiển thị trên trình duyệt (ASCII Art):**

```text
+--------------------------------------------------------------------+
| Hộp 1                                                              |
+--------------------------------------------------------------------+
Text AText B

+--------------------------------------------------------------------+
| Hộp 2                                                              |
+--------------------------------------------------------------------+
Text C**Text D**

+--------------------------------------------------------------------+
| Hộp 3                                                              |
+--------------------------------------------------------------------+
**2. Giải thích chuyên sâu về cơ chế hiển thị:**

**Phần tử Block-level (Thẻ <div>): Trong mô phỏng trên, các thẻ <div> (Hộp 1, 2, 3) tạo ra các khối hình chữ nhật lớn. Đặc tính của Block là luôn chiếm **100% chiều rộng** của phần tử cha chứa nó và **ép buộc bắt đầu ở một dòng mới**. Do đó, chúng đẩy mọi thứ khác xuống dưới và xếp chồng lên nhau theo chiều dọc.**

**Phần tử Inline-level (Thẻ <span>, <strong>): Đặc tính của Inline là chỉ **chiếm không gian vừa đúng bằng chiều rộng của nội dung chữ** bên trong nó. Nó không gây ngắt dòng mà sẽ xếp nối tiếp nhau trên cùng một dòng ngang. Đó là lý do "Text A" đứng dính liền với "Text B", và "Text C" đứng liền với chữ in đậm **"Text D"**.**

---

## Câu A4 — Cấu trúc Bảng (Table)
*Nguồn tham chiếu: 05_tables_hyperlinks.md*

**1. Sự khác nhau giữa `<thead>`, `<tbody>`, `<tfoot>`:**

* `<thead>` (Table Head): Chứa các hàng tiêu đề cột (`<th>`), giúp trình duyệt giữ cố định tiêu đề khi cuộn.
* `<tbody>` (Table Body): Chứa nội dung, dữ liệu trọng tâm của bảng.
* `<tfoot>` (Table Foot): Chứa hàng tổng kết (tổng tiền, lưu ý). Thường được hiển thị ở dưới cùng của bảng.

**2. 3 lý do tuyệt đối KHÔNG DÙNG bảng để thiết kế bố cục trang web:**

1. **Phá vỡ cấu trúc ngữ nghĩa (Semantics & Accessibility):** Bảng sinh ra chỉ để biểu diễn dữ liệu dạng ma trận. Dùng bảng để chia layout khiến trình đọc màn hình đọc sai thứ tự nội dung.
2. **Khó bảo trì và gây "Tag Soup":** Lồng ghép vô số các thẻ `<table>`, `<tr>`, `<td>` vào nhau khiến code phình to, rối rắm và cực kỳ khó sửa lỗi.
3. **Mất khả năng Responsive (Thiết kế thích ứng):** Bảng rất cứng nhắc, khó tự động bẻ gãy dòng hay chuyển từ ngang sang dọc khi xem trên điện thoại. Các kỹ thuật hiện đại như Flexbox hoặc CSS Grid xử lý việc này tốt hơn rất nhiều.
