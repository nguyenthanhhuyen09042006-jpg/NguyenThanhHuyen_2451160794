PHẦN A — KIỂM TRA ĐỌC HIỂU
Câu A1 — Đồng bộ vs Bất đồng bộ
1. Kết quả đầu ra chính xác tại Console
Thứ tự các dòng log xuất hiện trên màn hình console khi thực thi đoạn mã là:

1 - Start

4 - End

3 - Promise

6 - Promise 2

2 - Timeout 0ms

7 - Nested timeout

5 - Timeout 100ms

2. Giải thích cơ chế Event Loop và các Hàng đợi (Queue)
Cơ chế vận hành bất đồng bộ của JavaScript (vốn là ngôn ngữ đơn luồng - Single Threaded) dựa trên sự phối hợp chặt chẽ giữa các thành phần sau:

Call Stack (Ngăn xếp tiếng gọi): Nơi chứa và thực thi các dòng mã đồng bộ (Synchronous). Mã nguồn chạy từ trên xuống dưới, hàm nào gọi trước thì đẩy vào stack trước, thực thi xong sẽ được lấy ra ngay lập tức.

Microtask Queue (Hàng đợi vi tác vụ): Chứa các callback có độ ưu tiên cao, cụ thể là các xử lý của Promise.then(), Promise.catch(), Promise.finally() hoặc từ khóa async/await.

Macrotask Queue (Hàng đợi vĩ tác vụ - hay Task Queue): Chứa các callback có độ ưu tiên thấp hơn, bao gồm các sự kiện hẹn giờ như setTimeout, setInterval, các sự kiện tương tác DOM (click, scroll), hoặc các tác vụ I/O mạng.

Luồng chạy chi tiết của đoạn mã (Trace Log):

Chạy mã đồng bộ: Trình duyệt thực thi câu lệnh đầu tiên console.log("1 - Start") nằm trên Call Stack → In ra 1 - Start.

Gặp Macrotask đầu tiên: Hàm setTimeout(..., 0) (in tác vụ 2) được gọi. Vì thời gian chờ là 0ms, bộ nền tảng (Web APIs) ngay lập tức đẩy callback của nó vào Macrotask Queue.

Gặp Microtask đầu tiên: Lệnh Promise.resolve().then(...) (in tác vụ 3) được gọi. Callback xử lý của nó lập tức được xếp vào Microtask Queue.

Chạy mã đồng bộ tiếp theo: Thực thi lệnh console.log("4 - End") trên Call Stack → In ra 4 - End.

Gặp Macrotask thứ hai: Hàm setTimeout(..., 100) (in tác vụ 5) được đăng ký. Bộ đếm Web APIs nhận lệnh và giữ lại để đợi đủ 100ms mới đẩy vào Macrotask Queue.

Gặp Microtask thứ hai: Lệnh Promise.resolve().then(...) (chứa tác vụ 6 và 7) được gọi. Toàn bộ khối callback này được đẩy vào cuối Microtask Queue.

Xử lý Microtask Queue (Giai đoạn ưu tiên): Một khi Call Stack đã trống hoàn toàn, định luật Event Loop bắt buộc phải quét sạch toàn bộ các tác vụ hiện có trong Microtask Queue trước khi thực hiện bất cứ hành động nào khác:

Lấy microtask thứ nhất ra chạy: Thực hiện in 3 - Promise.

Lấy microtask thứ hai ra chạy: Thực hiện in 6 - Promise 2. Tại đây, nó lại bắt gặp một lệnh setTimeout(..., 0) lồng bên trong. Callback in 7 - Nested timeout này lập tức được đẩy xuống cuối Macrotask Queue.

Xử lý Macrotask Queue: Khi Microtask Queue đã hoàn toàn trống, Event Loop lấy tác vụ đầu tiên trong Macrotask Queue ra thực thi:

Thực thi callback của setTimeout 0ms đầu tiên → In ra 2 - Timeout 0ms.

Event Loop kiểm tra lại Microtask (không có gì), tiếp tục lấy macrotask kế tiếp trong hàng đợi (chính là tác vụ lồng vừa nạp) → In ra 7 - Nested timeout.

Cuối cùng, sau khi đủ điều kiện thời gian 100ms, callback của setTimeout 100ms được đẩy vào hàng đợi và được thực thi sau cùng → In ra 5 - Timeout 100ms.

