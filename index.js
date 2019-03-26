import React from 'react';
import { Provider } from 'react-redux';
import { AppRegistry } from 'react-native';

import { name as appName } from './app.json';
import store from './src/store';
import App from './App';

const AppWithStore = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => AppWithStore);
