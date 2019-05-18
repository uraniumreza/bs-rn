import React, { Component } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableNativeFeedback,
} from 'react-native';
import { connect } from 'react-redux';
import commonStyles from '../styles/CommonStyles';
import theme from '../styles/Theme';
import OrderItem from '../components/OrderItem';
import api from '../utils/API';

const {
  Secondary, width, COLORS, Green,
} = theme;

const mapStateToProps = state => ({ user: state.user });

class OrderDetail extends Component {
  static navigationOptions = () => ({
    title: 'অর্ডার ডিটেইল',
  });

  state = {
    isBusy: false,
  };

  confirmDelivery = async () => {
    const { navigation } = this.props;
    const { id } = navigation.getParam('order', null);

    await this.setState(() => ({ isBusy: true }));

    api.patch(`/orders/${id}`, { state: 'Delivered' }).then(() => {
      this.setState(() => ({ isBusy: false }));
      navigation.navigate('Profile');
    });
  };

  render() {
    const { isBusy } = this.state;
    const { navigation, user } = this.props;
    const order = navigation.getParam('order', null);

    if (isBusy) {
      return (
        <View style={commonStyles.container}>
          <ActivityIndicator size="large" color={Secondary} />
        </View>
      );
    }

    return (
      <ScrollView
        contentContainerStyle={{
          alignItems: 'flex-start',
        }}
        style={styles.scrollableContainer}
      >
        {user.role === 'sales' && (
          <View style={{ width: theme.width }}>
            <Text style={commonStyles.welcome}>কাস্টমারের ঠিকানা</Text>
            <Text style={styles.bsName}>{order.user.shopName}</Text>
            <Text style={styles.bsTitle}>{order.user.ownerName}</Text>
            <Text style={styles.bsTitle}>{order.user.phone}</Text>
            <Text style={styles.bsTitle}>{order.user.address}</Text>
            <View style={styles.hr} />
          </View>
        )}
        <View style={styles.header}>
          <Text style={commonStyles.welcome}>{`ID - ${order.order_id}`}</Text>
          <View style={styles.row}>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>{order.total_price}</Text>
              <Text style={styles.taka}>{'\u09F3'}</Text>
            </View>
            <Text style={styles.date}>{new Date(order.createdAt).toDateString()}</Text>
            <Text style={[styles.state, { color: COLORS[order.state] }]}>{order.state}</Text>
          </View>
        </View>
        <FlatList
          contentContainerStyle={{ paddingVertical: 15 }}
          data={order.products}
          renderItem={({ item }) => <OrderItem product={item} />}
          keyExtractor={item => item.product_id}
          numColumns={1}
        />
        {order.state === 'Processing' && user.role !== 'sales' && (
          <TouchableNativeFeedback onPress={this.confirmDelivery}>
            <View style={styles.buttonContainer}>
              <Text style={styles.button}>অর্ডার রিসিভ করেছি</Text>
            </View>
          </TouchableNativeFeedback>
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollableContainer: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#FFF',
    position: 'relative',
    paddingHorizontal: width * 0.04,
  },
  header: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  date: {
    fontWeight: '400',
    fontSize: 15,
    color: Secondary,
  },
  state: {
    fontWeight: '200',
    fontStyle: 'italic',
    fontSize: 15,
  },
  priceContainer: {
    flexDirection: 'row',
  },
  price: {
    marginTop: 5,
    fontSize: 15,
    fontWeight: '500',
    color: Secondary,
  },
  taka: {
    fontSize: 11,
    lineHeight: 20,
    fontWeight: '500',
    color: Secondary,
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
    marginLeft: -16,
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
  bsName: {
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'left',
    marginHorizontal: 15,
    letterSpacing: 3,
    color: '#4C516D',
  },
  bsTitle: {
    fontSize: 15,
    textAlign: 'left',
    marginHorizontal: 15,
    color: '#4C516D',
  },
  hr: {
    borderBottomColor: '#CCC',
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: width - 30,
    marginLeft: 15,
    marginVertical: 15,
  },
});

export default connect(mapStateToProps)(OrderDetail);
