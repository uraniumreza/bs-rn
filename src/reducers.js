import ACTION_TYPES from './constants/ActionTypes';

const initialState = {
  temporaryValue: 1,
  tokens: null,
  bag: [1],
};

const reducer = (state = initialState, action) => {
  const { bag } = state;
  const { type, payload } = action;

  switch (type) {
    case ACTION_TYPES.SET_TOKENS: {
      return {
        ...state,
        tokens: payload,
      };
    }

    case ACTION_TYPES.ADD_TO_BAG: {
      return {
        ...state,
        bag: [...bag, { ...payload, quantity: 1 }],
      };
    }

    case ACTION_TYPES.REMOVE_FROM_BAG: {
      return {
        ...state,
        bag: bag.filter(b => b._id !== payload),
      };
    }

    case ACTION_TYPES.UPDATE_QUANTITY: {
      return {
        ...state,
        bag: bag.map((b) => {
          if (b._id === payload.id) {
            b.quantity = payload.quantity;
          }
          return b;
        }),
      };
    }
  }
  console.log(state);
  return state;
};

export default reducer;
