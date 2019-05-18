import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ToastAndroid,
  ActivityIndicator,
  TouchableNativeFeedback,
} from 'react-native';
import { connect } from 'react-redux';
import BagItem from '../components/BagItem';
import api from '../utils/API';
import theme from '../styles/Theme';
import commonStyles from '../styles/CommonStyles';
import { clearBag } from '../actions';

const {
  width, Primary, Secondary, Green,
} = theme;

const mapStateToProps = state => ({
  bag: state.bag,
});

const mapDispatchToProps = { clearBag };

class Bag extends Component {
  static navigationOptions = {
    title: 'Your Bag',
  };

  constructor(props) {
    super(props);
    this.state = {
      isBusy: false,
    };
  }

  calculateTotal = () => {
    const { bag } = this.props;
    let totalPrice = 0;
    bag.map((item) => {
      totalPrice += (item.price - item.discount) * item.quantity;
    });

    return totalPrice;
  };

  placeOrder = async () => {
    const { bag, clearBag, navigation } = this.props;
    await this.setState(() => ({ isBusy: true }));
    const data = [];
    bag.map(item => data.push({ product_id: item._id, ordered_quantity: item.quantity }));
    api.post('/orders', { products: data }).then(async () => {
      await clearBag();
      await this.setState(() => ({ isBusy: false }));
      navigation.navigate('Profile');
      ToastAndroid.show('Successfully placed order!', ToastAndroid.LONG);
    });
  };

  render() {
    const { bag } = this.props;
    const { isBusy } = this.state;
    const { container } = commonStyles;

    if (isBusy) {
      return (
        <View style={container}>
          <ActivityIndicator size="large" color={Secondary} />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={{ paddingVertical: 15 }}
          data={bag}
          renderItem={({ item }) => <BagItem product={item} />}
          keyExtractor={item => item._id}
          numColumns={1}
        />
        <TouchableNativeFeedback onPress={this.placeOrder}>
          <View style={styles.buttonContainer}>
            <Text style={styles.button}>{` ORDER (TOTAL: ${this.calculateTotal()})`}</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: '100%',
  },
  buttonContainer: {
    width,
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Green,
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  button: {
    fontSize: 19,
    lineHeight: 30,
    fontWeight: '600',
    textAlign: 'center',
    margin: 10,
    color: '#FFF',
    letterSpacing: 3,
  },
  quantityContainer: {
    width: width * 0.3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantity: {
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
    margin: 10,
    letterSpacing: 1.5,
  },
  label: {
    width: width * 0.45,
    fontSize: 19,
    lineHeight: 30,
    fontWeight: '600',
    textAlign: 'right',
    margin: 10,
    color: '#FFF',
    letterSpacing: 2,
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Bag);
