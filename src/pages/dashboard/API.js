import fetch from '../../utils/fetch';

export function createMailAPI(data) {
  return fetch({
    method: 'post',
    url: '/api/mail/create',
    useToken: true,
    data,
  });
}
export function sendMailAPI(data) {
  return fetch({
    method: 'post',
    url: '/api/mail/send',
    useToken: true,
    data,
  });
}

export function listScheduledMailsAPI() {
  return fetch({
    method: 'get',
    url: '/api/mail/scheduled',
    useToken: true,
  });
}

export function listSentMailsAPI() {
  return fetch({
    method: 'get',
    url: '/api/mail/sent',
    useToken: true,
  });
}
export function listSentScheduledMailsAPI() {
  return fetch({
    method: 'get',
    url: '/api/mail/sent-scheduled',
    useToken: true,
  });
}
