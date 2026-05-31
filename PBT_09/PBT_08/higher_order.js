// 1. pipe() — Nối chuỗi functions
function pipe(...fns) {
    return function(initialValue) {
        return fns.reduce((acc, fn) => fn(acc), initialValue);
    };
}

const process = pipe(
    x => x * 2,        // 5 -> 10
    x => x + 10,       // 10 -> 20
    x => x.toString(), // 20 -> "20"
    x => "Kết quả: " + x
);
console.log(process(5)); // -> "Kết quả: 20"

// 2. memoize() — Cache kết quả
function memoize(fn) {
    const cache = {};
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache[key]) {
            return cache[key]; // Trả về kết quả đã lưu
        }
        const result = fn(...args);
        cache[key] = result;
        return result;
    };
}

const expensiveCalc = memoize((n) => {
    console.log("Đang tính...");
    let result = 0;
    for (let i = 0; i < n; i++) result += i;
    return result;
});
console.log(expensiveCalc(1000000)); // -> In "Đang tính..." -> 499999500000
console.log(expensiveCalc(1000000)); // -> Lấy từ cache, không in "Đang tính..." -> 499999500000

// 3. debounce() — Chờ user ngừng gõ mới thực hiện
function debounce(fn, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

const search = debounce((query) => {
    console.log("Searching:", query);
}, 500);

search("iP");
search("iPho");
search("iPhone 16"); // Chỉ có lần gọi này chạy sau 500ms

// 4. retry() — Thử lại nếu lỗi
async function retry(fn, maxAttempts = 3) {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await fn();
        } catch (error) {
            console.log(`Lần thử ${attempt} thất bại...`);
            if (attempt === maxAttempts) throw new Error("Đã hết số lần thử lại!");
        }
    }
}

// Giả lập hàm gọi API hay bị lỗi
let attempts = 0;
const fakeApiCall = async () => {
    attempts++;
    if (attempts < 3) throw new Error("Mạng lỗi");
    return "Lấy dữ liệu thành công!";
};

// Sẽ thử 3 lần và thành công ở lần 3
retry(fakeApiCall, 3)
    .then(res => console.log(res))
    .catch(err => console.error(err.message));