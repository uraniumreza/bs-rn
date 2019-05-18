import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';

const BagIcon = ({ bagLength, navigation }) => (
  <TouchableOpacity onPress={() => navigation.navigate('Bag')} style={styles.button}>
    <View
      hitSlop={{
        top: 30,
        bottom: 30,
        left: 30,
        right: 30,
      }}
    >
      <Icon name="shoppingcart" size={24} color="#616161" />
    </View>
    {bagLength > 0 && <View style={styles.badge} />}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
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

BagIcon.propTypes = {
  bagLength: PropTypes.number,
};

BagIcon.defaultProps = {
  bagLength: 0,
};

const mapStateToProps = state => ({
  bagLength: state.bag.length,
});

export default connect(mapStateToProps)(BagIcon);
