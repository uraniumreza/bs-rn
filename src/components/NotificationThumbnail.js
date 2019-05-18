import React from 'react';
import {
  View, Text, Image, StyleSheet, TouchableNativeFeedback, ToastAndroid,
} from 'react-native';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import theme from '../styles/Theme';

const { width } = theme;

const NotificationThumbnail = ({ navigation, notification: { id, message, createdAt } }) => {
  const { container, messageText, date } = styles;

  const navigateToProductDetail = () => {
    if (stockCount === 0) ToastAndroid.show('Sorry; this product is out of stock!', ToastAndroid.LONG);
    else navigation.navigate('ProductDetail', { productId: id });
  };

  return (
    <TouchableNativeFeedback onPress={navigateToProductDetail}>
      <View style={container}>
        {/* <Image
          source={{
            uri: productImage,
          }}
          style={image}
        /> */}
        <Text style={messageText} numberOfLines={2}>
          {message}
        </Text>
        {/* <View style={priceStockContainer}>
          <View style={priceContainer}>
            <Text style={price}>{originalPrice - discount}</Text>
            <Text style={taka}>{'\u09F3'}</Text>
          </View>
          {stockCount === 0 && <Text style={stockContainer}>STOCK OUT</Text>}
        </View> */}
        <Text style={date}>{new Date(createdAt).toDateString()}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.94,
    padding: 10,
    paddingBottom: 20,
    marginBottom: width * 0.035,
    marginLeft: width * 0.03,
    backgroundColor: '#ffffff',
    borderWidth: 0.5,
    borderRadius: 4,
    borderColor: '#c7ea46',
    elevation: 3,
    position: 'relative',
  },
  messageText: {
    fontSize: 14,
    color: '#161925',
  },
  date: {
    fontSize: 10,
    position: 'absolute',
    color: '#8d021f',
    right: 10,
    bottom: 7,
  },
});

NotificationThumbnail.propTypes = {
  notification: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }).isRequired,
};

export default withNavigation(NotificationThumbnail);
