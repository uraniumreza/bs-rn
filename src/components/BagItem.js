import React from 'react';
import {
  View, Text, Image, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import theme from '../styles/Theme';

import QuantityController from './QuantityController';

const { width } = theme;

const BagItem = ({
  product: {
    _id,
    image: productImage,
    name: productName,
    price: originalPrice,
    discount,
    stock_count: stockCount,
    quantity,
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
              <Text style={price}>{originalPrice - discount}</Text>
              <Text style={taka}>{'\u09F3'}</Text>
            </View>
          </View>
          <QuantityController
            style={{ marginTop: 15 }}
            id={_id}
            stock={stockCount}
            quantity={quantity}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.935,
    padding: 10,
    marginBottom: width * 0.035,
    marginLeft: width * 0.033,
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

BagItem.propTypes = {
  product: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    discount: PropTypes.number.isRequired,
  }).isRequired,
};

export default BagItem;
