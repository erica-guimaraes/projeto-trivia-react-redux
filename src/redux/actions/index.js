import {
  REQUEST_SAVE_NAME, REQUEST_SAVE_EMAIL, REQUEST_TIME, REQUEST_ADD_SCORE,
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

export const requestAddScore = (score) => ({
  type: REQUEST_ADD_SCORE,
  payload: score,
});
