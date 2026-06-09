import axios from "axios";

const API = axios.create({
  baseURL: "https://skycast-ykuh.onrender.com"
});

export default API;