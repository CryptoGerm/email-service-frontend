import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import './index.css';
import App from './app/App';

import createStore from './state/store';
import reportWebVitals from './reportWebVitals';

const { persistStoreConfig, store } = createStore();

ReactDOM.render(
  // <React.StrictMode>
  <ReduxProvider store={store}>
    <BrowserRouter>
      <PersistGate persistor={persistStoreConfig}>
        <App />
      </PersistGate>
    </BrowserRouter>
  </ReduxProvider>,
  // </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
