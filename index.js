import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { AppRegistry, Platform, UIManager } from 'react-native';

import { name as appName } from './app.json';
import store from './src/store';
import App from './App';

class AppWithStore extends Component {
  constructor(props) {
    super(props);

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental
        && UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

AppRegistry.registerComponent(appName, () => AppWithStore);
