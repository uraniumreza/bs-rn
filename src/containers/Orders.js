import React, { Component, Fragment } from 'react';
import {
  View, Text, StyleSheet, FlatList, ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import theme from '../styles/Theme';
import commonStyles from '../styles/CommonStyles';
import OrderThumbnail from '../components/OrderThumbnail';
import api from '../utils/API';

const { Secondary, width } = theme;

const mapStateToProps = state => ({
  user: state.user,
});

class Orders extends Component {
  static navigationOptions = {
    title: 'অর্ডার লিস্ট',
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      orders: [],
    };
  }

  componentDidMount() {
    this.getOrders();
  }

  onRefresh = async () => {
    await this.setState(() => ({ isLoading: true }));
    this.getOrders();
  };

  getOrders = () => {
    api.get('/orders').then((data) => {
      this.setState({ orders: data, isLoading: false });
    });
  };

  render() {
    const {
      user: { shopName, ownerName, address },
    } = this.props;
    const { orders, isLoading } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Text style={styles.shop}>{shopName}</Text>
          <Text style={styles.owner}>{ownerName}</Text>
          <Text style={styles.address}>{address}</Text>
        </View>
        <View style={styles.hr} />
        {isLoading && (
          <View style={commonStyles.container}>
            <ActivityIndicator size="large" color={Secondary} />
          </View>
        )}

        {orders.length > 0 && (
          <View>
            <Text style={commonStyles.welcome}>আপনার অর্ডারগুলো</Text>
            <FlatList
              contentContainerStyle={{ paddingVertical: 15 }}
              data={orders}
              onRefresh={() => this.onRefresh()}
              refreshing={isLoading}
              renderItem={({ item }) => <OrderThumbnail order={item} />}
              keyExtractor={order => order.order_id}
              numColumns={2}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: '100%',
  },
  profileContainer: {
    padding: 15,
  },
  shop: {
    fontSize: 30,
    color: '#444',
    fontWeight: 'bold',
  },
  owner: {
    width: width * 0.92,
    fontWeight: 'bold',
    marginTop: 3,
    lineHeight: 27,
    letterSpacing: 1.5,
    fontSize: 20,
    color: '#313131',
  },
  address: {
    width: width * 0.92,
    marginTop: 5,
    letterSpacing: 1.5,
    fontSize: 14,
    color: '#515151',
  },
  hr: {
    borderBottomColor: '#CCC',
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: width - 30,
    marginLeft: 15,
    marginVertical: 10,
  },
});

export default connect(mapStateToProps)(Orders);
