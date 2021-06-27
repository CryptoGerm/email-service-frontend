import axios from 'axios';

import createStore from '../state/store';
import config from '../appConfig';

const instance = axios.create({
  baseURL: `${config.apiEndpoint()}`,
  headers: {
    accept: 'application/json',
  },
});

const { persistStoreConfig } = createStore();

export default function fetch(options) {
  if (options.useToken) {
    options.headers = {
      'x-access-token': window.localStorage.getItem('token'),
    };
  }
  instance.interceptors.response.use(
    response => response,
    error => {
      if (error.response.status === 401) {
        window.localStorage.removeItem('token');
        persistStoreConfig.purge();
      }
      return Promise.reject(error);
    },
  );
  return instance(options);
}
