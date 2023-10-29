import image from "./Assets/images/404-error.jpg";
import "./Assets/Error.scss";
export const Error = () => {
     return `
          <div class="error-page">
               <img src="${image}" alt="image" />
          </div>
     `;
};
