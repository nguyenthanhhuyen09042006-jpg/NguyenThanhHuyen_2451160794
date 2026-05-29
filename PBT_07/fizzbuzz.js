function customFizzBuzz(n, rules) {
    let result = "";
    for (let i = 0; i < rules.length; i++) {
        if (n % rules[i].divisor === 0) {
            result += rules[i].word;
        }
    }
    return result === "" ? n : result;
}

// Test
const rules = [
    { divisor: 3, word: "Fizz" },
    { divisor: 5, word: "Buzz" },
    { divisor: 7, word: "Jazz" }
];

console.log(`21 = ${customFizzBuzz(21, rules)}`);
console.log(`15 = ${customFizzBuzz(15, rules)}`);
console.log(`35 = ${customFizzBuzz(35, rules)}`);
console.log(`105 = ${customFizzBuzz(105, rules)}`);