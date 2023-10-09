// Export
// 1. export default : 1 file chỉ có 1
// 2. export named :  1 file có thể có nhiều

function getUsers() {
     return [
          {
               id: 1,
               name: "Hoang An",
          },
          {
               id: 2,
               name: "Dat",
          },
     ];
}

function getProducts() {
     return "Products";
}
const posts = ["Post1", "Post2", "Post3"];

export default getUsers;
export { getProducts, posts };
