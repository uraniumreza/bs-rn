import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import styles from '../styles/CommonStyles';
import api from '../utils/API';

import { Secondary } from '../styles/Theme';

class ProductDetail extends Component {
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
    const { container, welcome } = styles;
    const { isLoading, product } = this.state;

    if (isLoading) {
      return (
        <View style={container}>
          <ActivityIndicator size="large" color={Secondary} />
        </View>
      );
    }

    return (
      <View style={container}>
        <Text style={welcome}>PRODUCT OMUK TOMUK</Text>
      </View>
    );
  }
}

export default ProductDetail;
