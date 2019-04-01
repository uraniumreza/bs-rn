import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/CommonStyles';

class Electronics extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { container, welcome } = styles;
    return (
      <View style={container}>
        <Text style={welcome}>ELECTRONICS</Text>
      </View>
    );
  }
}

export default Electronics;
