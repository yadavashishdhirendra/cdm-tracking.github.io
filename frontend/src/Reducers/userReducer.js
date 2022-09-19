import { createReducer } from "@reduxjs/toolkit";
const initialState = {};

export const AuthReducer = createReducer(initialState, {
  // LOGIN
  LoginRequest: (state) => {
    state.loading = true;
  },
  LoginSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  },

  LogoutSuccess: (state) => {
    state.loading = false;
    state.user = null;
    state.isAuthenticated = false;
  },

  LoginFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

  LogoutFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  // REGISTER
  RegisterRequest: (state) => {
    state.loading = true;
  },
  RegisterSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  RegisterFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

  // LOAD USER
  LoadUserRequest: (state) => {
    state.loading = true;
  },
  LoadUserSuccess: (state, action) => {
    state.user = action.payload;
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  LoadUserFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});

export const getUsers = createReducer(initialState, {
  // LOGIN
  getAllUsersRequest: (state) => {
    state.loading = true;
  },
  getAllUsersSuccess: (state, action) => {
    state.loading = false;
    state.users = action.payload;
  },
  getAllUsersFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});

export const getUsersTasks = createReducer(initialState, {
  // LOGIN
  getUserTaskRequest: (state) => {
    state.loading = true;
  },
  getUserTaskSuccess: (state, action) => {
    state.loading = false;
    state.task = action.payload;
  },
  getUserTaskFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});

export const getUsersByEmail = createReducer(initialState, {
  // LOGIN
  getUsersByEmailRequest: (state) => {
    state.loading = true;
  },
  getUsersByEmailSuccess: (state, action) => {
    state.loading = false;
    state.users = action.payload;
  },
  getUsersByEmailFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});


export const getSingleUser = createReducer(initialState, {
  // LOGIN
  getSingleUserRequest: (state) => {
    state.loading = true;
  },
  getSingleUserSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
  },
  getSingleUserFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});