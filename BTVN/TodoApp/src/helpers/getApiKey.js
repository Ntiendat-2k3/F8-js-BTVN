import Client from "./Client";

const getApiKey = async (email) => {
     const client = new Client();
     try {
          const response = await client.get("/api-key", { email: email });
          if (response.data && response.data.data) {
               const apiKey = response.data.data.apiKey;
               localStorage.setItem("apiKey", apiKey);
               localStorage.setItem("email", email);
               return apiKey;
          } else {
               throw new Error("Không thể lấy API key");
          }
     } catch (error) {
          console.error("Error fetching API key:", error);
          throw error;
     }
};

export default getApiKey;
