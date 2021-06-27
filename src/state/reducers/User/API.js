import fetch from '../../../utils/fetch';

export function getUserDetailsAPI() {
  return fetch({
    method: 'get',
    url: '/api/user/details',
    useToken: true,
  });
}
