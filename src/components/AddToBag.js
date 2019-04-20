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
import { addToBag, removeFromBag, updateQuantity } from '../actions';
import QuantityController from './QuantityController';

const { width, Primary } = theme;

const mapStateToProps = state => ({
  bag: state.bag,
});

const mapDispatchToProps = { addToBag, removeFromBag, updateQuantity };

class AddToBag extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isQuantityVisible: false,
      quantity: 0,
    };
  }

  componentWillMount = async () => {
    const { bag, product } = this.props;

    await bag.forEach((item) => {
      if (item._id === product._id) {
        this.setState({
          isQuantityVisible: true,
          quantity: item.quantity,
        });
      }
    });
  };

  showQuantity = async () => {
    const { addToBag, product } = this.props;
    await addToBag(product);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    this.setState({ isQuantityVisible: true });
  };

  hideQuantity = async () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    this.setState({ isQuantityVisible: false });
  };

  render() {
    const { isQuantityVisible, quantity } = this.state;
    const {
      product: { stock_count: stockCount, _id },
    } = this.props;

    if (isQuantityVisible) {
      return (
        <TouchableNativeFeedback>
          <View style={styles.container}>
            <QuantityController
              stock={stockCount}
              id={_id}
              quantity={quantity}
              hideQuantity={this.hideQuantity}
            />
            <Text style={styles.label}>QUANTITY</Text>
          </View>
        </TouchableNativeFeedback>
      );
    }

    return (
      <TouchableNativeFeedback onPress={this.showQuantity}>
        <View style={styles.container}>
          <Text style={styles.button}>ADD TO BAG</Text>
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

AddToBag.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string,
    stock_count: PropTypes.number,
  }).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddToBag);