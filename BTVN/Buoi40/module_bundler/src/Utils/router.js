import Navigo from "navigo";
import { Error } from "../Error";

export const router = (routes, Layout) => {
     const router = new Navigo("/", { linksSelector: "a" });

     const render = (component, params) => {
          const app = document.getElementById("app");
          if (app) {
               const bodyContent = component(params);
               app.innerHTML = Layout({ body: bodyContent });
          }
     };


     const routesConfig = routes.reduce((config, route) => {
          config[route.path] = (params) => {
               render(route.component, params);
          };
          return config;
     }, {});


     router.notFound(() => {
          const app = document.getElementById("app");
          app.innerHTML = Error();
     });

     router.on(routesConfig).resolve();
     const appRouter = {
          navigate: (path) => router.navigate(path),
     };
     window.navigate = appRouter.navigate;

     return appRouter;
};
