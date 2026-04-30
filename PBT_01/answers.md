# PHẦN A — KIỂM TRA ĐỌC HIỂU

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
```

**2. Giải thích chuyên sâu về cơ chế hiển thị:**

* **Phần tử Block-level (Thẻ `<div>`):** Trong mô phỏng trên, các thẻ `<div>` (Hộp 1, 2, 3) tạo ra các khối hình chữ nhật lớn. Đặc tính của Block là luôn chiếm **100% chiều rộng** của phần tử cha chứa nó và **ép buộc bắt đầu ở một dòng mới**. Do đó, chúng đẩy mọi thứ khác xuống dưới và xếp chồng lên nhau theo chiều dọc.
* **Phần tử Inline-level (Thẻ `<span>`, `<strong>`):** Đặc tính của Inline là **chỉ chiếm không gian vừa đúng bằng chiều rộng của nội dung chữ** bên trong nó. Nó không gây ngắt dòng mà sẽ xếp nối tiếp nhau trên cùng một dòng ngang. Đó là lý do "Text A" đứng dính liền với "Text B", và "Text C" đứng liền với chữ in đậm "**Text D**".

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
# PHẦN B — THỰC HÀNH CODE

## Bài B3 — Gỡ lỗi HTML
Danh sách 10 lỗi đã được tìm và sửa trong file `debug.html`:

1. **Dòng 1:** Thiếu chữ `html` trong `<!DOCTYPE>` -> Cú pháp sai. Sửa thành `<!DOCTYPE html>`.
2. **Dòng 1:** Thẻ `<html>` thiếu thuộc tính ngôn ngữ `lang="vi"`.
3. **Dòng 2:** Thẻ `<title>` chưa có thẻ đóng `</title>`.
4. **Dòng 3:** Sai chuẩn khai báo ký tự `<meta charset="utf8">` -> Sửa thành chuẩn `<meta charset="UTF-8">`.
5. **Dòng 5:** Viết sai thẻ đóng `<h1>` thành `<h1>` (thiếu dấu gạch chéo) -> Sửa thành `</h1>`.
6. **Dòng 9:** Viết sai thẻ đóng `<a>` thành `<a>` -> Sửa thành `</a>`.
7. **Dòng 16:** Thẻ `<img>` thiếu thuộc tính `alt` (lỗi ngữ nghĩa/trợ năng) và giá trị của `src` thiếu dấu ngoặc kép -> Sửa thành `<img src="iphone.jpg" alt="iPhone 16 Pro">`.
8. **Dòng 18:** Lỗi thẻ lồng nhau chéo (Nesting Error) `<b>` mở trong `<p>` nhưng lại đóng ngoài `<p>`. -> Đảo lại thành `<b>25.990.000đ</b></p>`.
9. **Dòng 22:** Bảng `<table>` thiếu vùng chứa cấu trúc ngữ nghĩa `<thead>` và `<tbody>`.
10. **Dòng 35:** Một trang web có tới 2 thẻ `<main>` (lỗi nghiêm trọng vì `<main>` chỉ được có 1) -> Đổi thẻ `<main>` thứ hai thành `<aside>`.
11. **Dòng 40:** Thẻ `<p>` chưa có thẻ đóng `</p>`.

---

## Bài B4 — Phân tích trang web thật (tiki.vn)

**1. Tab Elements (HTML5 Semantic):**
* **3 thẻ Semantic đúng:**
    * `<header>`: Nằm ở đầu trang, chứa logo Tiki và thanh tìm kiếm.
    * `<main>`: Chứa toàn bộ nội dung hiển thị sản phẩm chính.
    * `<footer>`: Nằm ở cuối cùng, chứa các thông tin liên hệ và chính sách chăm sóc khách hàng.
* **2 thẻ dùng sai ngữ nghĩa:**
    * Lạm dụng `<div>` có gắn sự kiện `onClick` để làm nút bấm thay vì dùng thẻ `<button>`.
    * Lạm dụng `<span>` thay thế cho thẻ tiêu đề `<h2>` ở một số tên danh mục khối.

**2. Phân tích Bảng thông số kỹ thuật (Thực tế không dùng `<table>`):**
* Qua việc dùng công cụ Inspect để phân tích phần "Thông tin chi tiết" của một sản phẩm trên Tiki, em phát hiện ra hệ thống **không hề sử dụng thẻ `<table>`** ngữ nghĩa.
* Thay vào đó, lập trình viên sử dụng cấu trúc các thẻ `<div>` lồng nhau kết hợp với thẻ `<span>` để chứa văn bản. Khung lưới của bảng được tạo ra hoàn toàn bằng **CSS Grid** (`style="display: grid; grid-template-columns: 55% 45%;"`).
* **Đánh giá:** Cách làm này hy sinh một phần tính ngữ nghĩa (Semantic HTML) của dữ liệu dạng bảng, nhưng bù lại mang tới khả năng tuỳ biến giao diện cực kỳ mạnh mẽ. `<div>` kết hợp Flex/Grid giúp hệ thống dễ dàng cấu trúc lại bố cục khi người dùng lướt web trên điện thoại (Responsive Design) - điều mà thẻ `<table>` truyền thống xử lý rất cồng kềnh.

**3. Phân tích thanh tìm kiếm (Tìm thẻ `<form>`):**
* Qua quá trình Inspect thực tế (như trong ảnh chụp màn hình), em phát hiện ra trang web Tiki hiện tại **không sử dụng thẻ `<form>` ngữ nghĩa** cho thanh tìm kiếm chính.
* Thay vào đó, họ sử dụng cấu trúc các khối `<div>` lồng nhau để tạo giao diện (chứa thẻ `<input type="text">` để nhập từ khóa và thẻ `<button>` để submit). Có thể Tiki sử dụng JavaScript/React để bắt sự kiện người dùng nhấn Enter hoặc click nút, sau đó gọi API tìm kiếm trực tiếp chứ không dùng cơ chế submit form truyền thống của HTML. Đây là một điểm thú vị về cách các hệ thống lớn tối ưu Single Page Application (SPA).

*(Lưu ý: Các ảnh chụp minh họa đã được lưu trong thư mục `screenshots/`)*
# PHẦN C — SUY LUẬN

## Câu C1 — Thiết kế cấu trúc
*Nhiệm vụ: Thiết kế bộ khung HTML ngữ nghĩa cho trang Chi tiết sản phẩm.*
```html
<!-- Bắt đầu phần Header và Điều hướng chính của trang -->
<header>
    <!-- nav: Dùng cho cụm liên kết điều hướng chính (Menu) -->
    <nav>
        <ul>
            <li><a href="/">Trang chủ</a></li>
            <li><a href="/category">Danh mục</a></li>
        </ul>
    </nav>
