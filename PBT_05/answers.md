## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 — Viewport & Mobile-First

1. **Thẻ Meta Viewport Chuẩn:**
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   
width=device-width: Chỉ thị cho trình duyệt đặt chiều rộng của trang web bằng đúng chiều rộng màn hình vật lý của thiết bị thực tế đang truy cập.

initial-scale=1.0: Xác định mức độ thu phóng (zoom) ban đầu khi trang vừa tải xong là 100% (tỷ lệ gốc 1:1), chặn tình trạng chữ bị thu nhỏ cưỡng ép.

Hệ quả khi thiếu thẻ Meta Viewport trên iPhone:
Nếu không cấu hình thẻ này, thiết bị di động (như iPhone) sẽ tự động giả định hiển thị trang web như trên một màn hình máy tính bàn lớn có chiều rộng mặc định tầm 980px. Trình duyệt sẽ cố nhét toàn bộ nội dung lớn đó bằng cách thu nhỏ tỷ lệ (zoom out) toàn trang, dẫn đến việc chữ, hình ảnh và các nút bấm trở nên bé tí hon, không thể đọc hay thao tác chuẩn nếu không dùng hai ngón tay để phóng to thủ công.

Phân biệt Mobile-First và Desktop-First:

Mobile-First: Tiếp cận bằng cách xây dựng giao diện tối giản cho màn hình nhỏ (Mobile) làm nền tảng CSS gốc ban đầu. Sau đó mới viết thêm các câu lệnh @media (min-width: ...) để mở rộng, bổ sung thêm tính năng và chia cột khi màn hình lớn hơn (Tablet, Desktop).

Desktop-First: Viết CSS gốc phức tạp nhất dành cho màn hình lớn (Desktop) trước. Sau đó dùng các câu lệnh @media (max-width: ...) để cắt tỉa bớt chi tiết, thu hẹp kích thước hoặc giấu phần tử khi màn hình nhỏ dần.

Ví dụ CSS minh họa (Breakpoint 768px):

CSS
/* CÁCH 1: MOBILE-FIRST APPROACH */
.sidebar { display: none; } /* Mặc định ẩn trên mobile */
@media (min-width: 768px) {
    .sidebar { display: block; width: 250px; } /* Hiện ra khi lên màn hình lớn */
}

/* CÁCH 2: DESKTOP-FIRST APPROACH */
.sidebar { display: block; width: 250px; } /* Mặc định hiện trên desktop */
@media (max-width: 767px) {
    .sidebar { display: none; } /* Giấu đi khi màn hình co nhỏ lại */
}

   * **Tại sao Mobile-First được khuyến dùng?** Do lượng thiết bị di động chiếm ưu thế tuyệt đối trong lưu lượng duyệt web hiện đại. Mobile-First giúp mã nguồn CSS nhẹ hơn đáng kể (do di động không phải tải đè các bộ lọc cấu trúc phức tạp của desktop), tăng tốc độ kết xuất dữ liệu trong điều kiện mạng 3G/4G, đồng thời ép lập trình viên tập trung tinh gọn nội dung cốt lõi của sản phẩm ngay từ đầu.

---

### Câu A2 — Tiêu chuẩn Breakpoints

| Kích thước (Pixel) | Tên gọi (Bootstrap) | Thiết bị đại diện điển hình | Bố cục lưới sản phẩm tối ưu gợi ý |
| :--- | :--- | :--- | :--- |
| **< 576px** | Extra Small (`xs`) | Màn hình điện thoại dọc (iPhone 13, SE, Galaxy) | **1 Cột** (Chiếm trọn bề ngang để tăng diện tích chạm) |
| **≥ 576px** | Small (`sm`) | Màn hình điện thoại xoay ngang | **2 Cột** |
| **≥ 768px** | Medium (`md`) | Các dòng máy tính bảng (iPad, Máy tính bảng Android) | **2 Cột đến 3 Cột** (Tùy thuộc có sidebar hay không) |
| **≥ 992px** | Large (`lg`) | Màn hình Laptop nhỏ, máy tính bảng cỡ lớn | **3 Cột** |
| **≥ 1200px** | Extra Large (`xl`) | Màn hình Desktop văn phòng thông dụng | **4 Cột** |
| **≥ 1400px** | Extra Extra Large (`xxl`)| Màn hình độ phân giải cao, màn hình Gaming | **4 đến 5 Cột** (Giữ không bị thưa thớt khoảng trống) |

---

### Câu A3 — Thực nghiệm Đọc mã Media Queries

Dựa theo quy luật ghi đè từ trên xuống dưới của chiến lược Mobile-First (`min-width`), giá trị độ rộng `.container` được phân tách chính xác như sau:

