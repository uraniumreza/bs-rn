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

class Profile extends Component {
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

  getOrders = async () => {
    await this.setState(() => ({ isLoading: true }));
    api.get('/orders').then((data) => {
      this.setState({ orders: data, isLoading: false });
    });
  };

  renderEmptyView = () => <Text style={commonStyles.welcome}>আপনার কোন অর্ডার নেই</Text>;

  renderProfileInfo = () => {
    const {
      user: { shopName, ownerName, address },
    } = this.props;
    const { orders } = this.state;

    return (
      <View>
        <Text style={styles.shop}>{shopName}</Text>
        <Text style={styles.owner}>{ownerName}</Text>
        <Text style={styles.address}>{address}</Text>
        <View style={styles.hr} />
        {orders.length > 0 && <Text style={commonStyles.welcome}>আপনার সব অর্ডার</Text>}
      </View>
    );
  };

  renderContactUs = () => (
    <Fragment>
      <View style={styles.hr} />
      <View style={{ paddingBottom: 20 }}>
        <Text style={commonStyles.welcome}>যোগাযোগ</Text>
        <Text style={styles.bsName}>R K SHARKAR BAPPY</Text>
        <Text style={styles.bsTitle}>General Manager</Text>
        <Text style={styles.bsTitle}>01772784263</Text>
        <Text style={styles.bsTitle}>bstradingbd@yahoo.com</Text>
        <Text style={styles.bsTitle}>facebook.com/BSTradingBD</Text>
        <Text style={styles.bsTitle}>Hazi Muslim Market, 23, Ali Hossain Road</Text>
        <Text style={styles.bsTitle}>Shop 4, Moulovi Bazar, Dhaka-1100</Text>
      </View>
    </Fragment>
  );

  render() {
    const { orders, isLoading } = this.state;

    if (isLoading) {
      return (
        <View style={commonStyles.container}>
          <ActivityIndicator size="large" color={Secondary} />
        </View>
      );
    }
    return (
      <FlatList
        contentContainerStyle={{ paddingVertical: 15 }}
        data={orders}
        renderItem={({ item }) => <OrderThumbnail order={item} />}
        ListEmptyComponent={this.renderEmptyView()}
        ListFooterComponent={this.renderContactUs()}
        ListHeaderComponent={this.renderProfileInfo()}
        keyExtractor={order => order.order_id}
        numColumns={2}
        onRefresh={this.getOrders}
        refreshing={isLoading}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: '100%',
  },
  shop: {
    fontSize: 30,
    color: '#444',
    fontWeight: 'bold',
    textAlign: 'right',
    marginRight: 15,
  },
  owner: {
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 3,
    lineHeight: 27,
    letterSpacing: 1.5,
    fontSize: 20,
    color: '#313131',
    marginRight: 15,
  },
  address: {
    marginTop: 5,
    textAlign: 'right',
    letterSpacing: 1.5,
    fontSize: 14,
    color: '#515151',
    marginRight: 15,
  },
  hr: {
    borderBottomColor: '#CCC',
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: width - 30,
    marginLeft: 15,
    marginVertical: 10,
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
});

export default connect(mapStateToProps)(Profile);
