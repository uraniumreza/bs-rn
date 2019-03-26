import React from 'react';
import { Text, View } from 'react-native';

import Counter from './src/components/Counter';
import CommonStyles from './src/styles/CommonStyles';

const App = () => (
  <View style={CommonStyles.container}>
    <Text style={CommonStyles.welcome}>BARBER SALOON</Text>
    <Counter />
  </View>
);

export default App;
