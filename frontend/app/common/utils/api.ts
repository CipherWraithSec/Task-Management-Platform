import axios from "axios";
import { API_URL } from "../constants/api";

const createApi = (cookieString) => {
  const instance = axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
      // Add the Cookie header only if the cookieString is provided
      ...(cookieString && { Cookie: cookieString }),
    },
    withCredentials: true,
  });
  return instance;
};

export default createApi;
