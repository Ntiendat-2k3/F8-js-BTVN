import "../Assets/Style.scss";
export const ProductDetail = (params) => {
     const id = params.data.id;

     return `
          <h3><span>Chi tiết sản phẩm:</span> ${id}</h3>
          <button onclick="navigate('/san-pham')">Back</button>
     `;
};
