const form = document.getElementById("regForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passInput = document.getElementById("password");
const confirmInput = document.getElementById("confirmPass");
const phoneInput = document.getElementById("phone");
const submitBtn = document.getElementById("submitBtn");

// Trạng thái các trường (True = Hợp lệ)
let isValid = { name: false, email: false, pass: false, confirm: false, phone: false };

function checkFormValidity() {
    submitBtn.disabled = !(isValid.name && isValid.email && isValid.pass && isValid.confirm && isValid.phone);
}

// 1. Tên (2-50 ký tự)
nameInput.addEventListener("input", (e) => {
    const val = e.target.value.trim();
    isValid.name = val.length >= 2 && val.length <= 50;
    e.target.nextElementSibling.textContent = isValid.name ? "✅" : "❌";
    checkFormValidity();
});

// 2. Email (Regex)
emailInput.addEventListener("input", (e) => {
    const val = e.target.value;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    isValid.email = regex.test(val);
    document.getElementById("emailErr").textContent = isValid.email ? "" : "Email không hợp lệ!";
    checkFormValidity();
});

// 3. Password Strength
passInput.addEventListener("input", (e) => {
    const val = e.target.value;
    const bar = document.getElementById("strengthBar");
    const text = document.getElementById("strengthText");
    
    let strength = 0;
    if (val.length >= 8) strength++;
    if (val.match(/[a-z]/) && val.match(/[0-9]/)) strength++;
    if (val.match(/[A-Z]/) && val.match(/[\W_]/)) strength++;

    bar.className = "";
    if (strength === 0) { bar.style.width = "0"; text.textContent = ""; isValid.pass = false; }
    if (strength === 1) { bar.classList.add("weak"); text.textContent = "Yếu"; text.style.color="red"; isValid.pass = false; }
    if (strength === 2) { bar.classList.add("medium"); text.textContent = "Trung bình"; text.style.color="orange"; isValid.pass = true; }
    if (strength === 3) { bar.classList.add("strong"); text.textContent = "Mạnh"; text.style.color="green"; isValid.pass = true; }
    
    // Gõ lại pass thì tự check lại confirm pass
    confirmInput.dispatchEvent(new Event('input'));
    checkFormValidity();
});

// 4. Confirm Password
confirmInput.addEventListener("input", (e) => {
    isValid.confirm = (e.target.value === passInput.value && e.target.value !== "");
    e.target.nextElementSibling.textContent = isValid.confirm ? "✅" : "❌";
    checkFormValidity();
});

// 5. Phone Format (09xx-xxx-xxx)
phoneInput.addEventListener("input", (e) => {
    let val = e.target.value.replace(/\D/g, '').substring(0, 10); // Chỉ lấy số, max 10
    let formatted = val;
    if (val.length > 4) formatted = val.substring(0, 4) + '-' + val.substring(4);
    if (val.length > 7) formatted = formatted.substring(0, 8) + '-' + val.substring(8);
    
    e.target.value = formatted;
    isValid.phone = val.length === 10;
    checkFormValidity();
});

// Submit
form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("🎉 Đăng ký thành công!\n" + 
          `Tên: ${nameInput.value}\nEmail: ${emailInput.value}\nSĐT: ${phoneInput.value}`);
});