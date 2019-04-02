import ACTION_TYPES from './constants/ActionTypes';

export const add = value => ({
  type: ACTION_TYPES.ADD,
  payload: value,
});

export const setTokens = tokens => ({
  type: ACTION_TYPES.SET_TOKENS,
  payload: tokens,
});
