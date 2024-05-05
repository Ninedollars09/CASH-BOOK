// อ้างอิง element ใน index.html
const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

const dataTransaction = [
  { id: 1, text: "ค่าขนม", amount: -100 },
  { id: 2, text: "ค่าห้อง", amount: -3000 },
  { id: 3, text: "เงินเดือน", amount: +18000 },
  { id: 4, text: "ค่าอาหาร", amount: -500 },
];

let transactions = [];

function init() {
  list.innerHTML = "";
  transactions.forEach(addDataToList);
  calculateMoney();
}
function addDataToList(transactions) {
  const symbol = transactions.amount < 0 ? "-" : "+";
  const status = transactions.amount < 0 ? "minus" : "plus";
  const item = document.createElement("li");
  result = numberWithCommas(Math.abs(transactions.amount));
  item.classList.add(status);
  item.innerHTML = `${transactions.text}<span>${symbol} ${result}</span><button class="delete-btn" onclick="removeData(${transactions.id})">x</button>`;
  list.appendChild(item);
}

function numberWithCommas(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function autoId() {
  return Math.floor(Math.random() * 1000000);
}

function calculateMoney() {
  const amounts = transactions.map((transactions) => transactions.amount);
  //คำนวณยอดคงเหลือ
  const total = amounts
    .reduce((result, item) => (result += item), 0)
    .toFixed(2);
  //คำนวณรายรับ
  const income = amounts
    .filter((item) => item > 0)
    .reduce((result, item) => (result += item), 0)
    .toFixed(2);
  //คำนวณรายจ่าย
  const expense =
    amounts
      .filter((item) => item < 0)
      .reduce((result, item) => (result += item), 0) * -(1).toFixed(2);

  //แสดงผลทางจอภาพ
  balance.innerText = `฿` + numberWithCommas(total);
  money_plus.innerText = `฿` + numberWithCommas(income);
  money_minus.innerText = `฿` + numberWithCommas(expense);
}
function removeData(id) {
  transactions = transactions.filter((transactions) => transactions.id !== id);
  init();
}
function addTransaction(e) {
  e.preventDefault();
  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("กรุณากรอกข้อมูลให้ครบ");
  } else {
    const data = {
      id: autoId(),
      text: text.value,
      amount: +amount.value, //ใส่เครื่องหมาย + ข้างหน้าเพื่อแปลงค่าที่ได้เป็น number
    };
    transactions.push(data);
    addDataToList(data);
    calculateMoney();
    text.value = "";
    amount.value = "";
  }
}

form.addEventListener("submit", addTransaction);

init();