Câu A2 — Fetch API
Giải thích chi tiết ý nghĩa kỹ thuật của từng dòng lệnh trong hàm getData():

await fetch("https://api.example.com/data")

fetch() là một phương thức tích hợp sẵn của trình duyệt dùng để gửi các yêu cầu mạng (HTTP Request). Khi thực thi, nó ngay lập tức trả về một Promise. Khi Promise này hoàn thành (resolve), nó mang theo một đối tượng Response (chứa siêu dữ liệu như headers, status code, ok...).

Từ khóa await có nhiệm vụ tạm dừng quá trình thực thi của hàm async getData() tại dòng đó, chờ cho đến khi Promise của mạng được giải quyết xong, giúp mã xử lý trông tuần tự và dễ đọc như mã đồng bộ.

if (!response.ok)

Thuộc tính response.ok là một giá trị kiểu Boolean (true/false). Nó đóng vai trò là một cờ kiểm tra nhanh xem mã trạng thái HTTP (Status Code) trả về từ máy chủ có nằm trong dải thành công hay không (200 đến 299).

Giá trị này sẽ nhận là false khi máy chủ phản hồi các mã lỗi. 3 mã trạng thái tiêu biểu tương ứng khiến thuộc tính này nhận giá trị false là:

404 (Not Found) - Không tìm thấy tài nguyên / sai đường dẫn.

401 (Unauthorized) - Yêu cầu không hợp lệ do thiếu quyền truy cập / token định danh.

500 (Internal Server Error) - Lỗi phát sinh từ bên trong mã nguồn máy chủ.

const data = await response.json()

Khi nhận được phản hồi từ mạng, nội dung (body) của response lúc này mới chỉ là một luồng dữ liệu thô dạng chuỗi (ReadableStream). Phương thức .json() được gọi để đọc hết luồng dữ liệu này và phân tích cú pháp (parse) nó thành một đối tượng JavaScript thuần túy.

Vì việc đọc và ép kiểu dữ liệu từ luồng stream tiêu tốn thời gian I/O, bản thân .json() cũng trả về một Promise. Do đó, bắt buộc phải sử dụng từ khóa await lần thứ hai để đợi quá trình chuyển đổi này hoàn tất.

Khối lệnh try...catch bắt lỗi gì?

Khối catch (error) ở đây sẽ bắt được hai nhóm lỗi chính:

Lỗi mạng vật lý: Mất kết nối internet, sai địa chỉ miền (DNS lỗi), hoặc yêu cầu bị chặn bởi chính sách bảo mật trình duyệt (CORS Error). Trong các trường hợp này, Promise của fetch sẽ tự động chuyển sang trạng thái Rejected.

Lỗi do lập trình viên chủ động ném ra (throw): Khi mã trạng thái không thành công (!response.ok), dòng lệnh throw new Error(...) sẽ chủ động kích hoạt ngắt mạch của khối try và chuyển ngay lập tức quyền điều khiển xuống khối catch.

Lưu ý quan trọng: fetch() không tự động đẩy luồng xử lý xuống khối catch nếu máy chủ phản hồi lỗi 404 hay 500. Nó vẫn coi đó là một phiên kết nối thành công, đó là lý do ta bắt buộc phải tự kiểm tra bằng response.ok.

Câu A3 — Lời hứa (Promise)
1. Sơ đồ 3 trạng thái của Promise
Plaintext
               +-------------------+
               |      PENDING      |  <--- Trạng thái ban đầu
               |  (Đang chờ xử lý) |       (Chưa thành công, chưa thất bại)
               +-------------------+
                 /               \
                /                 \  Gọi hàm reject()
               / Gọi hàm resolve() \ hoặc phát sinh Exception
              v                     v
    +-------------------+    +-------------------+
    |     FULFILLED     |    |     REJECTED      |
    |   (Thành công)    |    |    (Thất bại)     |
    +-------------------+    +-------------------+
     (Kết quả trả về qua      (Lỗi trả về qua phương 
      phương thức .then)       thức .catch hoặc await)
