import navigo from "navigo";
import { Error } from "../Error";

function displayContentInLayout(Layout, content) {
     const app = document.getElementById("app");
     if (!app) {
          console.error(`Element with ID ${APP_ELEMENT_ID} not found!`);
          return;
     }
     app.innerHTML = Layout({ body: content });
}

export const router = (routes, Layout) => {
     const routerInstance = new navigo("/", { linksSelector: "a" });

     // Định nghĩa cách xử lý khi một route được truy cập
     const handleRoute = (component, params) => {
          document.body.classList.remove("error-state");
          const content = component(params);
          displayContentInLayout(Layout, content);
     };

     // Tạo cấu hình cho các route
     const routesConfig = routes.reduce((acc, route) => {
          acc[route.path] = (params) => handleRoute(route.component, params);
          return acc;
     }, {});

     routerInstance
          .on(routesConfig)
          .notFound(() => displayContentInLayout(Layout, Error()))
          .resolve();

     const navigate = (path) => routerInstance.navigate(path);
     window.navigate = navigate;
     return { navigate };
};
