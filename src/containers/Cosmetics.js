import React, { Component } from 'react';
import { View, ActivityIndicator, FlatList } from 'react-native';
import styles from '../styles/CommonStyles';
import ProductThumbnail from '../components/ProductThumbnail';
import theme from '../styles/Theme';
import api from '../utils/API';

const { Secondary } = theme;
class Cosmetics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    const url = '/products/?category=Cosmetics';
    api.get(url).then(data => this.setState({ products: data, isLoading: false }));
  }

  render() {
    const { container } = styles;
    const { isLoading, products } = this.state;
    console.log(products);

    if (isLoading) {
      return (
        <View style={container}>
          <ActivityIndicator size="large" color={Secondary} />
        </View>
      );
    }
    return (
      <FlatList
        contentContainerStyle={{ paddingVertical: 15 }}
        data={products}
        renderItem={({ item }) => <ProductThumbnail product={item} />}
        keyExtractor={item => item.id}
        numColumns={2}
      />
    );
  }
}

export default Cosmetics;
