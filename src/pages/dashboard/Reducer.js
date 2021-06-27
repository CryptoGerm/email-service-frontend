import { createSlice } from '@reduxjs/toolkit';

const defaultmailState = {
  createMail: {
    status: 'idle',
    data: undefined,
    message: '',
  },
  sendMail: {
    status: 'idle',
    data: undefined,
    message: '',
  },
  listScheduledMails: {
    status: 'idle',
    data: undefined,
    message: '',
  },
  listSentMails: {
    status: 'idle',
    data: undefined,
    message: '',
  },
  listSentScheduledMails: {
    status: 'idle',
    data: undefined,
    message: '',
  },
};

const mailSlice = createSlice({
  name: 'Mail',
  initialState: defaultmailState,
  reducers: {
    createMail: (state, action) => {
      state.createMail.data = action.payload.data;
    },
    createMailSuccess: (state, action) => {
      state.createMail.status = action.payload.data.status;
      state.createMail.message = action.payload.data.message;
      state.createMail.data = action.payload.data.data;
    },
    createMailFailure: (state, action) => {
      state.createMail.status = action.payload.data.status;
      state.createMail.message = action.payload.data.message;
      state.createMail.data = action.payload.data.data;
    },
    sendMail: (state, action) => {
      state.sendMail.data = action.payload.data;
    },
    sendMailSuccess: (state, action) => {
      state.sendMail.status = action.payload.data.status;
      state.sendMail.message = action.payload.data.message;
      state.sendMail.data = action.payload.data.data;
    },
    sendMailFailure: (state, action) => {
      state.sendMail.status = action.payload.data.status;
      state.sendMail.message = action.payload.data.message;
      state.sendMail.data = action.payload.data.data;
    },
    listScheduledMails: () => {},
    listScheduledMailsSuccess: (state, action) => {
      state.listScheduledMails.status = action.payload.data.status;
      state.listScheduledMails.message = action.payload.data.message;
      state.listScheduledMails.data = action.payload.data.data;
    },
    listScheduledMailsFailure: (state, action) => {
      state.listScheduledMails.status = action.payload.data.status;
      state.listScheduledMails.message = action.payload.data.message;
      state.listScheduledMails.data = action.payload.data.data;
    },
    listSentMails: () => {},
    listSentMailsSuccess: (state, action) => {
      state.listSentMails.status = action.payload.data.status;
      state.listSentMails.message = action.payload.data.message;
      state.listSentMails.data = action.payload.data.data;
    },
    listSentMailsFailure: (state, action) => {
      state.listSentMails.status = action.payload.data.status;
      state.listSentMails.message = action.payload.data.message;
      state.listSentMails.data = action.payload.data.data;
    },
    listSentScheduledMails: () => {},
    listSentScheduledMailsSuccess: (state, action) => {
      state.listSentScheduledMails.status = action.payload.data.status;
      state.listSentScheduledMails.message = action.payload.data.message;
      state.listSentScheduledMails.data = action.payload.data.data;
    },
    listSentScheduledMailsFailure: (state, action) => {
      state.listSentScheduledMails.status = action.payload.data.status;
      state.listSentScheduledMails.message = action.payload.data.message;
      state.listSentScheduledMails.data = action.payload.data.data;
    },
  },
});

export const { name, actions, reducer } = mailSlice;
