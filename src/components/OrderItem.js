import React from 'react';
import {
  View, Text, Image, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import theme from '../styles/Theme';

import QuantityController from './QuantityController';

const { width } = theme;

const OrderItem = ({
  product: {
    final_quantity: quantiy, image: productImage, name: productName, price: finalPrice,
  },
}) => {
  const {
    container, image, name, priceContainer, price, taka, priceStockContainer,
  } = styles;

  return (
    <View>
      <View style={container}>
        <Image
          source={{
            uri: productImage,
          }}
          style={image}
        />
        <View>
          <Text style={name}>{productName}</Text>
          <View style={priceStockContainer}>
            <View style={priceContainer}>
              <Text style={price}>{finalPrice}</Text>
              <Text style={taka}>{'\u09F3'}</Text>
            </View>
          </View>
          <Text style={styles.name}>{`x${quantiy}`}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.92,
    padding: 10,
    marginBottom: width * 0.035,
    backgroundColor: '#ffffff',
    borderWidth: 0.5,
    borderColor: '#d5d6d9',
    flexDirection: 'row',
  },
  image: {
    width: width * 0.3,
    height: width * 0.3,
    resizeMode: 'contain',
  },
  name: {
    width: width * 0.6,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#161925',
  },
  priceContainer: {
    flexDirection: 'row',
  },
  price: {
    marginTop: 5,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#444',
  },
  taka: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: 'bold',
    color: '#333',
  },
});

OrderItem.propTypes = {
  product: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    final_quantity: PropTypes.number.isRequired,
  }).isRequired,
};

export default OrderItem;
