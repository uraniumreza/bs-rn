import React from 'react';
import {
  View, Text, TouchableOpacity, Platform, StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/AntDesign';
import PropTypes from 'prop-types';

const Fab = (props) => {
  const { badge, style, navigation } = props;
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: badge > 0 ? '#FFC929' : '#DCDCDC',
          borderColor: badge > 0 ? '#FFC929' : '#AAA',
          bottom: 15,
        },
        style,
      ]}
      onPress={() => navigation.navigate('Bag')}
    >
      <Icon
        style={styles.icon}
        name="shoppingcart"
        size={25}
        color={badge > 0 ? '#000' : '#9A9A9A'}
      />
      {badge > 0 && (
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 20,
    width: 55,
    height: 55,
    borderRadius: 30,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      android: {
        elevation: 4,
      },
      ios: {
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
      },
    }),
  },
  icon: {
    marginTop: 5,
  },
  badgeContainer: {
    backgroundColor: '#F95555',
    width: 25,
    height: 25,
    borderRadius: 50,
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    right: -5,
    top: 0,
  },
  badgeText: {
    color: '#FFF',
  },
});

Fab.propTypes = {
  badge: PropTypes.number,
};

Fab.defaultProps = {
  badge: 0,
};

const mapStateToProps = state => ({
  badge: state.bag.length,
});

export default withNavigation(connect(mapStateToProps)(Fab));
