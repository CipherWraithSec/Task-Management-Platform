import axios from "axios";
import { API_URL } from "./constants/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Send cookies with requests
});

const postData = async <T>(url: string, data: unknown): Promise<T> => {
  try {
    const response = await api.post(url, data);

    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

const updateData = async <T>(url: string, data: unknown): Promise<T> => {
  const response = await api.put(url, data);

  return response.data;
};

const fetchData = async <T>(url: string): Promise<T> => {
  const response = await api.get(url);

  return response.data;
};

const deleteData = async <T>(url: string): Promise<T> => {
  const response = await api.delete(url);

  return response.data;
};

export { postData, fetchData, updateData, deleteData };
