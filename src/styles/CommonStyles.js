import { StyleSheet } from 'react-native';

const CommonStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    position: 'relative',
  },
  welcome: {
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
    margin: 10,
    letterSpacing: 3,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default CommonStyles;
