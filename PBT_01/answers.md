1. 5 bước xảy ra khi nhập URL https://shopee.vn và nhấn Enter:

Bước 1 - Tra cứu DNS (DNS Lookup): Trình duyệt hỏi máy chủ DNS để dịch tên miền shopee.vn thành địa chỉ IP thực của máy chủ chứa trang web.

Bước 2 - Thiết lập kết nối (TCP/IP & TLS/SSL): Trình duyệt tạo kết nối TCP với máy chủ đó. Vì là https, nó sẽ thực hiện thêm bước "bắt tay" (handshake) TLS/SSL để mã hóa dữ liệu bảo mật.

Bước 3 - Gửi yêu cầu HTTP (HTTP Request): Trình duyệt gửi một yêu cầu (GET request) tới máy chủ để xin file HTML chính của trang web.

Bước 4 - Nhận phản hồi HTTP (HTTP Response): Máy chủ xử lý yêu cầu và gửi trả lại nội dung file HTML kèm theo mã trạng thái (ví dụ: 200 OK).

Bước 5 - Phân tích và Kết xuất (Parse & Render): Trình duyệt đọc file HTML, gặp thẻ <link> hoặc <img> thì sẽ tiếp tục gửi các yêu cầu phụ để tải CSS, JS, Hình ảnh. Cuối cùng, trình duyệt kết xuất (render) tất cả thành giao diện bạn nhìn thấy trên màn hình.



