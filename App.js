import React from 'react';
import { Animated, Easing, Image } from 'react-native';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign';
import Theme from './src/styles/Theme';
import ProductsList from './src/containers/ProductsList';
import Login from './src/containers/Login';
import Profile from './src/containers/Profile';
import SplashScreen from './src/containers/SplashScreen';
import ProductDetail from './src/containers/ProductDetail';
import OrderDetail from './src/containers/OrderDetail';
import Bag from './src/containers/Bag';
import Orders from './src/containers/Orders';
import BagIcon from './src/components/BagIcon';
import styles from './src/styles/CommonStyles';
import BrandLogo from './assets/images/BS_Trading.png';

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

const homeTabs = createMaterialBottomTabNavigator(
  {
    Cosmetics: {
      screen: () => <ProductsList category="Cosmetics" />,
      navigationOptions: {
        tabBarLabel: 'Cosmetics',
        tabBarIcon: ({ tintColor }) => <Icon name="slack" size={19} color={tintColor} />,
      },
    },

    Electronics: {
      screen: () => <ProductsList category="Electronics" />,
      navigationOptions: {
        tabBarLabel: 'Electronics',
        tabBarIcon: ({ tintColor }) => <Icon name="API" size={19} color={tintColor} />,
      },
    },

    Accessories: {
      screen: () => <ProductsList category="Accessories" />,
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

const appStack = createStackNavigator(
  {
    homeTabs: {
      screen: homeTabs,
      navigationOptions: ({ navigation }) => ({
        headerTitle: <Image style={styles.headerImage} source={BrandLogo} />,
        headerRight: <BagIcon navigation={navigation} />,
      }),
    },
    ProductDetail,
    OrderDetail,
    Bag,
  },
  {
    headerMode: 'float',
    mode: 'modal',
    transitionConfig,
  },
);

const srStack = createStackNavigator(
  {
    Orders,
    OrderDetail,
  },
  {
    headerMode: 'float',
    mode: 'modal',
    transitionConfig,
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
    SR: srStack,
  },
  {
    headerMode: 'none',
    mode: 'modal',
    transitionConfig,
  },
);

const App = createAppContainer(authStack);
export default App;
