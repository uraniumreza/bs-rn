import React, { Component } from 'react';
import {
  View, Text, ActivityIndicator, Image, StyleSheet, ScrollView,
} from 'react-native';
import commonStyles from '../styles/CommonStyles';
import api from '../utils/API';
import theme from '../styles/Theme';
import AddToBag from '../components/AddToBag';
import BagIcon from '../components/BagIcon';

const { Secondary, width } = theme;

class ProductDetail extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: <BagIcon navigation={navigation} />,
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
      image,
      name,
      description,
      priceContainer,
      price,
      taka,
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
        <ScrollView style={{ marginBottom: 58 }}>
          <Image source={{ uri: product.image }} style={image} />
          <Text style={name}>{product.name}</Text>
          <View style={priceContainer}>
            <Text style={price}>{product.price - product.discount}</Text>
            <Text style={taka}>{'\u09F3'}</Text>
          </View>
          <Text style={description} numberOfLines={5}>
            {product.description}
          </Text>
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
    paddingTop: 10,
    backgroundColor: '#FFF',
    position: 'relative',
    marginHorizontal: width * 0.04,
  },
  image: {
    width: width * 0.92,
    height: width * 0.92,
    resizeMode: 'contain',
  },
  name: {
    width: width * 0.92,
    fontWeight: 'bold',
    marginTop: 15,
    lineHeight: 27,
    letterSpacing: 1.5,
    fontSize: 20,
    color: '#313131',
  },
  description: {
    width: width * 0.92,
    marginTop: 10,
    letterSpacing: 1.5,
    fontSize: 14,
    color: '#515151',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  price: {
    marginTop: 5,
    fontSize: 30,
    color: '#444',
    fontWeight: 'bold',
  },
  taka: {
    fontSize: 16,
    lineHeight: 30,
    color: '#333',
    fontWeight: 'bold',
  },
  color: {
    width: width * 0.92,
    marginTop: 10,
    letterSpacing: 1.5,
    fontSize: 15,
    color: '#515151',
  },
});

export default ProductDetail;
