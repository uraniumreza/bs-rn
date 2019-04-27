import AsyncStorage from '@react-native-community/async-storage';
import ACTION_TYPES from './constants/ActionTypes';

const initialState = {
  temporaryValue: 1,
  tokens: null,
  bag: [],
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

    case ACTION_TYPES.RESTORE_BAG: {
      console.log('INITIAL BAG', payload);
      return {
        ...state,
        bag: payload,
      };
    }

    case ACTION_TYPES.ADD_TO_BAG: {
      const newBag = [...bag, { ...payload, quantity: 1 }];

      AsyncStorage.setItem('BAG', JSON.stringify(newBag));
      return {
        ...state,
        bag: newBag,
      };
    }

    case ACTION_TYPES.REMOVE_FROM_BAG: {
      const newBag = bag.filter(b => b._id !== payload);

      AsyncStorage.setItem('BAG', JSON.stringify(newBag));
      return {
        ...state,
        bag: newBag,
      };
    }

    case ACTION_TYPES.CLEAR_BAG: {
      AsyncStorage.removeItem('BAG');
      return {
        ...state,
        bag: [],
      };
    }

    case ACTION_TYPES.UPDATE_QUANTITY: {
      const newBag = bag.map((b) => {
        if (b._id === payload.id) b.quantity = payload.quantity;
        return b;
      });

      AsyncStorage.setItem('BAG', JSON.stringify(newBag));
      return {
        ...state,
        bag: newBag,
      };
    }
  }

  return state;
};

export default reducer;
