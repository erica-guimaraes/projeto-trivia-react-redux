import {
  REQUEST_SAVE_NAME, REQUEST_SAVE_EMAIL, REQUEST_TIME,
  REQUEST_ADD_SCORE_AND_ASSERTIONS, REQUEST_RESET_STATE,
  REQUEST_INCREMENT_OF_INDEX_PLAYER,
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

export const requestAddScoreAndAssertions = (score) => ({
  type: REQUEST_ADD_SCORE_AND_ASSERTIONS,
  payload: score,
});

export const requestIncrementOfIndexPlayer = () => ({
  type: REQUEST_INCREMENT_OF_INDEX_PLAYER,
});

export const requestResetState = () => ({
  type: REQUEST_RESET_STATE,
});
