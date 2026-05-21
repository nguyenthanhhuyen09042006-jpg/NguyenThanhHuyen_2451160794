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
