const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];

let rankingCount = { "Giỏi": 0, "Khá": 0, "Trung bình": 0, "Yếu": 0 };
let processedStudents = [];

// 1 & 2. Tính điểm TB và xếp loại
for (let i = 0; i < students.length; i++) {
    let s = students[i];
    let tb = (s.math * 0.4) + (s.physics * 0.3) + (s.cs * 0.3);
    tb = Math.round(tb * 10) / 10; // Làm tròn 1 chữ số thập phân
    
    let rank = "";
    if (tb >= 8.0) rank = "Giỏi";
    else if (tb >= 6.5) rank = "Khá";
    else if (tb >= 5.0) rank = "Trung bình";
    else rank = "Yếu";

    rankingCount[rank]++;
    processedStudents.push({ STT: i + 1, Tên: s.name, TB: tb, "Xếp loại": rank });
}

// 3. In bảng kết quả
console.table(processedStudents);

// 4. Đếm số lượng
console.log("Số lượng xếp loại:", rankingCount);

// 5. Max / Min
processedStudents.sort((a, b) => b.TB - a.TB);
console.log(`Cao nhất: ${processedStudents[0].Tên} (${processedStudents[0].TB})`);
console.log(`Thấp nhất: ${processedStudents[processedStudents.length - 1].Tên} (${processedStudents[processedStudents.length - 1].TB})`);