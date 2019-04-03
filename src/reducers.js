import ACTION_TYPES from './constants/ActionTypes';

const initialState = {
  temporaryValue: 1,
  tokens: null,
  cart: [],
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

    case ACTION_TYPES.SET_TOKENS: {
      return {
        ...state,
        tokens: payload,
      };
    }
  }

  return state;
};

export default reducer;
