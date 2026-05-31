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


# Câu A4 - Tính đặc hiệu (Độ ưu tiên)

**1. Điểm đặc hiệu tính toán (a, b, c) cho từng quy tắc:**
* **Rule A** (`p`): Điểm = **(0, 0, 1)** - (Có 1 Element).
* **Rule B** (`.price`): Điểm = **(0, 1, 0)** - (Có 1 Class).
* **Rule C** (`#main-price`): Điểm = **(1, 0, 0)** - (Có 1 ID).
* **Rule D** (`p.price`): Điểm = **(0, 1, 1)** - (Có 1 Class, 1 Element).

**2. Element sẽ có màu gì? Giải thích:**
* **Kết quả:** Phần tử sẽ có **màu đỏ (red)**.
* **Giải thích:** CSS sẽ ưu tiên áp dụng quy tắc có điểm đặc hiệu cao nhất. Trong 4 quy tắc trên, Rule C (`#main-price`) sử dụng bộ chọn ID nên có điểm cao nhất là (1, 0, 0). Do đó, thuộc tính `color: red` của Rule C sẽ ghi đè các quy tắc còn lại.

**3. Nếu thêm style trực tiếp `<p class="price" id="main-price" style="color: orange;">`:**
* **Kết quả:** Phần tử sẽ chuyển sang **màu cam (orange)**.
* **Giải thích:** CSS khai báo trực tiếp trên thẻ (Inline style) có độ ưu tiên cao hơn tất cả các bộ chọn thông thường (bao gồm cả ID, Class, Element) được viết trong file CSS bên ngoài. 

**4. Nếu thêm `!important` vào Quy tắc A (`p { color: black !important; }`):**
* **Kết quả:** Phần tử sẽ có **màu đen (black)**.
* **Giải thích:** Từ khóa `!important` là một ngoại lệ phá vỡ mọi quy tắc tính điểm đặc hiệu thông thường. Khi một thuộc tính được gắn `!important`, nó sẽ giành quyền ưu tiên tuyệt đối cao nhất, vượt qua cả bộ chọn ID lẫn Inline style. Vì vậy Rule A sẽ "chiến thắng" tất cả.


## PHẦN B — THỰC HÀNH CODE

### Bài B1 — 5 loại CSS Selectors đã sử dụng:
1. **Universal selector:** `*`
2. **Element selector:** `body`, `header`, `nav`, `table`, `footer`
3. **Class selector:** `.active`
4. **ID selector:** `#contact`
5. **Descendant selector:** `nav a`, `thead tr`, `figure img`
6. **Pseudo-class selector:** `:hover`, `:nth-child(even)`


### Bài B2 — Box Model Lab
#### Phần 1
- **Hộp 1 (content-box):** chiều rộng thực tế = **350px** (đo từ DevTools)
<img width="1918" height="977" alt="B2H1PBT3" src="https://github.com/user-attachments/assets/8d6b4df5-2e88-4798-a046-3581c74baab8" />

- **Hộp 2 (border-box):** chiều rộng thực tế = **300px** (đo từ DevTools)
  
- <img width="1911" height="973" alt="B2H2PBT3" src="https://github.com/user-attachments/assets/3a1b8bbe-b03c-479b-8a1d-0736631bc932" />

- **Giải thích sự khác biệt:**
     + Với `content-box`, `width` chỉ là chiều rộng của vùng nội dung. Trình duyệt sẽ cộng thêm padding và border vào làm cho hộp phình to ra (300 + 40 + 10 = 350px).
     + Với `border-box`, `width` quy định tổng chiều rộng của cả hộp. Trình duyệt sẽ tự động ép vùng nội dung nhỏ lại để nhường chỗ cho padding và border, giúp tổng kích thước hộp luôn giữ đúng 300px.
     + 
#### Phần 2
- **Sử dụng boder-box**
  
<img width="1912" height="977" alt="B2P2SD" src="https://github.com/user-attachments/assets/62be4bd2-fa46-4bb3-95c0-558812799d0f" />

- **Không sử dụng boder-box**
  
<img width="1918" height="980" alt="B2P2KSD" src="https://github.com/user-attachments/assets/ed170e48-a1a8-4369-8785-769e33c1eb1b" />

