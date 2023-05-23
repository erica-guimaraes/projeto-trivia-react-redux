import {
  REQUEST_SAVE_NAME, REQUEST_SAVE_EMAIL, REQUEST_TIME,
} from './actionsTypes';

export const requestSaveEmail = (email) => ({
  type: REQUEST_SAVE_EMAIL,
  payload: email,
});

export const requestSaveName = (name) => ({
  type: REQUEST_SAVE_NAME,
  payload: name,
});

export const requestTime = (timer) => ({
  type: REQUEST_TIME,
  payload: timer,
});
