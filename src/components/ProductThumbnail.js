import React from 'react';
import {
  View, Text, Image, StyleSheet, TouchableNativeFeedback, ToastAndroid,
} from 'react-native';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import theme from '../styles/Theme';

const { width } = theme;

const ProductThumbnail = ({
  navigation,
  product: {
    id,
    image: productImage,
    name: productName,
    price: originalPrice,
    discount,
    stock_count: stockCount,
  },
}) => {
  const {
    container,
    image,
    name,
    priceContainer,
    price,
    discountPrice,
    taka,
    discountTaka,
    priceStockContainer,
    stockContainer,
  } = styles;

  const navigateToProductDetail = () => {
    if (stockCount === 0) ToastAndroid.show('Sorry; this product is out of stock!', ToastAndroid.LONG);
    else navigation.navigate('ProductDetail', { productId: id });
  };
  console.log(productName, originalPrice, discount);
  return (
    <TouchableNativeFeedback onPress={navigateToProductDetail}>
      <View style={container}>
        <Image
          source={{
            uri: productImage,
          }}
          style={image}
        />
        <Text style={name} numberOfLines={2}>
          {productName}
        </Text>
        <View style={priceStockContainer}>
          <View style={priceContainer}>
            <Text style={price}>{originalPrice - discount}</Text>
            <Text style={taka}>{'\u09F3'}</Text>
          </View>
          {discount > 0 && (
            <View style={priceContainer}>
              <Text style={discountPrice}>{originalPrice}</Text>
              <Text style={discountTaka}>{'\u09F3'}</Text>
            </View>
          )}
          {stockCount === 0 && <Text style={stockContainer}>STOCK OUT</Text>}
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.45,
    padding: 10,
    marginTop: width * 0.035,
    marginLeft: width * 0.033,
    backgroundColor: '#ffffff',
    borderWidth: 0.5,
    borderRadius: 4,
    borderColor: '#d5d6d9',
  },
  image: {
    width: width * 0.4,
    height: width * 0.4,
    resizeMode: 'contain',
  },
  name: {
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 14,
    color: '#161925',
  },
  priceStockContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  stockContainer: {
    fontSize: 11,
    fontWeight: '600',
    color: '#F00',
    textAlign: 'center',
    letterSpacing: 2,
    paddingTop: 3,
  },
  priceContainer: {
    flexDirection: 'row',
  },
  price: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: 'green',
  },
  discountPrice: {
    marginTop: 5,
    marginLeft: 5,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    textDecorationColor: 'red',
    color: 'red',
    fontSize: 12,
  },
  taka: {
    fontSize: 11,
    lineHeight: 20,
    color: 'green',
    fontWeight: 'bold',
  },
  discountTaka: {
    fontSize: 9,
    lineHeight: 20,
    color: 'red',
  },
});

ProductThumbnail.propTypes = {
  product: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    discount: PropTypes.number.isRequired,
  }).isRequired,
};

export default withNavigation(ProductThumbnail);
