import { createSlice } from '@reduxjs/toolkit';

const defaultloginState = {
  login: {
    status: 'idle',
    data: undefined,
    message: '',
  },
  loginGoogle: {
    status: 'idle',
    data: undefined,
    message: '',
  },
};

const loginSlice = createSlice({
  name: 'Login',
  initialState: defaultloginState,
  reducers: {
    login: (state, action) => {
      state.login.data = action.payload.data;
    },
    loginSuccess: (state, action) => {
      state.login.status = action.payload.data.status;
      state.login.message = action.payload.data.message;
      state.login.data = action.payload.data.data;
    },
    loginFailure: (state, action) => {
      state.login.status = action.payload.data.status;
      state.login.message = action.payload.data.message;
      state.login.data = action.payload.data.data;
    },
    loginGoogle: (state, action) => {
      state.loginGoogle.data = action.payload.data;
    },
    loginGoogleSuccess: (state, action) => {
      state.loginGoogle.status = action.payload.data.status;
      state.loginGoogle.message = action.payload.data.message;
      state.loginGoogle.data = action.payload.data.data;
    },
    loginGoogleFailure: (state, action) => {
      state.loginGoogle.status = action.payload.data.status;
      state.loginGoogle.message = action.payload.data.message;
      state.loginGoogle.data = action.payload.data.data;
    },
  },
});

export const { name, actions, reducer } = loginSlice;
