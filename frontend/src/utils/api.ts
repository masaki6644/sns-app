import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api", // next.js 側のエンドポイント

  withCredentials: true, // これがないと Cookie が送信されない
});



export default api;
