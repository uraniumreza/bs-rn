import React from 'react';
import {
  View, Text, StyleSheet, TouchableNativeFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import theme from '../styles/Theme';

const { width, Primary, COLORS } = theme;

const OrderThumbnail = ({ navigation, order: { order_id: orderId, state }, order }) => {
  const navigateToOrderDetail = () => {
    navigation.navigate('OrderDetail', { order });
  };

  return (
    <TouchableNativeFeedback onPress={navigateToOrderDetail}>
      <View style={styles.container}>
        <Text style={styles.name} numberOfLines={2}>
          অর্ডার নং
          {'\n'}
          {orderId}
        </Text>
        <Text style={[styles.state, { color: COLORS[state] }]}>{state}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.45,
    padding: 10,
    marginBottom: width * 0.035,
    marginLeft: width * 0.033,
    backgroundColor: '#ffffff',
    borderWidth: 0.5,
    borderColor: '#d5d6d9',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#555',
  },
  state: {
    position: 'absolute',
    top: 10,
    right: 10,
    fontWeight: '200',
    fontStyle: 'italic',
    fontSize: 10,
  },
});

OrderThumbnail.propTypes = {
  order: PropTypes.shape({
    order_id: PropTypes.number.isRequired,
    state: PropTypes.string.isRequired,
  }).isRequired,
};

export default withNavigation(OrderThumbnail);
