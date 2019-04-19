import { StyleSheet } from 'react-native';

const CommonStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    position: 'relative',
  },
  scrollableContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
    backgroundColor: '#FFF',
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
  headerImage: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
    marginLeft: 15,
  },
  headerButton: {
    marginRight: 15,
    position: 'relative',
  },
  badge: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#52C41A',
    position: 'absolute',
    top: 0,
    right: -2,
  },
});

export default CommonStyles;
