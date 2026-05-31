function calculate(num1, operator, num2) {
    const n1 = Number(num1), n2 = Number(num2);
    if (isNaN(n1) || isNaN(n2)) return "Lỗi: Input không phải số";
    switch (operator) {
        case "+": return n1 + n2;
        case "-": return n1 - n2;
        case "*": return n1 * n2;
        case "/": return n2 === 0 ? "Lỗi: Chia cho 0" : n1 / n2;
        case "%": return n1 % n2;
        case "**": return n1 ** n2;
        default: return `Lỗi: Operator '${operator}' không hợp lệ`;
    }
}
console.log(calculate(10, "+", 5));