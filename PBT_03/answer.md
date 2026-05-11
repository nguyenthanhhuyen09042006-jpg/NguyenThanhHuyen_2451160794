## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 (5đ) — 3 Cách nhúng CSS

**1. Nội tuyến (Inline CSS)**
- **Ví dụ code:** `<h1 style="color: red;">ShopTLU</h1>`
- **Ưu điểm:** Nhanh gọn, ưu tiên cao nhất, có tác dụng ngay lập tức.
- **Nhược điểm:** Khó bảo trì, không tái sử dụng được, làm code HTML lộn xộn.
- **Khi nào nên dùng:** Khi cần test nhanh giao diện hoặc dùng JS đổi style động.

**2. Nội bộ (Internal CSS)**
- **Ví dụ code:** `<style> h1 { color: blue; } </style>`
- **Ưu điểm:** Gom CSS vào chung 1 file HTML, không cần tạo file ngoài.
- **Nhược điểm:** Không chia sẻ được style cho các file HTML khác trong dự án.
- **Khi nào nên dùng:** Dự án chỉ có 1 trang (Landing page nhỏ), hoặc làm template Email.

**3. Bên ngoài (External CSS)**
- **Ví dụ code:** `<link rel="stylesheet" href="style.css">`
- **Ưu điểm:** HTML sạch sẽ, tái sử dụng được 1 file CSS cho hàng trăm trang web, web tải nhanh hơn nhờ cache.
- **Nhược điểm:** Trình duyệt tốn thêm 1 request để tải file CSS về.
- **Khi nào nên dùng:** Tiêu chuẩn bắt buộc cho mọi dự án thực tế.

**Câu hỏi thêm:** Cách **Nội tuyến (Inline CSS)** sẽ thắng. Vì theo quy tắc Specificity (Độ ưu tiên), các style viết trực tiếp bên trong thẻ được trình duyệt coi là chỉ thị cụ thể nhất nên có điểm cao nhất, tự động ghi đè Internal và External CSS.

### Câu A2 (8đ) — CSS Selectors — Dự đoán kết quả

1. `h1`                           → Chọn: **ShopTLU**
2. `.price`                       → Chọn: **25.990.000đ** và **45.990.000đ**
3. `#app header`                  → Chọn: **Toàn bộ khối thẻ <header>**
4. `nav a:first-child`            → Chọn: **Home**
5. `.product.featured h2`         → Chọn: **MacBook Pro**
6. `article > p`                  → Chọn: **25.990.000đ, Mô tả sản phẩm..., 45.990.000đ, Mô tả sản phẩm...**
7. `a[href="/"]`                  → Chọn: **Home**
8. `.top-bar.dark h1`             → Chọn: **ShopTLU**
<img width="1916" height="978" alt="A2_PBT3" src="https://github.com/user-attachments/assets/6c8b2828-d558-42d3-a071-dd79df5b7f04" />
### Câu A3 (7đ) — Box Model — Tính toán kích thước

**Trường hợp 1: content-box (mặc định)**
- Chiều rộng hiển thị = width(400) + padding(40) + border(10) = **450px**
- Không gian chiếm trên trang = hiển thị(450) + margin(20) = **470px**

**Trường hợp 2: border-box**
- Chiều rộng hiển thị = **400px** *(width đã bao trọn cả padding và border)*
- Kích thước content thực tế = width(400) - padding(40) - border(10) = **350px**
- Không gian chiếm trên trang = hiển thị(400) + margin(20) = **420px**

**Trường hợp 3: Margin collapse**
- Khoảng cách giữa box-a và box-b = **40px**. 
- Giải thích: Hiện tượng "Margin Collapse" khiến lề trên và lề dưới của 2 block đứng sát nhau không cộng dồn (25+40=65) mà gộp lại và lấy giá trị lớn hơn.

**Nâng cao:** Khoảng cách = 40 + (-10) = **30px** (Tính tổng đại số khi 1 margin dương và 1 margin âm gặp nhau).


### Câu A4 (5đ) — Specificity (Độ ưu tiên)

