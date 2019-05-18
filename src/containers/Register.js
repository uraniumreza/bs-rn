import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  ToastAndroid,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { register } from '../utils/AuthService';
import theme from '../styles/Theme';

const { Secondary, width } = theme;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ownerName: undefined,
      phone: undefined,
      shopName: undefined,
      address: undefined,
      password: undefined,
      confirmPassword: undefined,
      signedupBy: undefined,
      errors: {},
      isBusy: false,
    };
  }

  register = async () => {
    const {
      phone,
      password,
      confirmPassword,
      shopName,
      ownerName,
      address,
      errors,
      signedupBy,
    } = this.state;
    const { navigation } = this.props;
    await this.setState({ isBusy: true });

    const newErrors = { ...errors };
    newErrors.ownerName = !ownerName;
    newErrors.phone = !phone;
    newErrors.shopName = !shopName;
    newErrors.address = !address;
    newErrors.password = !password;
    newErrors.confirmPassword = !confirmPassword;

    if (password !== confirmPassword) {
      newErrors.password = true;
      newErrors.confirmPassword = true;
      this.setState({ password: undefined, confirmPassword: undefined });
      ToastAndroid.show('পাসওয়ার্ড ও পুনরায় পাসওয়ার্ড একই হতে হবে', ToastAndroid.SHORT);
    }

    await this.setState({ errors: newErrors });

    if (!Object.values(newErrors).includes(true)) {
      let userData = {
        phone,
        password,
        confirmPassword,
        shopName,
        ownerName,
        address,
        errors,
        signedupBy,
      };
      if (signedupBy) userData = { ...userData, signedupBy };

      try {
        await register(userData);
      } catch (error) {
        console.log(error);
      }

      await this.setState({ isBusy: true });
      navigation.navigate('App');
    }
  };

  render() {
    const {
      container,
      scrollContainer,
      header,
      credentialInput,
      loginButton,
      loginButtonText,
      error,
    } = styles;
    const {
      phone,
      password,
      confirmPassword,
      signedupBy,
      shopName,
      ownerName,
      address,
      isBusy,
      errors,
    } = this.state;

    return (
      <KeyboardAvoidingView style={container}>
        <ScrollView style={{ marginBottom: 55 }} contentContainerStyle={scrollContainer}>
          <Text style={header}>রেজিস্টার</Text>
          <View>
            <TextInput
              style={credentialInput}
              onChangeText={text => this.setState(() => ({ ownerName: text }))}
              value={ownerName}
              placeholder="নাম"
            />
            {errors.ownerName && <Text style={error}>&#9888; আপনার নাম দেয়া বাধ্যতামূলক</Text>}
          </View>

          <View>
            <TextInput
              style={credentialInput}
              onChangeText={text => this.setState(() => ({ phone: text }))}
              value={phone}
              placeholder="ফোন নাম্বার"
              maxLength={11}
              keyboardType="phone-pad"
              textContentType="telephoneNumber"
            />
            {errors.phone && <Text style={error}>&#9888; আপনার ফোন নাম্বার দেয়া বাধ্যতামূলক</Text>}
          </View>

          <View>
            <TextInput
              style={credentialInput}
              onChangeText={text => this.setState(() => ({ shopName: text }))}
              value={shopName}
              placeholder="দোকানের নাম"
            />
            {errors.shopName && (
              <Text style={error}>&#9888; আপনার দোকানের নাম দেয়া বাধ্যতামূলক</Text>
            )}
          </View>

          <View>
            <TextInput
              style={credentialInput}
              onChangeText={text => this.setState(() => ({ address: text }))}
              value={address}
              placeholder="দোকানের ঠিকানা"
            />
            {errors.address && (
              <Text style={error}>&#9888; আপনার দোকানের ঠিকানা দেয়া বাধ্যতামূলক</Text>
            )}
          </View>

          <View>
            <TextInput
              style={credentialInput}
              onChangeText={text => this.setState({ password: text })}
              value={password}
              placeholder="পাসওয়ার্ড"
              keyboardType="decimal-pad"
              textContentType="password"
              secureTextEntry
            />
            {errors.password && <Text style={error}>&#9888; পাসওয়ার্ড দেয়া বাধ্যতামূলক</Text>}
          </View>

          <View>
            <TextInput
              style={credentialInput}
              onChangeText={text => this.setState({ confirmPassword: text })}
              value={confirmPassword}
              placeholder="পুনরায় পাসওয়ার্ড দিন"
              keyboardType="decimal-pad"
              textContentType="password"
              secureTextEntry
            />
            {errors.confirmPassword && (
              <Text style={error}>&#9888; পুনরায় পাসওয়ার্ড দেয়া বাধ্যতামূলক</Text>
            )}
          </View>

          <TextInput
            style={[credentialInput, { marginBottom: 25 }]}
            onChangeText={text => this.setState({ signedupBy: text })}
            value={signedupBy}
            placeholder="SR এর ফোন নাম্বার (অপশনাল) "
            maxLength={11}
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
          />
        </ScrollView>
        <TouchableOpacity style={styles.buttonContainer} onPress={this.register}>
          <View style={loginButton}>
            {isBusy ? (
              <ActivityIndicator size="large" color="#FFF" />
            ) : (
              <Text style={loginButtonText}>পরবর্তী ধাপে যান</Text>
            )}
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    paddingTop: 30,
  },
  scrollContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    width,
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.Primary,
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  header: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 3,
    marginBottom: 10,
  },
  credentialInput: {
    height: 50,
    width: width * 0.9,
    borderColor: 'gray',
    borderRadius: 4,
    borderWidth: 0.5,
    marginTop: 15,
    paddingLeft: 15,
  },
  error: {
    fontSize: 12,
    color: 'red',
  },
  loginButton: {
    marginTop: 20,
    height: 55,
  },
  loginButtonText: {
    fontSize: 20,
    lineHeight: 30,
    fontWeight: '400',
    textAlign: 'left',
    letterSpacing: 1,
    color: '#FFF',
  },
});

export default Login;
