# PHẦN A — KIỂM TRA ĐỌC HIỂU (20 điểm)
## Câu A1 (10đ) — 5 Loại Positioning
 | Position | Chiếm chỗ?	| Tham chiếu vị trí	| Cuộn theo trang?	| Use case |
 | :--- | :----: | ---: |---: |---: |
 | static	| Có	| Luồng văn bản mặc định	| Có	| Bố cục mặc định của web. |
 | relative	| Có	| Vị trí gốc của chính nó	| Có	| Dịch chuyển nhẹ hoặc làm mốc cho con. |
 | absolute	| Không	| Tổ tiên gần nhất có position	| Có	| Badge, icon, menu con. |
 | fixed	| Không	| Viewport (Khung hình trình duyệt)	| Không	| Nút Chat, thanh thông báo khẩn cấp. |
 | sticky	| Có	| Viewport (khi đạt ngưỡng)	| Vừa có vừa không	| Sticky header, mục lục bên cạnh. |

 
**Câu hỏi thêm:**
- Khi nào absolute tham chiếu parent? Một phần tử absolute sẽ lấy phần tử cha (hoặc tổ tiên) làm mốc tọa độ khi phần tử đó có thuộc tính position được thiết lập là một trong các giá trị: relative, absolute, fixed, hoặc sticky.
- Khi nào absolute tham chiếu body? Nếu bạn đặt position: absolute cho một phần tử mà tất cả các cấp cha, ông, tổ tiên của nó đều là position: static (mặc định), thì nó sẽ tìm đến mốc cuối cùng là thẻ <body> (hoặc chính xác hơn là <html> - tài liệu gốc).
- Giải thích khái niệm "Nearest Positioned Ancestor"
  + Cụm từ này có nghĩa là "Tổ tiên gần nhất có thiết lập vị trí".
  + Ancestor (Tổ tiên): Bao gồm cha, ông, cố... những thẻ bao bọc lấy phần tử hiện tại.
  + Positioned (Đã thiết lập vị trí): Là bất kỳ phần tử nào có thuộc tính position khác với static.
  + Nearest (Gần nhất): Nếu cả cha và ông đều có position: relative, phần tử con absolute sẽ bám theo cha (vì cha gần nó hơn).

## Câu C2 (10đ) — Debug Flexbox
Trường hợp 1:
Dự đoán: 4 items nằm trên 1 hàng duy nhất. Vì .item có flex: 1, chúng sẽ tự động chia đều độ rộng của container (mỗi item chiếm 25%).

Sơ đồ:

Plaintext
┌───────────┬───────────┬───────────┬───────────┐
│  Item 1   │  Item 2   │  Item 3   │  Item 4   │
└───────────┴───────────┴───────────┴───────────┘
Trường hợp 2:
Dự đoán: Có tổng cộng 3 hàng, mỗi hàng 2 cột. Do width: 45% + margin: 2.5% * 2 (trái/phải) = 50% mỗi item. Nên 1 hàng chỉ chứa vừa khít 2 items. 6 items sẽ chia đều thành 3 hàng.

Sơ đồ:

Plaintext
┌───────────────┐ ┌───────────────┐
│    Item 1     │ │    Item 2     │
└───────────────┘ └───────────────┘
┌───────────────┐ ┌───────────────┐
│    Item 3     │ │    Item 4     │
└───────────────┘ └───────────────┘
┌───────────────┐ ┌───────────────┐
│    Item 5     │ │    Item 6     │
└───────────────┘ └───────────────┘
Trường hợp 3:
Dự đoán: 3 items nằm trên 1 hàng. Item 1 dính sát lề trái, Item 3 dính sát lề phải, Item 2 nằm chính giữa chính xác. Cả 3 căn giữa hoàn hảo theo chiều dọc.

Sơ đồ:

Plaintext
┌───────────────────────────────────────────────┐
│ ┌────────┐        ┌────────┐        ┌────────┐ │
│ │ Item 1 │        │ Item 2 │        │ Item 3 │ │
│ └────────┘        └────────┘        └────────┘ │
└───────────────────────────────────────────────┘
Trường hợp 4:
Dự đoán: 3 items nằm trên 1 hàng. Item 1 và 3 có độ rộng cố định 200px. Item 2 ở giữa co giãn linh hoạt chiếm trọn phần không gian còn lại (1fr). Giữa chúng có khoảng cách 20px.

