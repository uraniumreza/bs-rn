import React, { Component } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import theme from '../styles/Theme';
import commonStyles from '../styles/CommonStyles';

const { width } = theme;
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactNo: '',
      password: '',
    };
  }

  login = () => {
    const { navigation } = this.props;
    navigation.navigate('App');
  };

  render() {
    const { container } = commonStyles;
    const {
      header, credentialInput, loginButton, loginButtonText,
    } = styles;
    const { contactNo, password } = this.state;
    return (
      <View style={container}>
        <Text style={header}>LOGIN</Text>
        <TextInput
          style={credentialInput}
          onChangeText={text => this.setState({ contactNo: text })}
          value={contactNo}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          autoFocus
        />
        <TextInput
          style={credentialInput}
          onChangeText={text => this.setState({ password: text })}
          value={password}
          placeholder="Password"
          keyboardType="decimal-pad"
          textContentType="password"
          secureTextEntry
        />

        <TouchableOpacity style={loginButton} onPress={this.login}>
          <Text style={loginButtonText}>
            NEXT
            <Icon name="caretright" size={18} />
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 3,
    marginBottom: 10,
  },
  credentialInput: {
    height: 50,
    width: width * 0.85,
    borderColor: 'gray',
    borderRadius: 4,
    borderWidth: 0.5,
    marginTop: 20,
    textAlign: 'center',
  },
  loginButton: {
    position: 'absolute',
    bottom: 20,
    right: width * 0.075,
    marginTop: 20,
    height: 55,
  },
  loginButtonText: {
    fontSize: 19,
    fontWeight: '400',
    textAlign: 'left',
    letterSpacing: 1,
  },
});

export default Login;