2. Định nghĩa Callback Hell và giải pháp Tái cấu trúc (Refactor)
Callback Hell (hay còn gọi là Pyramid of Doom) là thuật ngữ chỉ hiện tượng mã nguồn có quá nhiều hàm callback lồng nhau theo nhiều tầng để xử lý một chuỗi các tác vụ bất đồng bộ phụ thuộc lẫn nhau. Cấu trúc mã lúc này bị phình to theo chiều ngang, tạo thành một hình phễu thụt lề sâu, gây ra hệ quả cực kỳ nghiêm trọng: mã nguồn trở nên rối rắm, cực kỳ khó đọc, khó bảo trì và việc quản lý, bắt lỗi (error handling) gần như là một cực hình.

Ví dụ mã nguồn 4 cấp độ Callback Hell (Mô phỏng chu trình đặt hàng):
JavaScript
// Hàm giả lập bất đồng bộ kiểu cũ nhận callback
function layGioHang(userId, callback) {
    setTimeout(() => {
        console.log("Cấp 1: Đã lấy thông tin giỏ hàng.");
        callback(null, { cartId: 45, items: ["Laptop", "Mouse"] });
    }, 800);
}

function kiemTraKhoHang(items, callback) {
    setTimeout(() => {
        console.log("Cấp 2: Đã kiểm tra kho (Còn hàng).");
        callback(null, true);
    }, 800);
}

function taoDonHang(cartId, callback) {
    setTimeout(() => {
        console.log("Cấp 3: Đã khởi tạo đơn hàng thành công.");
        callback(null, { orderId: 2026, totalAmount: 1500 });
    }, 800);
}

function thucHienThanhToan(orderId, callback) {
    setTimeout(() => {
        console.log("Cấp 4: Đã trừ tiền tài khoản thành công.");
        callback(null, { status: "PAID", transactionId: "TX999" });
    }, 800);
}

// Thực thi chuỗi tác vụ phụ thuộc - Gây ra Callback Hell
layGioHang(101, function(err1, cart) {
    if (!err1) {
        kiemTraKhoHang(cart.items, function(err2, ready) {
            if (!err2 && ready) {
                taoDonHang(cart.cartId, function(err3, order) {
                    if (!err3) {
                        thucHienThanhToan(order.orderId, function(err4, payment) {
                            if (!err4) {
                                console.log("Hoàn tất chu trình đặt hàng:", payment);
                            }
                        });
                    }
                });
            }
        });
    }
});
Chuyển đổi (Refactor) mã nguồn sạch đẹp bằng Async/Await:
JavaScript
// Bước 1: Promisify - Chuyển đổi các hàm nhận callback sang trả về Promise
const layGioHangPromise = (userId) => new Promise(res => setTimeout(() => res({ cartId: 45, items: ["Laptop"] }), 500));
const kiemTraKhoPromise = (items) => new Promise(res => setTimeout(() => res(true), 500));
const taoDonHangPromise = (cartId) => new Promise(res => setTimeout(() => res({ orderId: 2026 }), 500));
const thanhToanPromise = (orderId) => new Promise(res => setTimeout(() => res({ status: "PAID" }), 500));

// Bước 2: Viết hàm quản lý chu trình phẳng, tuyến tính bằng Async/Await
async function quyTrinhDatHangChuan(userId) {
    try {
        const cart = await layGioHangPromise(userId);
        
        const isReady = await kiemTraKhoPromise(cart.items);
        if (!isReady) throw new Error("Sản phẩm trong kho đã hết!");
        
        const order = await taoDonHangPromise(cart.cartId);
        const payment = await thanhToanPromise(order.orderId);
        
        console.log("Hoàn tất chu trình đặt hàng an toàn:", payment);
    } catch (error) {
        console.error("Xử lý lỗi tập trung tại đây:", error.message);
    }
}

// Chạy quy trình
quyTrinhDatHangChuan(101);
PHẦN C — PHÂN TÍCH
Câu C1 — Chiến lược xử lý lỗi nâng cao trong Thương mại điện tử
Trong một ứng dụng Thương mại điện tử thực tế, việc tương tác với các API bên thứ ba (như cổng thanh toán, đơn vị vận chuyển, quản lý kho) đòi hỏi các kịch bản xử lý lỗi nghiêm ngặt:

Lỗi mạng vật lý (Network Disconnection): Hiện tượng mất mạng đột ngột của client hoặc chập chờn băng thông. Chiến lược xử lý là hiển thị ngay thông báo trên thanh trạng thái (Offline Banner), vô hiệu hóa (disable) tạm thời các nút bấm thanh toán để tránh trùng lặp giao dịch và kích hoạt cơ chế tự động thử lại (Retry) sau các khoảng thời gian trễ ngắn.