# Bài B3 - Cuộc chiến tính đặc thù

## 1. Liệt kê 10 quy tắc + điểm đặc hiệu (Từ thấp đến cao)
Điểm đặc hiệu được tính theo công thức `(Số ID, Số Class, Số Element)`:

1. `*` { color: gray; } ➔ **Specificity: 0, 0, 0**
2. `p` { color: brown; } ➔ **Specificity: 0, 0, 1**
3. `.text` { color: yellow; } ➔ **Specificity: 0, 1, 0**
4. `p.text` { color: green; } ➔ **Specificity: 0, 1, 1**
5. `.text.highlight` { color: pink; } ➔ **Specificity: 0, 2, 0**
6. `p.text.highlight` { color: purple; } ➔ **Specificity: 0, 2, 1**
7. `#demo` { color: orange; } ➔ **Specificity: 1, 0, 0**
8. `p#demo` { color: cyan; } ➔ **Specificity: 1, 0, 1**
9. `#demo.text` { color: blue; } ➔ **Specificity: 1, 1, 0**
10. `p#demo.text.highlight` { color: red; } ➔ **Specificity: 1, 2, 1**

## 2. Phần tử cuối cùng hiển thị màu gì? Tại sao?
* **Kết quả:** Phần tử sẽ hiển thị **màu đỏ (red)**.
* **Tại sao:** Trình duyệt sẽ tính điểm đặc hiệu cho tất cả các quy tắc áp dụng lên thẻ `<p>`. Quy tắc số 10 (`p#demo.text.highlight`) có tổng điểm đặc hiệu cao nhất là **(1, 2, 1)** (bao gồm 1 ID, 2 Class và 1 Thẻ). Do điểm đặc hiệu lớn nhất nên nó sẽ giành quyền ưu tiên tuyệt đối, ghi đè màu sắc của cả 9 quy tắc còn lại.

## 3. Ảnh chụp màn hình kết quả
<img width="1915" height="975" alt="B3PBT3" src="https://github.com/user-attachments/assets/f5c8aedb-787d-4e02-a351-f319667adb38" />

## 4. Thay đổi quy tắc thứ tự trong tệp CSS. Kết quả có thay đổi không? Giải thích.
* **Kết quả:** Màu sắc **KHÔNG thay đổi** (Vẫn là màu đỏ).
* **Giải thích:** Trong CSS, quyền ưu tiên được quyết định theo 2 yếu tố: Độ ưu tiên (Specificity) và Thứ tự sắp xếp (Order).
    - Thứ tự sắp xếp từ trên xuống dưới chỉ có tác dụng phân thắng bại **KHI VÀ CHỈ KHI** hai quy tắc có **điểm đặc thù bằng nhau** (quy tắc nào viết sau/bên dưới sẽ thắng).
    - Ở bài tập này, 10 quy tắc có 10 mức điểm đặc thù hoàn toàn chênh lệch nhau. Do đó, điểm đặc thù (Specificity) sẽ là yếu tố quyết định 100%. Dù quy tắc số 10 (`p#demo.text.highlight`) bị ném lên dòng đầu tiên của file CSS, nó vẫn có điểm (1, 2, 1) - cao nhất nên nó vẫn chiến thắng mọi quy tắc bên dưới.
 
#### PHẦN C — DEBUG & SUY LUẬN (20 điểm)
# Câu C1 - Gỡ lỗi bố cục CSS

**1. Tính chiều rộng thực tế của sidebar và content (theo content-box mặc định):**
Do trình duyệt sử dụng `box-sizing: content-box` theo mặc định, kích thước thực tế của thẻ sẽ bị cộng dồn phần padding và border vào chiều rộng (width) ban đầu:

* **Chiều rộng thực tế của `.sidebar`:**
  300px (width) + 20px (padding trái) + 20px (padding phải) + 1px (border trái) + 1px (border phải) = **342px**
* **Chiều rộng thực tế của `.content`:**
  660px (width) + 30px (padding trái) + 30px (padding phải) + 1px (border trái) + 1px (border phải) = **722px**

