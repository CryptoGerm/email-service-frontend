import fetch from '../../utils/fetch';

export function registerAPI(data) {
  return fetch({
    method: 'post',
    url: '/auth/register',
    data,
  });
}