| Chiều rộng màn hình | Độ rộng `.container` nhận được | Giải thích quy trình xử lý của trình duyệt |
| :--- | :--- | :--- |
| **375px** (iPhone SE) | **100%** | Nhỏ hơn tất cả các mốc `min-width`, ăn theo CSS base. |
| **600px** | **540px** | Vượt qua mốc `576px`, áp dụng quy tắc khớp lệnh đầu tiên. |
| **800px** | **720px** | Vượt qua mốc `768px`, ghi đè giá trị cũ thành 720px. |
| **1000px** | **960px** | Vượt qua mốc `992px`, ghi đè giá trị cũ thành 960px. |
| **1400px** | **1140px** | Khớp với mốc cao nhất `1200px`, chốt giá trị 1140px. |

---

### Câu A4 — Kiến thức SCSS Cơ bản

1. **Bốn tính năng cốt lõi của SCSS:**
   * **Variables (Biến số)**: Khai báo lưu trữ giá trị tái sử dụng nhiều nơi qua ký tự `$`. Khi muốn đổi màu chủ đạo toàn hệ thống, chỉ cần sửa 1 dòng duy nhất tại biến gốc.
     * *Ví dụ:* `$primary-color: #0097e6; body { color: $primary-color; }`
   * **Nesting (Lồng mã)**: Viết các bộ chọn CSS lồng vào nhau tương ứng với cấu trúc phân cấp cây thư mục HTML, tránh việc lặp đi lặp lại tên class cha.
     * *Ví dụ:* `.card { background: white; .title { font-size: 14px; } }`
   * **Mixins (Hàm tái sử dụng)**: Định nghĩa một cụm thuộc tính CSS chung (có thể truyền tham số truyền vào giống hàm lập trình) rồi chèn nhanh vào bất cứ vị trí nào bằng lệnh `@include`.
     * *Ví dụ:* `@mixin flex-center { display: flex; justify-content: center; align-items: center; } .box { @include flex-center; }`
   * **@extend (Kế thừa)**: Cho phép một selector chia sẻ/xài chung lại toàn bộ các khối mã thuộc tính của một selector khác nhằm tối ưu dung lượng file đầu ra.
     * *Ví dụ:* `.btn-base { padding: 10px; border-radius: 4px; } .btn-submit { @extend .btn-base; background: green; }`

2. **Tại sao trình duyệt KHÔNG chạy được trực tiếp file `.scss`?**
   Bởi vì nhân đồ họa (Rendering Engine) của các trình duyệt web (như Blink trên Chrome, Gecko trên Firefox) từ trước tới nay chỉ được thiết kế theo chuẩn đặc tả W3C để đọc và hiểu duy nhất một định dạng file stylesheet thô sơ truyền thống là `.css`. Các cú pháp nâng cao của SCSS như lập trình cấu trúc cấu trúc điều kiện, hàm, biến số hoàn toàn nằm ngoài bộ thông dịch của trình duyệt.
   
3. **Giải pháp biên dịch (Compile):**
   Cần sử dụng một công cụ trung gian (Compiler) như thư viện hệ thống `Sass (npm package)` hoặc Extension trên VS Code (ví dụ: *Live Sass Compiler*) để quét dịch toàn bộ logic thiết kế từ file nguồn `.scss` chuyển đổi (transpile) thành một file `.css` thuần chuẩn mực trước khi nhúng trực tiếp vào file HTML.

---

## PHẦN C — PHÂN TÍCH THỰC TẾ & THIẾT KẾ CHIẾN LƯỢC

### Câu C1 — Phân tích Cấu trúc Trang Web Thực tế (Ví dụ: VNExpress)

* **Hành vi chuyển đổi Navigation:** 
  Trên màn hình Desktop (1440px), thanh điều hướng trải dài toàn bộ danh mục bài viết (Thời sự, Thế giới, Kinh doanh...). Khi chuyển về Tablet (768px), các danh mục phụ ẩn bớt vào một nút mở rộng. Lên phiên bản Mobile (375px), toàn bộ thanh điều hướng ngang biến mất hoàn toàn và được tích hợp gọn gàng vào trong duy nhất một biểu tượng Menu ba gạch (**Hamburger Button**) ở góc trái màn hình.
* **Biến đổi lưới hiển thị dòng chảy tin tức (Content Grid):**
  * *Desktop:* Layout chia 3 cột rõ rệt (Cột trái: Tin chính tiêu điểm lớn; Cột giữa: Các tin tức phụ dòng sự kiện; Cột phải: Khối danh sách tin đọc nhiều và Banner quảng cáo).
  * *Tablet:* Co cụm về thành 2 cột, đẩy banner quảng cáo lớn xuống phía bên dưới.
  * *Mobile:* Chuyển đổi thành cấu trúc **1 cột duy nhất** xếp chồng từ trên xuống dưới, ảnh tin tức thu gọn nằm vuông vắn phía trên tiêu đề bài viết.
