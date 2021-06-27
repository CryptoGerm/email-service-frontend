import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {
  persistStore,
  // FLUSH,
  // REHYDRATE,
  // PAUSE,
  // PERSIST,
  // PURGE,
  // REGISTER,
} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { createInjectorsEnhancer, forceReducerReload } from 'redux-injectors';
import { createLogger } from 'redux-logger';

// import middlewares from './middleware';
import createReducer from './reducers';

const reduxSagaMonitorOptions = {};
const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
const { run: runSaga } = sagaMiddleware;

// sagaMiddleware: Makes redux-sagas work
const middlewares = [sagaMiddleware];
if (process.env.NODE_ENV === 'development') {
  middlewares.push(createLogger({ collapsed: true }));
}

const enhancers = [
  createInjectorsEnhancer({
    createReducer,
    runSaga,
  }),
];

const preloadedState = {};

const store = configureStore({
  reducer: createReducer(),
  middleware: [
    ...getDefaultMiddleware({
      thunk: false,
      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
      serializableCheck: false,
    }),
    ...middlewares,
  ],
  preloadedState,
  devTools: process.env.NODE_ENV !== 'production',
  enhancers,
});
const persistConfig = { enhancers };
const persistStoreConfig = persistStore(store, persistConfig, () => {
  //   console.log('Test', store.getState());
});
const configureAppStore = () => ({ persistStoreConfig, store });
// Make reducers hot reloadable
if (module.hot) {
  module.hot.accept('./reducers', () => {
    forceReducerReload(store);
  });
}
export default configureAppStore;
