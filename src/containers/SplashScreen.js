import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, Image, StyleSheet, LayoutAnimation, TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import commonStyles from '../styles/CommonStyles';
import theme from '../styles/Theme';
import { getFromAS } from '../utils/AuthService';
import logoImage from '../../assets/images/BS_LOGO.png';
import { setTokens } from '../actions';

const { width, Primary, Secondary } = theme;
const mapDispatchToProps = { setTokens };

class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phase: 1,
    };
  }

  componentDidMount() {
    getFromAS('ATH').then(async (data) => {
      if (!data) {
        setTimeout(() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
          this.setState({ phase: 2 });
        }, 1500);
      } else {
        await getFromAS('TOKEN').then((value) => {
          const { setTokens } = this.props;
          setTokens(value);
        });
        this.navigate('App');
      }
    });
  }

  navigate = (screen) => {
    const { navigation } = this.props;
    navigation.navigate(screen);
  };

  render() {
    const { container, welcome } = commonStyles;
    const {
      logo, buttonContainer, button, buttonText,
    } = styles;
    const { phase } = this.state;

    return (
      <View style={container}>
        <Image style={logo} source={logoImage} />
        {phase === 1 ? (
          <Text style={welcome}>BARBER SALOON</Text>
        ) : (
          <View style={buttonContainer}>
            <TouchableOpacity
              style={[button, { backgroundColor: Primary }]}
              onPress={() => this.navigate('Login')}
            >
              <Text style={buttonText}>REGISTER</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[button, { backgroundColor: Secondary }]}
              onPress={() => this.navigate('Login')}
            >
              <Text style={buttonText}>LOGIN</Text>
            </TouchableOpacity>
          </View>
        )}
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
  buttonContainer: {
    width: width * 0.75,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.35,
    height: 55,
    borderRadius: 30,
  },
  buttonText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#FFF',
    fontSize: 15,
    fontWeight: '500',
    letterSpacing: 1.5,
  },
});

SplashScreen.propTypes = {
  setTokens: PropTypes.func.isRequired,
};

export default connect(
  null,
  mapDispatchToProps,
)(SplashScreen);
