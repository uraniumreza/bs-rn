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
import { setTokens, restoreBag, restoreUser } from '../actions';

const { width, Primary, Secondary } = theme;
const mapDispatchToProps = { setTokens, restoreBag, restoreUser };

// TODO: AsyncStorage MultiSet and MultiGet

class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phase: 1,
    };
  }

  componentDidMount() {
    getFromAS('TOKEN').then(async (data) => {
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

        this.loadFromAS();
      }
    });
  }

  loadFromAS = () => {
    const { restoreBag, restoreUser } = this.props;
    getFromAS('BAG').then(async (bag) => {
      if (bag) {
        await restoreBag(bag);
      }
    });
    getFromAS('USER').then(async (user) => {
      if (user) {
        await restoreUser(user);
        if (user.role === 'sales') this.navigate('SR');
        else this.navigate('App');
      }
    });
  };

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
          <Text style={welcome}>SALOON GALLERY</Text>
        ) : (
          <View style={buttonContainer}>
            <TouchableOpacity
              style={[button, { backgroundColor: Primary }]}
              onPress={() => this.navigate('Register')}
            >
              <Text style={buttonText}>রেজিস্টার</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[button, { backgroundColor: Secondary }]}
              onPress={() => this.navigate('Login')}
            >
              <Text style={buttonText}>লগ ইন</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    width: width * 0.45,
    height: width * 0.45,
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