**2. Giải thích tại sao bố cục bị hỏng:**
* Tổng chiều rộng thực tế của cả 2 khối khi đặt cạnh nhau là: `342px + 722px = 1064px`.
* Tuy nhiên, thẻ bao bọc (container) bên ngoài chỉ có chiều rộng giới hạn là `960px`.
* Vì `1064px > 960px`, không đủ không gian để chứa cả 2 khối trên cùng một hàng ngang. Do đó, phần tử thứ hai (`.content`) bị tràn và bắt buộc phải rớt xuống dòng mới, làm hỏng bố cục.

**3. Đề xuất 2 cách chỉnh sửa:**
* **Cách 1 (Sử dụng `border-box`):** Thêm thuộc tính `box-sizing: border-box;` vào cả `.sidebar` và `.content`. Thuộc tính này sẽ ép trình duyệt tính toán lại không gian, tự động trừ hao phần padding và border vào bên trong lõi content. Khi đó, chiều rộng tổng của sidebar vẫn là đúng 300px, content là 660px. Tổng là 960px, vừa khít với container.
* **Cách 2 (Không dùng `border-box`, tính toán lại `width`):** Nếu bắt buộc giữ nguyên `content-box`, ta phải trừ bớt phần chiều rộng (`width`) ban đầu để chừa chỗ cho padding và border.
    * Sidebar mới: `width: 300px - 42px (padding+border) = 258px;`
    * Content mới: `width: 660px - 62px (padding+border) = 598px;`

# Câu C2 - Câu đố xếp tầng

**1. "Sản phẩm A" (h2)**
* **font-size = 20px**: Phần tử này chịu tác động trực tiếp bởi quy tắc `.card .title { font-size: 20px; }`. Theo quy tắc xếp tầng, thuộc tính được khai báo trực tiếp luôn có độ ưu tiên cao hơn thuộc tính kế thừa từ phần tử cha (`.container` hay `body`).
* **color = green**: Phần tử này bị tác động bởi 2 quy tắc màu: `#featured .title { color: red; }` (điểm đặc hiệu 1,1,0) và `.highlight { color: green !important; }` (điểm đặc hiệu 0,1,0). Dù bộ chọn chứa ID có điểm đặc hiệu cao hơn, nhưng từ khóa `!important` có sức mạnh phá vỡ mọi quy tắc thông thường, giúp màu `green` giành chiến thắng tuyệt đối.

**2. "Mô tả sản phẩm" (p trong #featured)**
* **color = blue**: Thẻ `<p>` này bị nhắm trúng bởi bộ chọn `.card p { color: inherit; }`. Giá trị `inherit` bắt buộc phần tử phải kế thừa chính xác màu từ phần tử cha trực tiếp. Phần tử cha của nó là `<div class="card" id="featured">` đang áp dụng quy tắc `.card { color: blue; }`. Vì vậy, thẻ `<p>` nhận màu `blue`.

**3. "Sản phẩm B" (h2)**
* **font-size = 20px**: Tương tự sản phẩm A, thẻ này có class `.title` và nằm bên trong thẻ có class `.card`, nên nhận thuộc tính từ `.card .title { font-size: 20px; }`.
* **color = blue**: Thẻ `<h2 class="title">` này KHÔNG bị tác động bởi bất kỳ quy tắc chỉ định màu sắc trực tiếp nào (vì nó không nằm trong `#featured` và cũng không có class `.highlight`). Do đó, nó sử dụng cơ chế kế thừa mặc định của CSS để lấy màu từ thẻ cha. Thẻ cha `.card` có `color: blue`, nên chữ "Sản phẩm B" có màu `blue`.

**4. "Mô tả sản phẩm B" (p.highlight)**
* **color = green**: Thẻ này chịu sự cạnh tranh giữa bộ chọn `.card p { color: inherit; }` và `.highlight { color: green !important; }`. Lại một lần nữa, quy tắc chứa `!important` ưu tiên cao nhất, lập tức ghi đè lệnh kế thừa (`inherit`) để hiển thị màu xanh lá (`green`).

**5. Ảnh chụp màn hình kết quả**
<img width="1915" height="972" alt="C2PBT3" src="https://github.com/user-attachments/assets/4c55898d-14bd-4bd0-b623-11765211c3e5" />
