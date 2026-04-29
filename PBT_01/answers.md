# PHẦN A — KIỂM TRA ĐỌC HIỂU

## Câu A1 — HTTP & Trình duyệt
*Nguồn tham chiếu: 01_introduction_html_universe.md*

**1. 5 bước xảy ra khi nhập URL https://shopee.vn và nhấn Enter:**

1. **Tra cứu DNS (DNS Lookup):** Trình duyệt tìm kiếm địa chỉ IP thực của máy chủ tên miền `shopee.vn`.
2. **Thiết lập kết nối (TCP/TLS):** Trình duyệt thiết lập kết nối với máy chủ và thực hiện bắt tay bảo mật TLS/SSL do sử dụng giao thức HTTPS.
3. **Gửi yêu cầu HTTP (Request):** Trình duyệt gửi yêu cầu GET để lấy tài liệu HTML.
4. **Nhận phản hồi HTTP (Response):** Máy chủ trả về file HTML cùng mã trạng thái (ví dụ: 200 OK).
5. **Phân tích và Kết xuất (Parse & Render):** Trình duyệt đọc HTML, tiếp tục tải các tài nguyên phụ (CSS, JS, Ảnh) và vẽ giao diện ra màn hình.

**2. Tab Network trong DevTools:**

* Tab Network hiển thị toàn bộ các yêu cầu mạng (network requests) mà trình duyệt thực hiện để tải trang, bao gồm thời gian tải, dung lượng, mã trạng thái và loại tài nguyên (HTML, CSS, JS, XHR...).
* Hình ảnh đánh dấu mã trạng thái, thời gian tải và file CSS:
*(Ảnh đã được lưu trong thư mục screenshots)*
![Network Tab](screenshots/network.png)

---

## Câu A2 — HTML ngữ nghĩa
*Nguồn tham chiếu: Chương 04*

**1. Tại sao trang web bị Google đánh giá SEO thấp?**

Trang web lạm dụng hoàn toàn thẻ `<div>` (thẻ không có ý nghĩa ngữ nghĩa). Điều này khiến các bot tìm kiếm (Googlebot) và trình đọc màn hình không thể hiểu được cấu trúc trang (đâu là header, đâu là menu, đâu là nội dung chính), làm giảm điểm SEO và trải nghiệm tiếp cận (Accessibility).

**2. 4 lỗi ngữ nghĩa và bản sửa lại:**

* **Lỗi 1:** Dùng `<div class="header">` thay vì thẻ `<header>`.
* **Lỗi 2:** Dùng `<div class="menu">` thay vì thẻ điều hướng `<nav>`.
* **Lỗi 3:** Dùng `<div class="main">` thay vì thẻ `<main>`.
* **Lỗi 4:** Dùng `<div class="product">` thay vì thẻ `<article>` cho một đối tượng độc lập.

**Mã HTML sửa lại:**

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
            <img src="iphone.jpg" alt="iPhone 16 Pro">
        </figure>
    </article>
</main>
<footer>© 2026 ShopTLU</footer>
