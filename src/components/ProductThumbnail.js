import React from 'react';
import {
  View, Text, Image, StyleSheet, TouchableNativeFeedback,
} from 'react-native';
import theme from '../styles/Theme';

const { width } = theme;

const ProductThumbnail = (props) => {
  const {
    container, image, name, priceContainer, price, taka,
  } = styles;
  return (
    <TouchableNativeFeedback>
      <View style={container}>
        <Image
          source={{
            uri: 'https://images-na.ssl-images-amazon.com/images/I/41PDBY-5cfL._UL900_.jpg',
          }}
          style={image}
        />
        <Text style={name} numberOfLines={2}>
          Conair Infiniti Pro Dryer, DC Motor/Salon Performance Styling Tool
        </Text>
        <View style={priceContainer}>
          <Text style={price}>300</Text>
          <Text style={taka}>{'\u09F3'}</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.45,
    padding: 10,
    marginBottom: width * 0.03,
    backgroundColor: '#ffffff',
    borderWidth: 0.5,
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
  priceContainer: {
    flexDirection: 'row',
  },
  price: {
    marginTop: 5,
    fontSize: 14,
    color: '#444',
  },
  taka: {
    fontSize: 11,
    lineHeight: 20,
    color: '#333',
  },
});

export default ProductThumbnail;
