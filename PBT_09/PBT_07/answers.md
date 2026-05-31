## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 — Phân biệt `var`, `let`, và `const`

* **Đoạn 1 (Sử dụng `var`):**
    * **Kết quả:** In ra `undefined`.
    * **Giải thích:** JavaScript có cơ chế **Hoisting**. Khi dùng `var`, phần khai báo (`var x;`) được ngầm kéo lên đầu phạm vi, nhưng phần gán giá trị (`= 5`) thì giữ nguyên tại chỗ. Do đó, dòng `console.log(x)` chạy khi biến `x` đã tồn tại nhưng chưa có giá trị, dẫn đến `undefined`.

* **Đoạn 2 (Sử dụng `let`):**
    * **Kết quả:** Báo lỗi `ReferenceError: Cannot access 'y' before initialization`.
    * **Giải thích:** Mặc dù `let` cũng được hoisting, nhưng nó bị đưa vào một vùng gọi là **Temporal Dead Zone (TDZ)** - Vùng chết tạm thời. Bạn tuyệt đối không thể truy cập biến `let` trước dòng lệnh khởi tạo nó.

* **Đoạn 3 (Sử dụng `const` với giá trị nguyên thủy):**
    * **Kết quả:** Báo lỗi `TypeError: Assignment to constant variable`.
    * **Giải thích:** Đặc điểm của `const` (Hằng số) là bắt buộc phải gán giá trị ngay lúc khai báo, và **không được phép gán lại** một giá trị mới (re-assign) cho nó.

* **Đoạn 4 (Sử dụng `const` với mảng/object):**
    * **Kết quả:** In ra `[1, 2, 3, 4]`.
    * **Giải thích:** Đối với kiểu dữ liệu tham chiếu (Array, Object), `const` chỉ cấm gán lại một vùng nhớ mới. Tuy nhiên, ta hoàn toàn có quyền thay đổi, thêm bớt dữ liệu (mutate) *bên trong* mảng hoặc đối tượng đó.

* **Đoạn 5 (Phạm vi khối - Block Scope):**
    * **Kết quả:** In ra `Trong block: 2` trước, sau đó in `Ngoài block: 1`.
    * **Giải thích:** `let` và `const` tuân thủ quy tắc **Block Scope** (giới hạn trong cặp ngoặc nhọn `{}`). Biến `a` bên trong `{}` là một biến hoàn toàn mới, được cấp phát bộ nhớ riêng và chỉ sống trong ngoặc nhọn đó.

---

### Câu A2 — Các kiểu dữ liệu và ép kiểu ngầm định

**Dự đoán kết quả:**
* `typeof null` -> `"object"`
* `typeof undefined` -> `"undefined"`
* `typeof NaN` -> `"number"`
* `"5" + 3` -> `"53"`
* `"5" - 3` -> `2`
* `"5" * "3"` -> `15`
* `true + true` -> `2`
* `[] + []` -> `""`
* `[] + {}` -> `"[object Object]"`
* `{} + []` -> `0` (hoặc `"[object Object]"`)

**Giải thích sự khác biệt giữa `"5" + 3` và `"5" - 3`:**
* Toán tử `+` ưu tiên nối chuỗi. Khi một trong hai toán hạng là chuỗi (`"5"`), JS sẽ tự động ép kiểu toán hạng còn lại (`3`) thành chuỗi và **nối** chúng lại thành `"53"`.
* Toán tử `-` chỉ có ý nghĩa toán học. Do đó, JS sẽ cố gắng ép chuỗi `"5"` thành số nguyên `5`, sau đó thực hiện phép tính `5 - 3 = 2`.

---

### Câu A3 — So sánh `==` và `===`

**Dự đoán kết quả:**
* `5 == "5"` -> `true`
* `5 === "5"` -> `false`
* `null == undefined` -> `true`
* `null === undefined` -> `false`
* `NaN == NaN` -> `false`
* `0 == false` -> `true`
* `0 === false` -> `false`
* `"" == false` -> `true`

**Quy tắc:** Bắt buộc sử dụng `===` (Strict Equality) trong mọi trường hợp từ nay về sau.
* **Lý do:** `===` so sánh nghiêm ngặt cả **Kiểu dữ liệu** và **Giá trị**. `==` tự động ép kiểu hai bên cho giống nhau rồi mới so sánh (Type Coercion), dễ gây ra kết quả sai lệch và sinh bug.

---

### Câu A4 — Giá trị Thật (Truthy) & Giả (Falsy)

**8 giá trị Falsy:** `false`, `0`, `-0`, `0n`, `""` (chuỗi rỗng), `null`, `undefined`, `NaN`.

