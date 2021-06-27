import { createSlice } from '@reduxjs/toolkit';

const defaultregisterState = {
  register: {
    status: 'idle',
    data: undefined,
    message: '',
  },
};

const registerSlice = createSlice({
  name: 'Register',
  initialState: defaultregisterState,
  reducers: {
    register: (state, action) => {
      state.register.data = action.payload.data;
    },
    registerSuccess: (state, action) => {
      state.register.status = 'ok';
      state.register.message = action.payload.data.message;
      state.register.data = action.payload.data.data;
    },
    registerFailure: (state, action) => {
      state.register.status = 'error';
      state.register.message = action.payload.data.message;
      state.register.data = action.payload.data.data;
    },
  },
});

export const { name, actions, reducer } = registerSlice;
