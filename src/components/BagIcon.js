import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  cartLength: state.cart.length,
});

const BagIcon = ({ cartLength, navigation }) => (
  <TouchableOpacity onPress={() => navigation.navigate('Bag')} style={styles.button}>
    <Icon name="shoppingcart" size={23} color="#616161" />
    {cartLength > 0 && <View style={styles.badge} />}
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
  cartLength: PropTypes.number,
};

BagIcon.defaultProps = {
  cartLength: 0,
};

export default connect(mapStateToProps)(BagIcon);
