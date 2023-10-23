// Xử lý thời gian
const today = new Date();
console.log({ today });
console.log(today);

const date = new Date("2023-10-20 21:01:01");
console.log(date);

console.log(date.getDate());
console.log(date.getDay());
console.log(date.getMonth() + 1);
console.log(date.getFullYear());
console.log(date.getHours());
console.log(date.getMinutes());
console.log(date.getSeconds());
console.log(date.getMilliseconds());
console.log(date.getTime()); // Số mili giây tính từ năm 1970 đến thời điểm cần lấy

date.setDate(19);
console.log(date);

const clock = () => {
     const today = new Date();
     const output = `Hôm nay là: ${today.getDay()} - ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
     document.body.innerHTML = output;
};
setInterval(clock, 1000);