Sơ đồ:

Plaintext
┌───────────┐      ┌─────────────────────┐      ┌───────────┐
│Item1(200p)│<-20->│    Item 2 (1fr)     │<-20->│Item3(200p)│
└───────────┘      └─────────────────────┘      └───────────┘
Trường hợp 5:
Dự đoán: Gồm 3 hàng. Hàng 1 (Item 1, 2, 3), Hàng 2 (Item 4, 5, 6), Hàng 3 chứa duy nhất Item 7 nằm ở cột đầu tiên bên trái, để trống 2 cột còn lại.

Sơ đồ:

Plaintext
┌───────────┬───────────┬───────────┐
│  Item 1   │  Item 2   │  Item 3   │
├───────────┼───────────┼───────────┤
│  Item 4   │  Item 5   │  Item 6   │
├───────────┼───────────┴───────────┘
│  Item 7   │ (Trống)     (Trống)
└───────────┘

# PHẦN C — SUY LUẬN (20 điểm)
## Câu C1 (10đ) — Flexbox vs Grid: Khi nào dùng gì?
**1. Navigation bar ngang (logo + menu + buttons)**
- Lựa chọn: Flexbox
- Giải thích: Thanh điều hướng (Navbar) là layout 1 chiều (chiều ngang). Các phần tử bên trong (Logo, Menu, Buttons) có kích thước nội dung không cố định và cần linh hoạt co giãn, dàn hàng trên một trục. Flexbox xử lý cực tốt việc căn giữa theo chiều dọc (align-items: center) và phân bổ khoảng cách giữa các khối (justify-content: space-between).

**2. Lưới ảnh Instagram (3 cột đều nhau, số ảnh không biết trước)**
- Lựa chọn: Grid
- Giải thích: Đây là layout 2 chiều (cần thẳng hàng cả theo hàng dọc lẫn hàng ngang). Với CSS Grid, bạn chỉ cần định nghĩa số cột cố định (grid-template-columns: repeat(3, 1fr)). Khi số lượng ảnh tăng lên và không biết trước, Grid sẽ tự động tạo thêm hàng mới và xếp các ảnh thẳng hàng tăm tắp mà không cần tính toán thủ công hay lo bị lệch hàng như Flexbox.

**3. Layout blog: main content + sidebar**
- Lựa chọn: Grid (Hoặc Kết hợp nếu bên trong có cấu trúc phức tạp)
- Giải thích: Đây là bộ khung lớn (Layout tổng thể) của trang web. Sử dụng CSS Grid (grid-template-columns: 1fr 300px hoặc dùng grid-template-areas) giúp bạn định hình rõ ràng ranh giới cấu trúc của trang. Grid giúp kiểm soát tỷ lệ cố định của sidebar và sự co giãn của main content một cách độc lập, giữ cho layout toàn trang luôn ổn định.

**4. Footer với 4 cột thông tin (Về chúng tôi, Liên kết, Hỗ trợ, Liên hệ)**
- Lựa chọn: Dùng Flexbox hay Grid đều được (Grid ưu việt hơn khi responsive)
- Giải thích:
 + Nếu dùng Flxbox: Phù hợp khi bạn muốn các cột tự co giãn theo độ dài của chữ bên trong (flex: 1).
 + Nếu dùng Grid: Phù hợp nhất vì chia cứng thành 4 cột bằng nhau (repeat(4, 1fr)). Khi thu nhỏ màn hình xuống mobile, Grid giúp bạn dễ dàng chuyển thành layout 2 cột hoặc 1 cột rất gọn gàng thông qua Media Query chỉ bằng một dòng code.

