## PHẦN A — KIỂM TRA ĐỌC HIỂU (20 điểm)

### Câu A1 (5đ) — Function Declaration vs Expression vs Arrow

**1. Function Declaration**
```javascript
function tinhThueBaoHiem(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return { thue: thue, thuc_nhan: luong - thue }; 
}
```

**2. Function Expression**
```javascript
const tinhThueBaoHiemExp = function(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return { thue, thuc_nhan: luong - thue };
};
```

**3. Arrow Function**
```javascript
const tinhThueBaoHiemArrow = (luong) => {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return { thue, thuc_nhan: luong - thue };
};
```

**Giải thích sự khác nhau về Hoisting:**
* **Function Declaration:** Được "hoisted" (đưa lên đầu scope) toàn bộ phần khai báo và nội dung hàm. Bạn có thể gọi hàm trước khi viết code khai báo nó.
* **Function Expression & Arrow Function (dùng `let`/`const`):** Khai báo biến được hoisted nhưng bị đưa vào "Temporal Dead Zone" (Vùng chết tạm thời), không được khởi tạo giá trị ban đầu là function. Nếu gọi hàm trước dòng khai báo sẽ báo lỗi `ReferenceError`.

**Ví dụ code chứng minh:**
```javascript
// Function Declaration - Chạy bình thường
console.log(funcDec(15000000)); 
function funcDec(luong) { return luong; }

// Arrow Function - Lỗi ReferenceError: Cannot access 'funcArrow' before initialization
console.log(funcArrow(15000000)); 
const funcArrow = (luong) => luong;
```

---

### Câu A2 (5đ) — Scope & Closure

**Dự đoán output Đoạn 1:**
```javascript
console.log(c.increment());  // 1
console.log(c.increment());  // 2
console.log(c.increment());  // 3
console.log(c.decrement());  // 2
console.log(c.getCount());   // 2
```

**Dự đoán output Đoạn 2 (Sau 200ms):**
```text
var: 3
var: 3
var: 3
let: 0
let: 1
let: 2
```

**Giải thích chi tiết:**
* **`var` có scope là Function Scope (hoặc Global):** Trong vòng lặp đầu, chỉ có một biến `i` duy nhất được dùng chung. Khi `setTimeout` hết thời gian chờ và chạy, vòng lặp đã kết thúc từ lâu và `i` đã tăng lên 3. Callback in ra giá trị 3 ba lần.
* **`let` có scope là Block Scope:** Trong vòng lặp thứ hai, mỗi lần lặp tạo ra một biến `j` hoàn toàn mới và độc lập. Mỗi callback của `setTimeout` ghi nhớ (closure) biến `j` riêng biệt mang giá trị 0, 1, 2 tương ứng tại thời điểm nó được tạo ra.

---

### Câu A3 (5đ) — Array Methods

```javascript
// 1. Lấy các số chẵn
const evens = nums.filter(n => n % 2 === 0);

// 2. Nhân mỗi số với 3
const multiplied = nums.map(n => n * 3);

// 3. Tính tổng tất cả
const sum = nums.reduce((acc, curr) => acc + curr, 0);

// 4. Tìm số đầu tiên > 7
const firstOver7 = nums.find(n => n > 7);

// 5. Kiểm tra CÓ số > 10 không
const hasOver10 = nums.some(n => n > 10);

// 6. Kiểm tra TẤT CẢ đều > 0
const allPositive = nums.every(n => n > 0);

// 7. Tạo mảng "Số X là [chẵn/lẻ]"
const strArray = nums.map(n => `Số ${n} là ${n % 2 === 0 ? "chẵn" : "lẻ"}`);

// 8. Đảo ngược mảng (không mutate gốc)
const reversed = [...nums].reverse(); 
```

---

### Câu A4 (5đ) — Object Destructuring & Spread

**Dự đoán output:**
```javascript
// Destructuring
console.log(name, price, ram, color);  // "iPhone 16" 25990000 8 "Titan"
console.log(specs);                    // ReferenceError: specs is not defined

// Spread
console.log(updated.price);            // 23990000
console.log(updated.sale);             // true
console.log(product.price);            // 25990000 (Giá trị gốc không đổi)

// Spread gotcha
console.log(product.specs.ram);        // 16 
// Tại sao: Spread operator ({...product}) chỉ thực hiện Shallow Copy (Sao chép nông). 
// Các thuộc tính primitive (name, price) được copy giá trị, nhưng object lồng nhau ('specs') chỉ được copy "địa chỉ tham chiếu". 
// Do đó copy.specs và product.specs trỏ về cùng một vùng nhớ. Đổi một bên thì bên kia cũng đổi theo.
```

---

## PHẦN C — SUY LUẬN (20 điểm)

### Câu C1 (10đ) — Refactor Code

**Code sau khi Refactor:**
```javascript
const processOrders = (orders) => orders
    .filter(({ status, total }) => status === "completed" && total > 100000)
    .map(({ id, customer, total }) => ({
        id, 
        customer, 
        total,
        discount: total * 0.1,
        finalTotal: total * 0.9
    }))
    .sort((a, b) => b.finalTotal - a.finalTotal);
```

### Câu C2 (10đ) — Thiết kế API (miniArray)

**Triển khai các hàm:**
```javascript
const miniArray = {
    map(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            result.push(fn(arr[i], i, arr));
        }
        return result;
    },
    
    filter(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            if (fn(arr[i], i, arr)) {
                result.push(arr[i]);
            }
        }
        return result;
    },
    
    reduce(arr, fn, initialValue) {
        let hasInitialValue = initialValue !== undefined;
        let accumulator = hasInitialValue ? initialValue : arr[0];
        let startIndex = hasInitialValue ? 0 : 1;

        for (let i = startIndex; i < arr.length; i++) {
            accumulator = fn(accumulator, arr[i], i, arr);
        }
        return accumulator;
    }
};
```
