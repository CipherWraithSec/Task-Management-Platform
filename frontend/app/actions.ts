"use server";

import axios from "axios";
import { SignupFormData } from "./test/signup/page";
import { jwtDecode } from "jwt-decode";
import { API_URL } from "./lib/contants";
import { getErrorMessage } from "./lib/utils";
import { error } from "console";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

// const API_URL = "http://localhost:3001";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Send cookies
});

// const postAction = async (url: string, data: unknown) => {
//   try {
//     const response = await api.post("/auth/login", data);

//     return response.data;
//   } catch (error: any) {
//     throw error.response.data;
//   }
// };

export async function loginAction<T>(url: string, data: unknown): Promise<T> {
  try {
    const response = await api.post(url, data);

    // set cookie
    setAuthCookie(response);
    // redirect("/");
    return response.data;
  } catch (error: any) {
    throw getErrorMessage(error.response?.data);
    // throw error;
  }
}

// Take in a response and pull of the JWT form the Set-cookie header and add it to nextjs server cookies
const setAuthCookie = (response: any) => {
  // Axios returns 'set-cookie' as an array of strings, or undefined if no header is present
  const setCookieHeader = response.headers["set-cookie"];

  // Check that the header exists and is a string before attempting to split
  if (
    setCookieHeader &&
    Array.isArray(setCookieHeader) &&
    typeof setCookieHeader[0] === "string"
  ) {
    // The first element of the array contains the combined cookie string
    const cookieString = setCookieHeader[0];
    const token = cookieString.split(";")[0].split("=")[1];

    // Handle the case where the token is undefined
    if (token) {
      const cookieStore = cookies();
      cookieStore.set({
        name: "Authentication",
        value: token,
        secure: false, // for https
        httpOnly: true,
        expires: new Date(jwtDecode(token).exp! * 1000),
      });
    } else {
      console.error(
        "Token could not be extracted from Set-Cookie header:",
        cookieString
      );
    }
  } else {
    // Log a warning if the header is missing or in an unexpected format
    console.warn(
      "Set-Cookie header not found or in unexpected format:",
      setCookieHeader
    );
  }
};

export async function postDataAction<T>(
  url: string,
  data: unknown
): Promise<T> {
  try {
    const response = await api.post(url, data);

    return response.data;
  } catch (error: any) {
    throw getErrorMessage(error.response?.data);
  }
}

export interface UserResponse {
  userId: string;
  username: string;
  email: string;
}

export async function getUserAction() {
  try {
    const response = await api.get<UserResponse>("/users/me");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data; // { message: "Unauthorized", statusCode: 401 }
    }
    throw { message: "Network or unexpected error occurred" };
  }
}

// export { postAction };