Xử lý mã trạng thái lỗi API chuyên biệt từ máy chủ:

Lỗi 500 (Internal Server Error): Hệ thống máy chủ gặp sự cố cục bộ. Cần ghi nhận log, hiển thị thông báo lỗi hệ thống thân thiện và gợi ý người dùng thực hiện lại sau ít phút, hoặc tự động chuyển hướng sang máy chủ dự phòng.

Lỗi 404 (Not Found): Người dùng truy cập mã sản phẩm đã bị xóa hoặc sai đường dẫn. Ứng dụng cần chặn ngay tiến trình và render giao diện lỗi "Sản phẩm không tồn tại hoặc đã ngừng kinh doanh" kèm danh sách sản phẩm gợi ý tương đương.

Lỗi 429 (Too Many Requests): Người dùng hoặc công cụ tự động đang spam request quá tần suất cho phép. Hệ thống phía máy khách phải khóa chặt nút hành động, hiển thị đồng hồ đếm ngược thông báo rõ: "Bạn đang thao tác quá nhanh, vui lòng đợi X giây trước khi thử lại".

Hiện thực hóa mã nguồn tích hợp Timeout và Logic Tự động thử lại (Retry):
JavaScript
/**
 * Ứng dụng cơ chế AbortController để tự động ngắt kết nối nếu API phản hồi quá chậm
 * @param {string} url - Đường dẫn API cần gọi
 * @param {number} ms - Thời gian giới hạn tối đa tính bằng mili-giây
 */
async function fetchWithTimeout(url, ms = 10000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), ms);

    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId); // Xóa bộ đếm nếu phản hồi về kịp lúc
        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        if (error.name === 'AbortError') {
            throw new Error(`Yêu cầu bị hệ thống hủy bỏ do vượt quá thời gian chờ (Timeout) ${ms}ms`);
        }
        throw error;
    }
}

/**
 * Xây dựng hàm tự động gọi lại API nhiều lần nếu gặp lỗi mạng vật lý trước khi chịu thua
 * @param {string} url - Đường dẫn API
 * @param {number} maxRetries - Số lần thử lại tối đa
 * @param {number} timeoutMs - Giới hạn thời gian của mỗi lần gọi
 */
