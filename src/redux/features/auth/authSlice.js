import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: null,
    status: "idle",
    error: null,
  },
  reducers: {
    signupRequest: (state) => {
      state.status = "loading";
    },
    signupSuccess: (state, action) => {
      const {id,email,firstName,lastName} = action.payload
      state.status = "succeeded";
      state.data = {id,email,firstName,lastName};
      // console.log(action.payload,"PAYLOAD")
    },
    signupFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    loginRequest: (state) => {
      state.status = "loading";
    },
    loginSuccess: (state, action) => {
      const {id,email,firstName,lastName} = action.payload

      state.status = "succeeded";
      state.data = {id,email,firstName,lastName}  ;
      // console.log(action.payload, "login");
      localStorage.setItem(
        "users",
        JSON.stringify({ id: action.payload.id, email: action.payload.email })
      );
    },
    loginFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    logout: (state) => {
      state.data = null;
      localStorage.removeItem("users");
    }
  },
});

export const {
  signupRequest,
  signupSuccess,
  signupFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  clearData
} = authSlice.actions;

export default authSlice.reducer;
