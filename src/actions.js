import ACTION_TYPES from './constants/ActionTypes';

export const setTokens = tokens => ({
  type: ACTION_TYPES.SET_TOKENS,
  payload: tokens,
});

export const restoreBag = bag => ({
  type: ACTION_TYPES.RESTORE_BAG,
  payload: bag,
});

export const restoreUser = user => ({
  type: ACTION_TYPES.RESTORE_USER,
  payload: user,
});

export const addToBag = product => ({
  type: ACTION_TYPES.ADD_TO_BAG,
  payload: product,
});

export const removeFromBag = id => ({
  type: ACTION_TYPES.REMOVE_FROM_BAG,
  payload: id,
});

export const clearBag = id => ({
  type: ACTION_TYPES.CLEAR_BAG,
  payload: id,
});

export const updateQuantity = (id, quantity) => ({
  type: ACTION_TYPES.UPDATE_QUANTITY,
  payload: { id, quantity },
});
