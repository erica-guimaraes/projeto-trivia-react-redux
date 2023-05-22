import {
  REQUEST_SAVE_NAME, REQUEST_SAVE_EMAIL,
} from './actionsTypes';

export const requestSaveEmail = (email) => ({
  type: REQUEST_SAVE_EMAIL,
  payload: email,
});

export const requestSaveName = (name) => ({
  type: REQUEST_SAVE_NAME,
  payload: name,
});