**5. Card sản phẩm (ảnh trên, text giữa, nút dưới — nút luôn dính đáy)**
- Lựa chọn: Flexbox (Hướng dọc - flex-direction: column)
- Giải thích: Nội dung bên trong một card sắp xếp theo 1 chiều (từ trên xuống dưới). Khi đặt card là display: flex; flex-direction: column;, bạn tận dụng được thuộc tính mạnh mẽ margin-top: auto cho nút "Mua" ở dưới cùng. Thuộc tính này sẽ tự động chiếm toàn bộ khoảng trống còn thừa ở giữa, đẩy nút dính chặt vào đáy card bất kể phần text ở giữa dài hay ngắn.

## Câu C2 (10đ) — Debug Flexbox
**Lỗi 1: Cards không đều chiều cao — nút "Mua" bị nhảy lên/xuống**
- Mô tả lỗi: Mặc định, các .card nằm trong .card-container (Flex container) sẽ có chiều cao bằng nhau nhờ thuộc tính align-items: stretch. Tuy nhiên, bản thân mỗi .card lại chưa phải là một Flex container. Khi tiêu đề (h3) hoặc đoạn mô tả của các card có độ dài ngắn khác nhau, phần nội dung của .card sẽ bị trồi sụt, kéo theo nút .btn bị đẩy lên hoặc hạ xuống tự do thay vì bám đều ở đáy.
- Code sửa: Biến .card thành một Flex container theo chiều dọc (column) và áp dụng margin-top: auto cho nút bấm.
```
.card-container { 
    display: flex; 
    flex-wrap: wrap; 
}
.card { 
    width: 30%; 
    margin: 1.5%; 
    /* SỬA TẠI ĐÂY: Biến card thành flex chiều dọc */
    display: flex;
    flex-direction: column;
}
.card img { width: 100%; }
.card h3 { font-size: 18px; }

.card .btn { 
    padding: 10px; 
    /* SỬA TẠI ĐÂY: Đẩy nút bấm luôn dính sát đáy card */
    margin-top: auto; 
}
```

**Lỗi 2: Items không căn giữa được trong container 100vh**
- Mô tả lỗi: Khi bạn khai báo display: flex; cho .hero, các phần tử con bên trong mới chỉ sẵn sàng để được căn chỉnh nhưng bạn chưa ra lệnh cho Flexbox căn chỉnh chúng như thế nào. Vì vậy, theo mặc định, phần tử con .hero-content vẫn sẽ nằm ở vị trí khởi đầu là góc trên cùng bên trái (flex-start).
- Code sửa: Bổ sung hai thuộc tính căn chỉnh chủ lực của Flexbox: justify-content (căn giữa theo chiều ngang) và align-items (căn giữa theo chiều dọc).
```
.hero {
    height: 100vh;
    display: flex;
    /* SỬA TẠI ĐÂY */
    justify-content: center; /* Căn giữa theo trục ngang */
    align-items: center;     /* Căn giữa theo trục dọc */
}
.hero-content {
    text-align: center;
}
```

**Lỗi 3: Sidebar bị co lại khi content quá dài**
- Mô tả lỗi: Trong Flexbox, mọi phần tử con (Flex items) mặc định đều có thuộc tính flex-shrink: 1. Điều này có nghĩa là khi tổng kích thước của .sidebar (250px) và .content vượt quá độ rộng của dòng .layout (do content quá dài), Flexbox sẽ tự động "bóp nghẹt" (co) cả .sidebar lại để ép toàn bộ nội dung hiển thị vừa trên một hàng, khiến sidebar không giữ được kích thước 250px ban đầu.
- Code sửa: Sử dụng thuộc tính flex-shrink: 0 trên .sidebar để ra lệnh cho Flexbox: "Tuyệt đối không được phép co kích thước của khối này trong mọi tình huống". Ngoài ra, nên chuyển sang dùng flex-basis hoặc viết tắt flex: 0 0 250px.
```
.layout { display: flex; }

.sidebar { 
    /* SỬA TẠI ĐÂY */
    width: 250px; 
    flex-shrink: 0; /* Ngăn không cho sidebar bị bóp nhỏ */
    
    /* Hoặc có thể viết ngắn gọn thay thế cho cả 2 dòng trên là: */
    /* flex: 0 0 250px; */ 
}
.content { flex: 1; }
```
