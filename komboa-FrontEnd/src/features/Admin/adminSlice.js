import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  accessToken: null,
  refreshToken: null,
  auth: false,
  userRole: "role",
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    signUp(state, action) {
      const adminSignUp = {
        user: action.payload.userDetails,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        auth: action.payload.auth,
        contact: action.payload.contact,
      };
      return { ...adminSignUp };
    },
    logIn(state = initialState, action) {
      const admin = {
        user: action.payload.userDetails,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        auth: action.payload.auth,
        contact: action.payload.contact,
      };
      return { ...admin };
    },
    logOut() {
      return initialState;
    },
  },
});

export const { logIn, signUp, logOut } = adminSlice.actions;

export const userSelector = (state) => {
  return state.persistedReducer.admin.user;
};
export const authSelector = (state) => {
  return state.persistedReducer.admin.auth;
};
export const roleSelector = (state) => {
  return state.persistedReducer.admin.user.Role;
};
export const idSelector = (state) => {
  return state.persistedReducer.admin.user.userId;
};
export const tokenSelector = (state) => {
  return state.persistedReducer.admin.accessToken;
};

export default adminSlice.reducer;
