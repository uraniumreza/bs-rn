import { ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import store from '../store';
import { setTokens, restoreUser } from '../actions';
import api from './API';

async function getFromAS(key) {
  try {
    const value = await AsyncStorage.getItem(key).then(val => val);
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (error) {
    ToastAndroid.show(`NO ${key} EXISTS!`, ToastAndroid.SHORT);
  }

  return null;
}

const setToAS = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    ToastAndroid.show(`ERROR IN SET ${key}!`, ToastAndroid.SHORT);
  }
};

const login = (phone, password) => {
  const data = {
    phone,
    password,
  };

  return api.post('/auth/login/', data).then(({ token, user }) => {
    setToAS('TOKEN', token);
    setToAS('USER', user);
    setToAS('AUTH', data);
    store.dispatch(setTokens(token));
    store.dispatch(restoreUser(user));

    return user;
  });
};

export { getFromAS, setToAS, login };