1. **Tính specificity score:**
   - Rule A (p): (0, 0, 1)
   - Rule B (.price): (0, 1, 0)
   - Rule C (#main-price): (1, 0, 0)
   - Rule D (p.price): (0, 1, 1)
2. **Element màu gì?** Màu **Đỏ (red)**. Vì Rule C dùng ID nên điểm ưu tiên cao nhất.
3. **Thêm style="color: orange;":** Màu **Cam (orange)**. Vì Inline CSS ưu tiên hơn ID.
4. **Thêm !important vào Rule A:** Màu **Đen (black)**. Vì `!important` bẻ gãy mọi quy tắc tính điểm.


## PHẦN B — THỰC HÀNH CODE

### Bài B1 — 5 loại CSS Selectors đã sử dụng:
1. **Universal selector:** `*`
2. **Element selector:** `body`, `header`, `nav`, `table`, `footer`
3. **Class selector:** `.active`
4. **ID selector:** `#contact`
5. **Descendant selector:** `nav a`, `thead tr`, `figure img`
6. **Pseudo-class selector:** `:hover`, `:nth-child(even)`


### Bài B2 — Box Model Lab
- **Hộp 1 (content-box):** chiều rộng thực tế = **350px** (đo từ DevTools)
<img width="1918" height="977" alt="B2H1PBT3" src="https://github.com/user-attachments/assets/8d6b4df5-2e88-4798-a046-3581c74baab8" />
- **Hộp 2 (border-box):** chiều rộng thực tế = **300px** (đo từ DevTools)
- <img width="1911" height="973" alt="B2H2PBT3" src="https://github.com/user-attachments/assets/3a1b8bbe-b03c-479b-8a1d-0736631bc932" />
- **Giải thích sự khác biệt:** - Với `content-box`, `width` chỉ là chiều rộng của vùng nội dung. Trình duyệt sẽ cộng thêm padding và border vào làm cho hộp phình to ra (300 + 40 + 10 = 350px).
  - Với `border-box`, `width` quy định tổng chiều rộng của cả hộp. Trình duyệt sẽ tự động ép vùng nội dung nhỏ lại để nhường chỗ cho padding và border, giúp tổng kích thước hộp luôn giữ đúng 300px.


### Bài B3 — Specificity Battle
1. **10 rules + specificity score:**
   - `* { color: black; }` -> Điểm: (0,0,0)
   - `p { color: gray; }` -> Điểm: (0,0,1)
   - `.text { color: yellow; }` -> Điểm: (0,1,0)
   - `.highlight { color: pink; }` -> Điểm: (0,1,0)
   - `p.text { color: orange; }` -> Điểm: (0,1,1)
   - `p.highlight { color: purple; }` -> Điểm: (0,1,1)
   - `.text.highlight { color: brown; }` -> Điểm: (0,2,0)
   - `p.text.highlight { color: cyan; }` -> Điểm: (0,2,1)
   - `#demo { color: blue; }` -> Điểm: (1,0,0)
   - `#demo.highlight { color: red; }` -> Điểm: (1,1,0)

2. **Element hiển thị màu gì? Tại sao?**
   - Hiển thị màu **Đỏ (red)**. 
   - Giải thích: Vì rule `#demo.highlight` có chứa ID kết hợp với Class nên cho ra điểm Specificity (1,1,0) - điểm số cao nhất trong tất cả các rules được viết.

3. *(Screenshot đã được lưu trong thư mục screenshots/)*

4. **Thay đổi thứ tự rules trong file CSS, kết quả có đổi không?**
   - Kết quả **KHÔNG** đổi.
   - Giải thích: Trình duyệt áp dụng màu dựa trên điểm Specificity trước tiên. Yếu tố thứ tự trên/dưới chỉ được đem ra xét duyệt khi 2 rules có ĐIỂM BẰNG NHAU. Vì `#demo.highlight` đang có điểm cao nhất một cách tuyệt đối, nên dù nằm ở đâu trong file, nó vẫn chiến thắng.
