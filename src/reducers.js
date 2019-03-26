import ACTION_TYPES from './constants/ActionTypes';

const initialState = {
  temporaryValue: 1,
};

const reducer = (state = initialState, action) => {
  const { temporaryValue } = state;
  const { type, payload } = action;

  switch (type) {
    case ACTION_TYPES.ADD: {
      return {
        ...state,
        temporaryValue: temporaryValue + payload,
      };
    }
  }

  return state;
};

export default reducer;
