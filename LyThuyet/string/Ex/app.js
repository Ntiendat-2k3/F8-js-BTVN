var email = "hoangan@gmail.com";
// lay ra username
console.log(email.slice(0, email.indexOf("@")));

// kiểm tra 1 chuỗi có đc viết hoa hết hay không
var fullname = "TA HOANG AN";
console.log(fullname.includes(fullname.toUpperCase()));

var fullname1 = "tạ hoàng an";
fullname1 = fullname1.charAt(0).toUpperCase() + fullname1.slice(1);
for (let i = 0; i < fullname1.length; i++) {
     var char = fullname1.charAt(i);
     var charNext = fullname1.charAt(i + 1);
     if (char === ' ' && charNext !== ' ') {
          var index = i + 1;
          console.log(index);
          fullname1 = fullname1.slice(0, index) + charNext.toUpperCase() + fullname1.slice(index + 1);
     }
}
console.log(fullname1);
