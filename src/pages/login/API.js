import fetch from '../../utils/fetch';

export function loginAPI(data) {
  return fetch({
    method: 'post',
    url: '/auth/login',
    data,
  });
}
export function loginGoogleAPI({ tokenId }) {
  return fetch({
    method: 'post',
    url: '/auth/google',
    data: {
      token: tokenId,
    },
  });
}
