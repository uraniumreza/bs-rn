import React, { Component, Fragment } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  LayoutAnimation,
  ToastAndroid,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/AntDesign';
import theme from '../styles/Theme';
import { addToBag, updateQuantity } from '../actions';

const { width, Primary } = theme;

const mapDispatchToProps = { addToBag, updateQuantity };

class AddToBag extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isQuantityVisible: false,
      quantity: 1,
    };
  }

  showQuantity = async () => {
    const { addToBag, product } = this.props;
    await addToBag(product);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    this.setState({ isQuantityVisible: true });
  };

  handleQuantity = (mode) => {
    const {
      product: { stock_count: stock, _id },
      updateQuantity,
    } = this.props;
    const { quantity } = this.state;

    if (mode === 'plus' && stock > quantity) {
      this.setState(prevState => ({
        quantity: prevState.quantity + 1,
      }));
      updateQuantity(_id, quantity + 1);
    } else if (mode === 'minus') {
      this.setState(prevState => ({
        quantity: prevState.quantity - 1,
      }));
      updateQuantity(_id, quantity - 1);
    } else {
      ToastAndroid.show('STOCK LIMIT OVERFLOWED', ToastAndroid.SHORT);
    }
  };

  render() {
    const { isQuantityVisible, quantity } = this.state;

    return (
      <TouchableNativeFeedback onPress={this.showQuantity}>
        <View style={styles.container}>
          {isQuantityVisible && (
            <Fragment>
              <View style={styles.quantityContainer}>
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
              <Text style={styles.label}>QUANTITY</Text>
            </Fragment>
          )}
          {!isQuantityVisible && <Text style={styles.button}>ADD TO BAG</Text>}
        </View>
      </TouchableNativeFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width,
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -width * 0.04,
    backgroundColor: Primary,
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
  null,
  mapDispatchToProps,
)(AddToBag);
