import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const AppPersistConfig = {
  key: 'App',
  storage,
};

const defaultAppState = {
  rootLevelLoading: false,
  error: false,
  data: {},
  user: {
    isAuthentificated: false,
    token: '',
  },
};

const AppSlice = createSlice({
  name: 'App',
  initialState: defaultAppState,
  reducers: {
    runLoader: state => {
      state.rootLevelLoading = true;
    },
    stopLoader: state => {
      state.rootLevelLoading = false;
    },
    toggleError: (state, action) => {
      state.error = !state.error;
      state.data = action.payload;
    },
    updateGlobalUser: (state, action) => {
      state.user.isAuthentificated = true;
      state.user.token = action.payload.data.token;
    },
    updateGlobalLogout: state => {
      state.user.isAuthentificated = false;
      state.user.token = '';
    },
  },
});

const AppReducer = persistReducer(AppPersistConfig, AppSlice.reducer);
export default AppReducer;
export const {
  runLoader,
  toggleLoader,
  stopLoader,
  toggleError,
  toggleSideBar,
  updateGlobalUser,
  updateGlobalLogout,
  updateGlobalWorkSpace,
} = AppSlice.actions;
