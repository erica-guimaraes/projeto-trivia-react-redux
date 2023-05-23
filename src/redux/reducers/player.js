import {
  REQUEST_SAVE_EMAIL, REQUEST_SAVE_NAME, REQUEST_TIME,
} from '../actions/actionsTypes';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  timer: 30,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_SAVE_NAME:
    return {
      ...state,
      name: action.payload,
    };
  case REQUEST_SAVE_EMAIL:
    return {
      ...state,
      gravatarEmail: action.payload,
    };
  case REQUEST_TIME:
    return {
      ...state,
      timer: action.payload,
    };
  default:
    return state;
  }
};

export default player;
