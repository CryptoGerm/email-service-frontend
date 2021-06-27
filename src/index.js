import React from 'react';
import ReactDOM from 'react-dom';

import { Router } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import './index.css';
import App from './app/App';

import createStore from './state/store';
import reportWebVitals from './reportWebVitals';
import history from './utils/history';

const { persistStoreConfig, store } = createStore();

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <Router history={history}>
        <PersistGate persistor={persistStoreConfig}>
          <App />
        </PersistGate>
      </Router>
    </ReduxProvider>
    ,
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
