import React, { Component } from 'react';
import {
  View, Text, ToastAndroid, StyleSheet, Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import theme from '../styles/Theme';
import { updateQuantity, removeFromBag } from '../actions';

const { width } = theme;

const mapDispatchToProps = { removeFromBag, updateQuantity };

class QuantityController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: props.quantity,
    };
  }

  handleQuantity = async (mode) => {
    const {
      stock, id, updateQuantity, removeFromBag, hideQuantity,
    } = this.props;
    const { quantity } = this.state;

    if (mode === 'plus' && stock > quantity) {
      this.setState(prevState => ({
        quantity: prevState.quantity + 1,
      }));
      updateQuantity(id, quantity + 1);
    } else if (mode === 'minus' && quantity > 0) {
      if (quantity - 1 === 0) {
        Alert.alert(
          'REMOVE FROM BAG',
          'Are you sure?',
          [
            {
              text: 'NO',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'YES',
              onPress: async () => {
                await removeFromBag(id);
                this.setState(prevState => ({
                  quantity: prevState.quantity - 1,
                }));
                if (hideQuantity) hideQuantity();
              },
            },
          ],
          { cancelable: false },
        );
      } else {
        updateQuantity(id, quantity - 1);
        this.setState(prevState => ({
          quantity: prevState.quantity - 1,
        }));
      }
    } else {
      ToastAndroid.show('STOCK LIMIT OVERFLOWED', ToastAndroid.SHORT);
    }
  };

  render() {
    const { quantity } = this.state;
    const { style } = this.props;

    return (
      <View style={[styles.quantityContainer, style]}>
        <Icon
          name="minuscircleo"
          size={23}
          color="#616161"
          hitSlop={{
            top: 10,
            bottom: 10,
            left: 10,
            right: 0,
          }}
          onPress={() => this.handleQuantity('minus')}
        />
        <Text style={styles.quantity}>{quantity}</Text>
        <Icon
          name="pluscircleo"
          size={23}
          color="#616161"
          hitSlop={{
            top: 10,
            bottom: 10,
            left: 0,
            right: 10,
          }}
          onPress={() => this.handleQuantity('plus')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
});

export default connect(
  null,
  mapDispatchToProps,
)(QuantityController);
