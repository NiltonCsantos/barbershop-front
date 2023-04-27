import axios from "axios";

const Api = axios.create({
  baseURL: "https://barbershop-api-2vva.onrender.com",
});

export default Api;
