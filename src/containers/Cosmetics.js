import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/CommonStyles';
import ProductThumbnail from '../components/ProductThumbnail';
import theme from '../styles/Theme';

const { width } = theme;
class Cosmetics extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { container, welcome } = styles;
    return (
      <View style={container}>
        <Text style={welcome}>COSMETICS</Text>
        <View
          style={{
            width: width * 0.93,
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <ProductThumbnail />
          <ProductThumbnail />
          <ProductThumbnail />
          <ProductThumbnail />
        </View>
      </View>
    );
  }
}

export default Cosmetics;
