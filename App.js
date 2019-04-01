import React from 'react';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign';
import { Animated, Easing } from 'react-native';
import Theme from './src/styles/Theme';
import Cosmetics from './src/containers/Cosmetics';
import Electronics from './src/containers/Electronics';
import Accessories from './src/containers/Accessories';
import Login from './src/containers/Login';
import Profile from './src/containers/Profile';
import SplashScreen from './src/containers/SplashScreen';

const transitionConfig = () => ({
  transitionSpec: {
    duration: 500,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing,
    useNativeDriver: true,
  },
  screenInterpolator: (sceneProps) => {
    const { layout, position, scene } = sceneProps;

    const thisSceneIndex = scene.index;
    const width = layout.initWidth;

    const translateX = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex],
      outputRange: [width, 0],
    });

    return { transform: [{ translateX }] };
  },
});

const appStack = createMaterialBottomTabNavigator(
  {
    Cosmetics: {
      screen: Cosmetics,
      navigationOptions: {
        tabBarLabel: 'Cosmetics',
        tabBarIcon: ({ tintColor }) => <Icon name="slack" size={19} color={tintColor} />,
      },
    },

    Electronics: {
      screen: Electronics,
      navigationOptions: {
        tabBarLabel: 'Electronics',
        tabBarIcon: ({ tintColor }) => <Icon name="API" size={19} color={tintColor} />,
      },
    },

    Accessories: {
      screen: Accessories,
      navigationOptions: {
        tabBarLabel: 'Accessories',
        tabBarIcon: ({ tintColor }) => <Icon name="USB" size={19} color={tintColor} />,
      },
    },

    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: ({ tintColor }) => <Icon name="user" size={19} color={tintColor} />,
      },
    },
  },
  {
    shifting: false,
    labeled: true,
    activeColor: Theme.Primary,
    inactiveColor: Theme.Secondary,
    barStyle: {
      backgroundColor: '#fff',
    },
  },
);

const authStack = createSwitchNavigator(
  {
    Splash: {
      screen: SplashScreen,
      navigationOptions: {
        tabBarVisible: false,
      },
    },
    Login: {
      screen: Login,
      navigationOptions: {
        tabBarVisible: false,
      },
    },
    App: appStack,
  },
  {
    headerMode: 'none',
    mode: 'modal',
    transitionConfig,
  },
);

const App = createAppContainer(authStack);
export default App;
