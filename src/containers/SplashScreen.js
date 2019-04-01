import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/CommonStyles';

class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { navigation } = this.props;
    setTimeout(() => {
      navigation.navigate('App');
    }, 2000);
  }

  render() {
    const { container, welcome } = styles;
    return (
      <View style={container}>
        <Text style={welcome}>SPLASH SCREEN</Text>
      </View>
    );
  }
}

export default SplashScreen;
