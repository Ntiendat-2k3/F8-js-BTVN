export const ProductDetail = (params) => {
     const id = params.data.id;

     return `
          <h3>Chi tiết sản phẩm: ${id}</h3>
          <button  onclick="navigate('/san-pham')">Back</button>
     `;
};
