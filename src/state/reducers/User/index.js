import { createSlice } from '@reduxjs/toolkit';

const defaultUserState = {
  getUserDetails: {
    status: 'idle',
    data: {},
    message: '',
  },
};
const UserSlice = createSlice({
  name: 'User',
  initialState: defaultUserState,
  reducers: {
    getUserDetails: () => {},
    getUserDetailsSuccess: (state, action) => {
      state.getUserDetails.status = action.payload.data.status;
      state.getUserDetails.message = action.payload.data.message;
      state.getUserDetails.data = action.payload.data.data;
    },
    getUserDetailsFailure: (state, action) => {
      state.getUserDetails.status = action.payload.data.status;
      state.getUserDetails.message = action.payload.data.message;
      state.getUserDetails.data = action.payload.data.data;
    },
  },
});

const UserReducer = UserSlice.reducer;
export const { actions, name, reducer } = UserSlice;
export default UserReducer;