* **Các thành phần được cấu hình ẩn giấu trên thiết bị di động:**
  Hầu hết các khối banner flash quảng cáo hai bên rìa trang, widget thời tiết/giá vàng chi tiết, và các khối dữ liệu bảng biểu phụ đều bị ẩn bằng thuộc tính `display: none` để tiết kiệm tài nguyên mạng và không gian hiển thị cho di động.
* **Kiểm tra Media Queries thực tế qua DevTools:**
  Trang sử dụng chiến lược linh hoạt phối hợp hai mốc breakpoint chính cực kỳ phổ biến sau:
  ```css
  @media screen and (min-width: 768px) { ... }
  @media screen and (min-width: 1024px) { ... }
  
Câu C2 — Thiết kế Sơ đồ Cấu trúc Wireframe Trang Đặt Bàn Nhà Hàng
1. Mô tả Bố cục Tổ chức Giao diện (Wireframe Concept)
Mobile (< 768px):

Header tối giản (Chỉ giữ Logo, số điện thoại ẩn vào icon nút gọi nhanh).

Hero Image co chiều cao gọn lại còn 40vh.

Grid 6 món ăn xếp dọc thành 1 cột độc nhất.

Form đặt bàn hiển thị chiếm 100% bề rộng, các ô nhập liệu xếp chồng hàng dọc.

Bản đồ Google Maps thu nhỏ nằm cuối trang, trên khối Footer.

Tablet (768px - 1023px):

Header rộng hơn (Hiện chữ số điện thoại).

Lưới ảnh món ăn mở rộng phân chia thành 2 cột x 3 hàng.

Form đặt bàn tự cân đối chia thành dạng 2 cột (Dòng 1: Ngày + Giờ; Dòng 2: Số người + Ghi chú).

Bản đồ chiếm trọn chiều ngang ở khu vực dưới form.

Desktop (≥ 1024px):

Thanh Header dàn đầy đủ thanh menu liên kết.

Lưới món ăn chia thành 3 cột x 2 hàng vuông vắn.

Áp dụng bố cục chia đôi không gian lớn: Khu vực Main chiếm 65% hiển thị Form đặt bàn, Khu vực Sidebar chiếm 35% bên phải ôm trọn khối Bản đồ Google Maps nhúng để khách hàng vừa xem vị trí vừa điền thông tin đặt chỗ song song.

2. Bộ Khung Mã Layout CSS Skeleton (Mobile-First Approach)
CSS
/* ==========================================================================
   KHUNG MÃ SKELETON BASE - THIẾT KẾ CHO MOBILE (MẶC ĐỊNH)
   ========================================================================== */
.restaurant-grid-container {
    display: grid;
    grid-template-columns: 1fr; /* 1 cột duy nhất tràn màn hình */
    gap: 15px;
}

.header-zone { padding: 15px; }
.hero-zone { height: 250px; background: #ccc; }

/* Lưới món ăn trên Mobile xếp dọc */
.food-photos-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
}

.booking-form-zone { width: 100%; }
.maps-zone { height: 300px; width: 100%; }
.footer-zone { padding: 20px; text-align: center; }

/* ==========================================================================
   BREAKPOINT CHO TABLET (MÀN HÌNH CHUYỂN TIẾP)
   ========================================================================== */
@media (min-width: 768px) {
    /* Nâng cấp lưới món ăn lên thành dạng 2 cột */
    .food-photos-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* ==========================================================================
   BREAKPOINT CHO DESKTOP (MÀN HÌNH LỚN)
   ========================================================================== */
@media (min-width: 1024px) {
    /* Chuyển đổi toàn bộ kiến trúc trang sang Grid 2 chiều phức tạp */
    .restaurant-grid-container {
        grid-template-columns: 1fr 350px; /* Cột chính chứa Form, cột phụ chứa Bản đồ */
    }
    
    /* Header và các vùng lớn kéo giãn bao phủ toàn bộ số lượng cột */
    .header-zone, .hero-zone, .food-photos-grid, .footer-zone {
        grid-column: 1 / -1; 
    }
    
    /* Nâng cấp lưới món ăn đạt tỷ lệ chuẩn hoàn hảo 3 cột trên desktop */
    .food-photos-grid {
        grid-template-columns: repeat(3, 1fr);
    }
    
    /* Bản đồ Maps tự động nhảy lên nằm song song làm sidebar bên cạnh Form */
    .maps-zone {
        grid-column: 2;
        height: 100%; /* Kéo giãn chiều cao khớp khít với chiều cao của form */
    }
}
