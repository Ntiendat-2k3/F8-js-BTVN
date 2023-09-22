// Để tạo đc 1 component (Thành phần web)
/**
 * Có 1 hàm tạo hoặc class kế thừa từ HTMlElement
 * Sử dụng object: customElements
 */

// Tạo ra 1 thẻ html có tên : hello-word

function HelloWord() {
     return Reflect.construct(HTMLElement, [], HelloWord);
}
HelloWord.prototype = Object.create(HTMLElement.prototype);

/// Vòng đời component
// Khởi tạo
HelloWord.prototype.constructor = HelloWord; 
// Kết nối
HelloWord.prototype.connectedCallback = function () {
     console.log("Noi dung cua component");
     this.innerText = "Xin chao F8";
}; 
// Định nghĩa
customElements.define("hello-word", HelloWord);
console.log(HelloWord.prototype);
