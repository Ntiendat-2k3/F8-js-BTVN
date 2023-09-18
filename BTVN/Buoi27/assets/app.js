const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const products = [
     {
          id: 1,
          name_product: "Sản phẩm 1",
          price: 2000,
     },
     {
          id: 2,
          name_product: "Sản phẩm 2",
          price: 4000,
     },
     {
          id: 3,
          name_product: "Sản phẩm 3",
          price: 6000,
     },
];
const productTable = $("#product_table");
let result = products.map((item, index) => {
     return `<tbody>
               <tr>
                    <td>${item.id}</td>
                    <td>${item.name_product}</td>
                    <td>${item.price}</td>
                    <td>
                         <input type="number" value="1" min="1"/>
                         <button type="button" class="add_to_cart" data-id="${item.id}">Thêm vào giỏ</button>
                    </td>
               </tr>
          </tbody>`;
});
productTable.insertAdjacentHTML("beforeend", result.join(""));
console.log(result);

const cartTable = $("#cart_table");
let cartItems = [];

productTable.addEventListener("click", function (e) {
     if (e.target.classList.contains("add_to_cart")) {
          const productId = e.target.getAttribute("data-id");
          const selectedProduct = products.find((product) => product.id === parseInt(productId));
          if (selectedProduct) {
               const existingCartItem = cartItems.find((item) => item.id === selectedProduct.id);
               const inputValue = e.target.closest("tr").querySelector("input").value;

               if (existingCartItem) {
                    existingCartItem.quantity += parseInt(inputValue);
                    existingCartItem.totalPrice =
                         existingCartItem.quantity * existingCartItem.price;
               } else {
                    cartItems.push({
                         id: selectedProduct.id,
                         name: selectedProduct.name_product,
                         price: selectedProduct.price,
                         quantity: parseInt(inputValue),
                         totalPrice: selectedProduct.price * parseInt(inputValue),
                    });
               }
               renderCartTable();
          }
     }
});

function renderCartTable() {
     const tbody = cartTable.querySelector("tbody");
     tbody.innerHTML = "";
     let totalQuantity = 0;
     let totalPrice = 0;
     cartItems.forEach((item, index) => {
          const cartRow = document.createElement("tr");
          cartRow.innerHTML = `
               <td>${index + 1}</td>
               <td>${item.name}</td>
               <td>${item.price}</td>
               <td><input type="number" value="${item.quantity}" min="1" data-id="${
               item.id
          }" class="cart-quantity-input"/></td>
               <td>${item.totalPrice}</td>
               <td><button class="remove_cart" data-id="${item.id}">Xóa</button></td>
          `;
          tbody.appendChild(cartRow);
          totalQuantity += item.quantity;
          totalPrice += item.totalPrice;
     });
     const totalRow = document.createElement("tr");
     totalRow.innerHTML = `
          <td colspan="3" style="text-align: left">Tổng</td>
          <td>Quantity: ${totalQuantity}</td>
          <td>Total: ${totalPrice}</td>
     `;
     tbody.appendChild(totalRow);
}

cartTable.addEventListener("click", function (e) {
     if (e.target.classList.contains("remove_cart")) {
          const productId = e.target.getAttribute("data-id");
          const indexToRemove = cartItems.findIndex((item) => item.id === parseInt(productId));
          if (indexToRemove !== -1) {
               cartItems.splice(indexToRemove, 1);
               renderCartTable();
          }
     }
});

const updateCartBtn = $("#update_cart");
const deleteCartBtn = $("#delete_cart");
deleteCartBtn.addEventListener("click", function () {
     const userConfirmed = confirm("Bạn có muốn xóa giỏ hàng không?");
     if (userConfirmed) {
          cartItems = [];
          renderCartTable();
     }
});
updateCartBtn.addEventListener("click", function () {
     const cartRows = cartTable.querySelectorAll("tbody tr");
     cartRows.forEach((row) => {
          const productId = row.dataset.id;
          const newQuantity = parseInt(row.querySelector(".cart-quantity-input").value);
          const cartItem = cartItems.find((item) => item.id === parseInt(productId));
          if (cartItem) {
               cartItem.quantity = newQuantity;
               cartItem.totalPrice = cartItem.price * newQuantity;
          }
     });
     renderCartTable();
});

