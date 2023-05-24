import {
  REQUEST_ADD_SCORE_AND_ASSERTIONS,
  REQUEST_INCREMENT_OF_INDEX_PLAYER,
  REQUEST_RESET_STATE,
  REQUEST_SAVE_EMAIL, REQUEST_SAVE_NAME, REQUEST_TIME,
} from '../actions/actionsTypes';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  timer: 30,
  numberOfPlayer: 0,
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
  case REQUEST_INCREMENT_OF_INDEX_PLAYER:
    return {
      ...state,
      numberOfPlayer: state.numberOfPlayer + 1,
    };
  case REQUEST_RESET_STATE:
    return {
      ...state,
      score: 0,
      assertions: 0,
    };
  default:
    return state;
  }
};

export default player;
