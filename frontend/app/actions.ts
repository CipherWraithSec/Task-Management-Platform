"use server";

import { SignupFormData } from "./auth/signup/page";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import createApi from "./lib/utils/api";
import { AUTHENTICATION_COOKIE } from "./lib/constants/api";
import { redirect } from "next/navigation";

// Return boolean on if the cookie has been set (if we're authenticated)
export async function authenticated() {
  // If the cookie exists on the current request scope
  const cookieStore = await cookies();
  return !!cookieStore.get(AUTHENTICATION_COOKIE)?.value;
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTHENTICATION_COOKIE);
  redirect("/auth/login");
}

// Capitalize the first letter of the error message
const formatErrorMessage = (message: string) => {
  return message.charAt(0).toUpperCase() + message.slice(1);
};

// Get a user-friendly error message from the api response
export const getErrorMessage = async (response: any) => {
  if (response?.message) {
    // Check if the message is an array from class-validator middleware
    if (Array.isArray(response.message)) {
      return formatErrorMessage(response.message[0]);
    }
    return formatErrorMessage(response.message);
  }
  return "An error occurred";
};

// Set the authentication cookie after a successful login.
const setAuthCookie = (response, cookieStore) => {
  // Returns 'set-cookie' as an array of strings, or undefined if no header is present
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
      cookieStore.set({
        name: AUTHENTICATION_COOKIE,
        value: token,
        secure: false, // Set to true for https
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

export async function loginAction<T>(url: string, data: unknown): Promise<T> {
  // Get the cookie from the current request scope
  const cookieStore = await cookies();
  const cookieString = cookieStore.toString();

  // Access the Axios instance
  const api = createApi(cookieString);

  try {
    const response = await api.post(url, data);

    // Call the helper and pass the cookieStore object
    setAuthCookie(response, cookieStore);

    return response.data;
  } catch (error: any) {
    throw await getErrorMessage(error.response?.data);
  }
}

export async function postDataAction<T>(
  url: string,
  data: unknown
): Promise<T> {
  // Get the cookie from the current request scope
  const cookieStore = await cookies();
  const cookieString = cookieStore.toString();

  // Access the Axios instance
  const api = createApi(cookieString);

  try {
    const response = await api.post(url, data);

    return response.data;
  } catch (error: any) {
    throw await getErrorMessage(error.response?.data);
  }
}

export async function fetchDataAction<T>(url: string): Promise<T> {
  // Get the cookie from the current request scope
  const cookieStore = await cookies();
  const cookieString = cookieStore.toString();

  // Access the Axios instance
  const api = createApi(cookieString);

  try {
    const response = await api.get(url);

    return response.data;
  } catch (error: any) {
    throw await getErrorMessage(error.response?.data);
  }
}

export async function updateDataAction<T>(
  url: string,
  data: unknown
): Promise<T> {
  // Get the cookie from the current request scope
  const cookieStore = await cookies();
  const cookieString = cookieStore.toString();

  // Access the Axios instance
  const api = createApi(cookieString);

  try {
    const response = await api.patch(url, data);

    return response.data;
  } catch (error: any) {
    throw await getErrorMessage(error.response?.data);
  }
}

export async function deleteDataAction<T>(url: string): Promise<T> {
  // Get the cookie from the current request scope
  const cookieStore = await cookies();
  const cookieString = cookieStore.toString();

  // Access the Axios instance
  const api = createApi(cookieString);

  try {
    const response = await api.delete(url);

    return response.data;
  } catch (error: any) {
    throw await getErrorMessage(error.response?.data);
  }
}
