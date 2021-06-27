import { combineReducers } from '@reduxjs/toolkit';

import AppReducer from './App';
import UserReducer from './User';

export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    App: AppReducer,
    User: UserReducer,
    ...injectedReducers,
  });
  return rootReducer;
}
