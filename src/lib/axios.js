import Axios from "axios";
import { readCookie } from "./cookieService";

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
  withXSRFToken: true,
});

axios.interceptors.request.use(async (config) => {
  const authToken = await readCookie("authToken");
  const token = authToken?.value;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axios;
