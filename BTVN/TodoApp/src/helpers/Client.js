import SERVER_API from "../configs";

class Client {
     constructor(serverApi = SERVER_API) {
          this.serverApi = serverApi;
     }

     async callApi(endpoint, method, params = {}, body = {}, token = null) {
          let url = new URL(`${this.serverApi}${endpoint}`);

          // Thêm params vào URL nếu có
          Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));

          const headers = { "Content-Type": "application/json" };
          if (token) {
               headers["X-Api-Key"] = token;
          }

          const options = {
               method,
               headers,
               body: Object.keys(body).length ? JSON.stringify(body) : null,
          };

          try {
               const response = await fetch(url, options);
               const data = await response.json();
               if (response.ok) {
                    return { response, data };
               } else {
                    throw new Error(data.message || "An error occurred while fetching data");
               }
          } catch (error) {
               console.error("Client error:", error);
               throw error; // Thay vì trả về, ném lỗi ra ngoài để người gọi phương thức xử lý
          }
     }

     get(endpoint, params = {}, token = null) {
          return this.callApi(endpoint, "GET", params, {}, token);
     }

     post(endpoint, body, params = {}, token = null) {
          return this.callApi(endpoint, "POST", params, body, token);
     }

     put(endpoint, body, params = {}, token = null) {
          return this.callApi(endpoint, "PUT", params, body, token);
     }

     patch(endpoint, body, params = {}, token = null) {
          return this.callApi(endpoint, "PATCH", params, body, token);
     }

     delete(endpoint, params = {}, token = null) {
          return this.callApi(endpoint, "DELETE", params, {}, token);
     }
}

export default Client;
