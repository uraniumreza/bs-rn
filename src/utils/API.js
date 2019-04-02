import axios from 'axios';
import store from '../store';

function select(state) {
  return state.tokens.accessToken;
}

function listener() {
  const jwt = select(store.getState());
  axios.defaults.headers.common.Authorization = `Bearer ${jwt}`;
}

store.subscribe(listener);

const api = axios.create({
  baseURL: 'https://bstrading-api.herokuapp.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
