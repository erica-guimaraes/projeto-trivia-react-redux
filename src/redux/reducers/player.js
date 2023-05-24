import {
  REQUEST_ADD_SCORE_AND_ASSERTIONS,
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
  case REQUEST_ADD_SCORE_AND_ASSERTIONS:
    return {
      ...state,
      score: state.score + action.payload,
      assertions: state.assertions + 1,
    };
  default:
    return state;
  }
};

export default player;
