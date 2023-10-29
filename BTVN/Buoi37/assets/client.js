import { config } from "./config.js";
import { requestRefresh } from "./token.js";
const { SERVER_API } = config;

export const client = {
     serverApi: SERVER_API,
     token: null,

     setUrl: function (url) {
          this.serverApi = url;
     },

     setToken: function (token) {
          this.token = token;
     },

     send: async function (url, method = "GET", body = null, token) {
          url = `${this.serverApi}${url}`;

          const headers = {
               "Content-Type": "application/json",
          };

          if (token) {
               headers["Authorization"] = `Bearer ${token}`;
          }

          const options = {
               method,
               headers,
          };
          if (body) {
               options.body = JSON.stringify(body);
          }
          let response = await fetch(url, options);
          // console.log("response", response);
          let data = await response.json();
          // console.log("data", data);

          if (response.status === 401 && this.token) {
               const loginTokens = JSON.parse(localStorage.getItem("login_tokens") || "{}");
               const { refreshToken } = loginTokens;

               if (refreshToken) {
                    const refreshedData = await requestRefresh(refreshToken);
                    if (refreshedData && refreshedData.accessToken) {
                         // Cập nhật accessToken mới vào localStorage
                         loginTokens.accessToken = refreshedData.accessToken;
                         loginTokens.refreshToken = refreshedData.refreshToken;
                         localStorage.setItem("login_tokens", JSON.stringify(loginTokens));

                         // Dùng refreshToken để lấy 2 cái mới
                         this.setToken(refreshedData.accessToken);
                         headers["Authorization"] = `Bearer ${refreshedData.accessToken}`;

                         response = await fetch(url, options);
                         data = await response.json();
                    }
               }
          }

          return { response, data };
     },

     get: async function (url, token) {
          return this.send(url, "GET", null, token);
     },

     post: function (url, body) {
          return this.send(url, "POST", body);
     },
     put: function (url, body) {
          return this.send(url, "PUT", body);
     },
     patch: function (url, body) {
          return this.send(url, "PATCH", body);
     },
     delete: function (url) {
          return this.send(url, "DELETE");
     },
};
