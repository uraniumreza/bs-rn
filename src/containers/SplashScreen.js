import React, { Component } from 'react';
import {
  View, Text, Image, StyleSheet,
} from 'react-native';
import commonStyles from '../styles/CommonStyles';
import theme from '../styles/Theme';
import logoImage from '../../assets/images/BS_LOGO.png';

const { width } = theme;

class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { navigation } = this.props;
    setTimeout(() => {
      navigation.navigate('Login');
    }, 1000);
  }

  render() {
    const { container, welcome } = commonStyles;
    const { logo } = styles;
    return (
      <View style={container}>
        <Image style={logo} source={logoImage} />
        <Text style={welcome}>BARBER SALOON</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    width: width * 0.3,
    height: width * 0.3,
    resizeMode: 'contain',
  },
});

export default SplashScreen;