async function fetchWithRetry(url, maxRetries = 3, timeoutMs = 5000) {
    let lastError;
    
    for (let currentAttempt = 1; currentAttempt <= maxRetries; currentAttempt++) {
        try {
            console.warn(`Đang thực hiện cuộc gọi API. Lần thử: ${currentAttempt}/${maxRetries}`);
            const response = await fetchWithTimeout(url, timeoutMs);
            
            if (!response.ok) {
                throw new Error(`Máy chủ báo lỗi HTTP mã: ${response.status}`);
            }
            
            return await response.json(); // Trả về dữ liệu đối tượng hoàn chỉnh nếu thành công
        } catch (error) {
            lastError = error;
            console.error(`Thất bại tại lần thử ${currentAttempt}. Chi tiết: ${error.message}`);
            
            // Nếu chưa chạm ngưỡng giới hạn lần thử, cho luồng chạy ngủ 1.5 giây trước khi sang chu kỳ mới
            if (currentAttempt < maxRetries) {
                const thờiGianChờ = 1500;
                await new Promise(resolve => setTimeout(resolve, thờiGianChờ));
            }
        }
    }
    
    // Nếu vượt qua vòng lặp mà không return được tức là tất cả các lần thử đều thất bại
    throw new Error(`Kết nối thất bại hoàn toàn sau ${maxRetries} lần thử lại. Nguyên nhân cuối: ${lastError.message}`);
}
Câu C2 — Sống còn và So sánh: Promise.all vs Promise.allSettled vs Promise.race vs Promise.any
1. Bảng phân tích chi tiết bản chất kỹ thuật
Phương thức	Khi nào giải quyết (Resolve)?	Khi nào từ chối (Reject)?	Trường hợp sử dụng thực tế trong dự án
Promise.all()	Khi tất cả các Promise thành phần đều thành công (fulfilled). Trả về mảng kết quả theo đúng thứ tự nạp vào.	Chỉ cần ít nhất một Promise thành phần thất bại (rejected). Ngay lập tức hủy bỏ và báo lỗi.	Đồng bộ dữ liệu khởi tạo bắt buộc cho trang Web (Ví dụ: Phải load đồng thời cả thông tin phân quyền User + Menu hệ thống + Cấu hình giao diện thì mới cho phép render ứng dụng).
Promise.allSettled()	Khi tất cả các Promise thành phần đều kết thúc (bất kể thành công hay thất bại). Luôn thành công, trả về mảng object mô tả trạng thái từng cái.	Không bao giờ rơi vào trạng thái bị từ chối (rejected).	Xây dựng Bảng điều khiển đa Widget (Dashboard). Mỗi ô hiển thị một luồng dữ liệu độc lập (Thời tiết, Tin tức, Tỷ giá). Một ô API lỗi không được phép làm chết hay trắng toàn bộ màn hình.
Promise.race()	Khi có một Promise bất kỳ trong danh sách kết thúc sớm nhất (cho dù kết quả đó là thành công hay thất bại).	Khi Promise chạy nhanh nhất trong danh sách bị lỗi (rejected).	Gắn cổng bảo vệ thời gian (Timeout Guard). Cho một tác vụ tải file nặng đua tốc độ với một hàm trì hoãn báo lỗi quá 10 giây. Nếu hàm báo lỗi chạy trước, kết luận tải file thất bại.
Promise.any()	Khi tìm thấy một Promise đầu tiên trong danh sách đạt trạng thái thành công (fulfilled).	Khi tất cả mọi Promise thành phần trong danh sách đều đồng loạt thất bại. Trả về một AggregateError.	Hệ thống máy chủ dự phòng hoặc CDN tải ảnh. Gửi yêu cầu lấy dữ liệu đồng thời tới Server chính và 2 Server phụ (Backup). Chỉ cần một nơi phản hồi về thành công trước là lấy luôn dữ liệu đó.
2. Ví dụ mã nguồn kịch bản thực tế phức tạp
JavaScript
// Khởi tạo các hàm giả lập gọi API thực tế từ các Server khác nhau
const fetchMainServerData = () => new Promise((res) => setTimeout(() => res("Dữ liệu cốt lõi từ Server Chính"), 200));
const fetchBackupServerData = () => new Promise((res) => setTimeout(() => res("Dữ liệu từ Server Dự Phòng 1"), 400));
const fetchDeadServer = () => new Promise((_, rej) => setTimeout(() => rej(new Error("Lỗi mất kết nối vật lý")), 100));
const delayTimeoutError = (ms) => new Promise((_, rej) => setTimeout(() => rej(new Error("Quá hạn thời gian phản hồi cho phép")), ms));

/**
 * Kịch bản 1: Sử dụng Promise.race để làm chốt chặn Timeout cho API tải tài nguyên
 */
async function taiTaiNguyenKemChotChanTimeout() {
    try {
        // Đua tốc độ giữa Server chính (mất 200ms) và Chốt chặn bảo vệ cấu hình ở mức 150ms
        // Kết quả dự kiến: Sẽ dính lỗi timeout vì hàm delayTimeoutError về đích trước 50ms
        const ketQuaDua = await Promise.race([
            fetchMainServerData(),
            delayTimeoutError(150) 
        ]);
        console.log("Race Result (Thành công):", ketQuaDua);
    } catch (error) {
        console.error("Race Result (Thất bại): Thao tác bị hủy bỏ vì:", error.message);
    }
}

/**
 * Kịch bản 2: Sử dụng Promise.any để truy xuất dữ liệu từ cụm Server nhân bản (Clustering)
 */
async function layDuLieuTuServerNhanBanNhanhNhat() {
    try {
        // fetchDeadServer bị hỏng ở 100ms, nhưng Any không bỏ cuộc mà đợi fetchMainServerData thành công ở 200ms
        // Kết quả: Lấy được dữ liệu của Server chính thành công mà không bị crash
        const ketQuaThanhCongDauTien = await Promise.any([
            fetchDeadServer(),
            fetchMainServerData(),
            fetchBackupServerData()
        ]);
        console.log("Any Result (Lấy được server sống nhanh nhất):", ketQuaThanhCongDauTien);
    } catch (error) {
        console.error("Toàn bộ các máy chủ trong mạng lưới đều đã sập!", error.errors);
    }
}
