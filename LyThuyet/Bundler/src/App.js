import moment from "moment"; // import node_modules
import "./Assets/Style.css";
import "./Assets/Style.scss";
import config from "./Config.json";
import anime from "./Assets/images/img01.jpg";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
export const App = () => {
     const { PAGE_LIMIT, SERVER_API } = config;
     console.log(process.env.SERVER_API);
     console.log(process.env.MAIL_SERVER);
     console.log(process.env.NODE_ENV); // lấy ra tên môi trường

     return `
          ${Header()}
          <h1>Main</h1>
          <h2>${moment().format("DD/MM/YYYY HH:mm:ss")}</h2>
          <h2>${SERVER_API} - ${PAGE_LIMIT}</h2>
          <div class="content">
               <h2>Học JS</h2>
               <a href="#!">Đăng kí khóa học</a>     
          </div>
          <img src="${anime}" alt="Anime" />
          ${Footer()}
     `;
};
