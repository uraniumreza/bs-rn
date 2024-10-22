import React, { Component } from 'react';
import {
  View, Text, ActivityIndicator, Image, StyleSheet, ScrollView,
} from 'react-native';
import commonStyles from '../styles/CommonStyles';
import api from '../utils/API';
import theme from '../styles/Theme';
import AddToBag from '../components/AddToBag';
import NotificationIcon from '../components/NotificationIcon';

const { Secondary, width } = theme;

class ProductDetail extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: <NotificationIcon navigation={navigation} />,
  });

  constructor(props) {
    super(props);
    this.state = {
      product: undefined,
      isLoading: true,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const productId = navigation.getParam('productId', null);
    if (productId) {
      api
        .get(`/products/${productId}`)
        .then(data => this.setState({ product: data, isLoading: false }));
    }
  }

  render() {
    const { container } = commonStyles;
    const {
      scrollableContainer,
      productContainer,
      image,
      name,
      description,
      allPriceContainer,
      priceContainer,
      price,
      taka,
      discountPrice,
      discountTaka,
      color,
    } = styles;
    const { isLoading, product } = this.state;

    if (isLoading) {
      return (
        <View style={container}>
          <ActivityIndicator size="large" color={Secondary} />
        </View>
      );
    }

    return (
      <View style={scrollableContainer}>
        <ScrollView style={productContainer}>
          <Image source={{ uri: product.image }} style={image} />
          <Text style={name}>{product.name}</Text>
          <View style={allPriceContainer}>
            <View style={priceContainer}>
              <Text style={price}>{product.price - product.discount}</Text>
              <Text style={taka}>{'\u09F3'}</Text>
            </View>
            {product.discount > 0 && (
              <View style={priceContainer}>
                <Text style={discountPrice}>{product.price}</Text>
                <Text style={discountTaka}>{'\u09F3'}</Text>
              </View>
            )}
          </View>
          <Text style={description}>{`${product.description}\n`}</Text>
          {product.color && <Text style={color}>{`Color: ${product.color}`}</Text>}
        </ScrollView>
        {product && <AddToBag product={product} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollableContainer: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: '#FFF',
    position: 'relative',
  },
  productContainer: {
    paddingTop: 10,
    paddingHorizontal: width * 0.04,
    marginBottom: 55,
  },
  image: {
    width: width * 0.92,
    height: width * 0.92,
    resizeMode: 'contain',
  },
  name: {
    fontWeight: 'bold',
    marginTop: 15,
    lineHeight: 27,
    letterSpacing: 1.5,
    fontSize: 21,
    color: '#313131',
  },
  description: {
    paddingTop: 10,
    letterSpacing: 1.5,
    fontSize: 15,
    color: '#515151',
  },
  allPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  price: {
    marginTop: 5,
    fontSize: 30,
    color: 'green',
    fontWeight: 'bold',
  },
  discountPrice: {
    marginTop: 5,
    marginLeft: 12,
    fontSize: 22,
    color: 'red',
    fontWeight: 'bold',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    textDecorationColor: 'red',
  },
  taka: {
    fontSize: 16,
    lineHeight: 30,
    color: 'green',
    fontWeight: 'bold',
  },
  discountTaka: {
    fontSize: 12,
    lineHeight: 30,
    color: 'red',
    fontWeight: 'bold',
  },
  color: {
    letterSpacing: 1.5,
    fontSize: 16,
    color: '#515151',
    marginBottom: 50,
  },
});

export default ProductDetail;
