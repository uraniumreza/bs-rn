import ACTION_TYPES from './constants/ActionTypes';

const actions = {
  add: value => ({
    type: ACTION_TYPES.ADD,
    payload: value,
  }),
};

export default actions;