// const $ = document.querySelector.bind(document);
// const $$ = document.querySelectorAll.bind(document);

// const products = [
//      {
//           id: 1,
//           name_product: "Sản phẩm 1",
//           price: 2000,
//      },
//      {
//           id: 2,
//           name_product: "Sản phẩm 2",
//           price: 4000,
//      },
//      {
//           id: 3,
//           name_product: "Sản phẩm 3",
//           price: 6000,
//      },
// ];

// const productTable = $("#product_table");
// const cartTable = $("#cart_table");
// const cartItems = [];

// function createTableRow(item, index) {
//      const row = document.createElement("tr");
//      row.innerHTML = `
//           <td>${index + 1}</td>
//           <td>${item.name_product}</td>
//           <td>${item.price}</td>
//           <td>
//                <input type="number" value="1" min="1"/>
//                <button type="button" class="add_to_cart" data-id="${item.id}">Thêm vào giỏ</button>
//           </td>
//      `;
//      return row;
// }

// function updateCart() {
//      const tbody = cartTable.querySelector("tbody");
//      tbody.innerHTML = "";
//      let totalQuantity = 0;
//      let totalPrice = 0;

//      cartItems.forEach((item, index) => {
//           const cartRow = createTableRow(item, index);
//           tbody.appendChild(cartRow);

//           totalQuantity += item.quantity;
//           totalPrice += item.totalPrice;
//      });

//      const totalRow = document.createElement("tr");
//      totalRow.innerHTML = `
//           <td colspan="3" style="text-align: left">Tổng</td>
//           <td>Quantity: ${totalQuantity}</td>
//           <td>Total: ${totalPrice}</td>
//      `;
//      tbody.appendChild(totalRow);
// }

// productTable.addEventListener("click", function (e) {
//      if (e.target.classList.contains("add_to_cart")) {
//           const productId = e.target.getAttribute("data-id");
//           const selectedProduct = products.find((product) => product.id === parseInt(productId));
//           if (selectedProduct) {
//                const existingCartItem = cartItems.find((item) => item.id === selectedProduct.id);
//                const inputValue = e.target.closest("tr").querySelector("input").value;

//                if (existingCartItem) {
//                     existingCartItem.quantity += parseInt(inputValue);
//                     existingCartItem.totalPrice =
//                          existingCartItem.quantity * existingCartItem.price;
//                } else {
//                     cartItems.push({
//                          id: selectedProduct.id,
//                          name: selectedProduct.name_product,
//                          price: selectedProduct.price,
//                          quantity: parseInt(inputValue),
//                          totalPrice: selectedProduct.price * parseInt(inputValue),
//                     });
//                }

//                updateCart();
//           }
//      }
// });

// cartTable.addEventListener("click", function (e) {
//      if (e.target.classList.contains("remove_cart")) {
//           const productId = e.target.getAttribute("data-id");
//           const indexToRemove = cartItems.findIndex((item) => item.id === parseInt(productId));
//           if (indexToRemove !== -1) {
//                cartItems.splice(indexToRemove, 1);
//                updateCart();
//           }
//      }
// });

// const updateCartBtn = $("#update_cart");
// const deleteCartBtn = $("#delete_cart");
// deleteCartBtn.addEventListener("click", function () {
//      const userConfirmed = confirm("Bạn có muốn xóa giỏ hàng không?");
//      if (userConfirmed) {
//           cartItems.length = 0;
//           updateCart();
//      }
// });

// updateCartBtn.addEventListener("click", function () {
//      const cartRows = cartTable.querySelectorAll("tbody tr");
//      cartRows.forEach((row) => {
//           const productId = row.querySelector(".add_to_cart").getAttribute("data-id");
//           const newQuantity = parseInt(row.querySelector("input").value);
//           const cartItem = cartItems.find((item) => item.id === parseInt(productId));

//           if (cartItem) {
//                cartItem.quantity = newQuantity;
//                cartItem.totalPrice = cartItem.price * newQuantity;
//           }
//      });

//      updateCart();
// });

// // Khởi tạo bảng sản phẩm ban đầu
// const productRows = products.map((item, index) => createTableRow(item, index));
// productTable.querySelector("tbody").append(...productRows);