</header>

<!-- Khối nội dung chính, duy nhất của trang chi tiết -->
<main>
    <!-- nav: Cũng dùng cho Breadcrumb vì nó là một dạng điều hướng phụ -->
    <nav aria-label="breadcrumb">
        <!-- ol: Dùng danh sách có thứ tự vì breadcrumb có tính phân cấp từ lớn đến nhỏ -->
        <ol>
            <li><a href="/">Trang chủ</a></li>
            <li><a href="/dien-thoai">Điện thoại</a></li>
            <li>iPhone 16</li>
        </ol>
    </nav>

    <!-- article: Dùng cho toàn bộ thông tin về 1 sản phẩm độc lập, có ý nghĩa trọn vẹn -->
    <article>
        <!-- Khối 1: Hình ảnh sản phẩm -->
        <section class="product-gallery">
            <!-- figure: Bao bọc hình ảnh sản phẩm có ý nghĩa minh họa nội dung -->
            <figure>
                <img src="main-img.jpg" alt="Ảnh chính iPhone 16">
                <!-- ul/li: Danh sách các ảnh thu nhỏ (thumbnails) -->
                <ul>
                    <li><img src="thumb1.jpg" alt="Góc trái"></li>
                    <li><img src="thumb2.jpg" alt="Góc phải"></li>
                </ul>
            </figure>
        </section>

        <!-- Khối 2: Thông tin cơ bản (tên, giá, mô tả) -->
        <section class="product-info">
            <!-- h1: Tiêu đề quan trọng nhất, tên sản phẩm -->
            <h1>iPhone 16 Pro Max 256GB</h1>
            <!-- mark hoặc strong: Nhấn mạnh giá tiền -->
            <p>Giá: <strong>25.990.000đ</strong></p>
            <p>Mô tả chi tiết sản phẩm...</p>
        </section>

        <!-- Khối 3: Bảng thông số kỹ thuật -->
        <section class="product-specs">
            <h2>Thông số kỹ thuật</h2>
            <!-- table: Dùng đúng mục đích trình bày dữ liệu dạng lưới/dòng cột -->
            <table>
                <tbody>
                    <tr>
                        <th>Màn hình</th>
                        <td>OLED 6.7 inch</td>
                    </tr>
                </tbody>
            </table>
        </section>

        <!-- Khối 4: Khu vực Đánh giá/Bình luận -->
        <section class="product-reviews">
            <h2>Đánh giá từ người dùng</h2>
            <!-- article: Mỗi bình luận của người dùng cũng là một nội dung độc lập -->
            <article class="review-item">
                <h3>Người dùng A</h3>
                <p>Máy mượt, chụp ảnh đẹp!</p>
            </article>
        </section>
    </article>

    <!-- aside: Dành cho nội dung có liên quan nhưng không phải nội dung chính (Sản phẩm tương tự) -->
    <aside class="related-products">
        <h2>Sản phẩm tương tự</h2>
        <ul>
            <li><a href="#">iPhone 15 Pro</a></li>
            <li><a href="#">Samsung S24 Ultra</a></li>
        </ul>
    </aside>
