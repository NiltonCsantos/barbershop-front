import axios from "axios";

const Api = axios.create({
  baseURL: "https://barbershop-api-production.up.railway.app",
});

export default Api;