**Kết quả:**
* `if ("0")` -> **IN (A)**. ("0" là chuỗi khác rỗng -> Truthy)
* `if ("")` -> Không in (B).
* `if ([])` -> **IN (C)**. (Mảng/Object luôn là Truthy)
* `if ({})` -> **IN (D)**.
* `if (null)` -> Không in (E).
* `if (0)` -> Không in (F).
* `if (-1)` -> **IN (G)**. (-1 khác 0 -> Truthy)
* `if (" ")` -> **IN (H)**. (Chuỗi chứa space -> Truthy)

---

### Câu A5 — Template Literals

* Cách 1:
    - `var greeting = "Xin chào " + name + "! Bạn " + age + " tuổi.";` => `var greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;`

* Cách 2:
    - `var url = "https://api.example.com/users/" + userId + "/orders?page=" + page;` => `var url = `https://api.example.com/users/${userId}/orders?page=${page}`;`

* Cách 3:
```js
var html = "<div class=\"card\">" +
    "<h2>" + title + "</h2>" +
    "<p>" + description + "</p>" +
    "<span>Giá: " + price + "đ</span>" +
    "</div>";
```
- Viết lại:
```js
var html = `
    <div class="card">
        <h2>${title}</h2>
        <p>${description}</p>
        <span>Giá: ${price}đ</span>
    </div>
    `;
```
## PHẦN C - SUY LUẬN (20 điểm)
### Câu C1 (10 điểm) - Gỡ lỗi Javascript
- **Code bị lỗi**
```js
function tinhGiaGiamGia(giaBan, phanTramGiam) {
    if (phanTramGiam < 0 || phanTramGiam > 100) {
        return "Phần trăm giảm không hợp lệ"
    }
    
    var giamGia = giaBan * phanTramGiam / 100
    let giaSauGiam = giaBan - giamGia
    
    if (giaSauGiam = 0) {
        console.log("Sản phẩm miễn phí!")
    }
    
    return giaSauGiam
}
// Test
const gia = tinhGiaGiamGia("100000", 20)
console.log("Giá sau giảm: " + gia + "đ")

const gia2 = tinhGiaGiamGia(50000, 110)
console.log("Giá: " + gia2)

for (var i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log("Item " + i)
    }, 1000)
}
```
- Lỗi 1: Dòng `const gia = tinhGiaGiamGia("100000", 20)` -> lỗi kiểu dữ liệu khi truyền tham số là chuỗi -> Chuyển đổi tham số ngay đầu hoặc gọi hàm đúng kiểu
- Lỗi 2: Dòng `if (giaSauGiam = 0)` -> dùng toán tử gán thay vì so sánh -> Dùng `===` để so sánh giá trị và kiểu
- Lỗi 3: Xử lý không nhất quán khi `phanTramGiam` không hợp lệ -> trả về chuỗi trong khi kỳ vọng `console.log("Giá: " + gia2)` là số -> Đưa ra lỗi
- Lỗi 4: Dòng `for (var i = 0; i < 5; i++)` -> biến i được khai báo với `var` có phạm vi hàm không bị giới hạn trong khối lệnh `for` nên tất cả `setTimeout` dùng chung một biến i, khi chạy xong vòng lặp thì `i = 5` nên in ra toàn 5 -> dùng let i để mỗi vòng lặp có biến riêng.
- **Code sau khi sửa**
```js
function tinhGiaGiamGia(giaBan, phanTramGiam) {
    // Sửa lỗi 1: ép kiểu và kiểm tra
    giaBan = Number(giaBan);
    if (isNaN(giaBan)) throw new Error("Giá bán không hợp lệ");

    // Sửa lỗi 3: Đưa ra lỗi thay vì trả về chuỗi
    if (phanTramGiam < 0 || phanTramGiam > 100) {
        throw new Error("Phần trăm giảm không hợp lệ");
    }

    const giamGia = giaBan * phanTramGiam / 100;
    const giaSauGiam = giaBan - giamGia;

    // Sửa lỗi 2
    if (giaSauGiam === 0) {
        console.log("Sản phẩm miễn phí!");
    }
    
    return giaSauGiam;
}

// Test
try {
    const gia = tinhGiaGiamGia("100000", 20);  
    console.log("Giá sau giảm: " + gia + "đ");
} catch (e) {
    console.log(e.message);
}

try {
    const gia2 = tinhGiaGiamGia(50000, 110);
    console.log("Giá: " + gia2);
} catch (e) {
    console.log(e.message);
}

// Sửa lỗi 4: dùng let
for (let i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log("Item " + i);
    }, 1000);
}
```