</main>

<!-- footer: Phần chân trang, chứa thông tin bản quyền, liên hệ chung -->
<footer>
    <p>&copy; 2026 ShopTLU. All rights reserved.</p>
</footer>
```

---

## Câu C2 — So sánh & Tranh luận
*Nhiệm vụ: Phản biện quan điểm "Chỉ cần dùng `<div>` là đủ, không cần HTML ngữ nghĩa".*

Chào cậu, tớ hiểu lý do cậu thích dùng thẻ `<div>` kết hợp CSS class vì nó mang lại cảm giác nhanh gọn và dễ kiểm soát giao diện. Tuy nhiên, nếu xây dựng một dự án thực tế, việc bỏ qua HTML ngữ nghĩa (Semantic HTML) sẽ mang lại nhiều rủi ro lớn về mặt kỹ thuật:

**Thứ nhất, về mặt SEO (Tối ưu hóa công cụ tìm kiếm):** Googlebot là những cỗ máy không "nhìn" thấy giao diện đẹp hay xấu, chúng chỉ đọc mã HTML. Nếu cậu dùng một "rừng" thẻ `<div>`, Googlebot sẽ coi mọi nội dung là ngang hàng nhau và không biết đâu là nội dung cốt lõi. Ngược lại, khi dùng các thẻ `<main>`, `<article>`, `<h1>`, chúng ta đang "chỉ điểm" cho Google biết đâu là phần quan trọng nhất để ưu tiên xếp hạng khi người dùng tìm kiếm.

**Thứ hai, về Accessibility (Trợ năng):** Người khiếm thị sử dụng Screen Readers (trình đọc màn hình) để lướt web. Phần mềm này dựa vào cấu trúc ngữ nghĩa để điều hướng. Ví dụ, nó cho phép người dùng ấn phím tắt để nhảy thẳng đến `<main>` (bỏ qua menu dài dòng), hoặc liệt kê tất cả các `<h2>`, `<h3>` để xem tóm tắt trang. Thẻ `<div>` hoàn toàn vô dụng trong trường hợp này.

**Một ví dụ cụ thể:** Nếu cậu tạo nút bấm bằng `<div class="btn">Click</div>`, cậu phải viết thêm Javascript để bắt sự kiện phím `Enter` và `Space`, đồng thời bổ sung các thuộc tính `aria-*` để máy đọc hiểu đó là nút. Nhưng nếu cậu dùng thẻ chuẩn `<button>Click</button>`, trình duyệt đã tự động xử lý toàn bộ các thao tác bàn phím và trợ năng đó từ trong trứng nước, tiết kiệm rất nhiều code.

**Tuy nhiên, `<div>` không hề sai:** Tớ hoàn toàn đồng ý việc sử dụng thẻ `<div>` khi chúng ta cần một **container (vỏ bọc) thuần túy để chia bố cục layout** bằng CSS Flexbox hoặc Grid, mà bản thân khối đó không mang ý nghĩa nội dung gì (ví dụ: bọc 2 cột thành 1 hàng). 

Tóm lại, `<div>` dùng cho "Giao diện", còn Semantic HTML dùng cho "Ý nghĩa dữ liệu". Kết hợp cả hai mới là Best Practice cậu ạ!
