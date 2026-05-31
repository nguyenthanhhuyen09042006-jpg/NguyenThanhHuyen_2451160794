const target = Math.floor(Math.random() * 100) + 1;
let attempts = 0, history = [];
while (attempts < 7) {
    let input = prompt(`Đoán số (1-100). Còn ${7 - attempts} lượt:`);
    if (!input) break;
    let guess = Number(input);
    if (isNaN(guess) || guess < 1 || guess > 100) { alert("Nhập số 1-100!"); continue; }
    if (history.includes(guess)) { alert("Số này đoán rồi!"); continue; }
    
    history.push(guess); attempts++;
    if (guess === target) { alert(`Thắng rồi! Đáp án là ${target}`); break; }
    alert(guess > target ? "Cao quá!" : "Thấp quá!");
    if (attempts === 7) alert(`Thua! Đáp án là ${target}`);
}