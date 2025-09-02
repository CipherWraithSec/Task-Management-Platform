import { useAppSelector } from "@/app/hooks/redux";
import { createSlice } from "@reduxjs/toolkit";

type authState = {
  isAuthenticated: boolean;
};

const initialState: authState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Reducer to set authentication status to true
    logIn: (state) => {
      state.isAuthenticated = true;
    },
    // Reducer to set authentication status to false
    logOut: (state) => {
      state.isAuthenticated = false;
    },
    setAuthStatus: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const useAuth = () => useAppSelector((state) => state.auth);

export const { logIn, logOut, setAuthStatus } = authSlice.actions;

export default authSlice.reducer;
