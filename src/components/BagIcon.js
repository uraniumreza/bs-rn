import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  bagLength: state.bag.length,
});

const BagIcon = ({ bagLength, navigation }) => (
  <TouchableOpacity onPress={() => navigation.navigate('Bag')} style={styles.button}>
    <Icon name="shoppingcart" size={23} color="#616161" />
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

export default connect(mapStateToProps)(BagIcon);
