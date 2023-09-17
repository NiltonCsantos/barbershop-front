import axios from "axios";

const Api = axios.create({
  baseURL: "https://clear-elk-hosiery.cyclic.cloud/",
});

export default Api;
