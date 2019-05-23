import React, { Component } from 'react';
import {
  View, ActivityIndicator, ScrollView, Image, StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import commonStyles from '../styles/CommonStyles';
import { saveNotifications } from '../actions';
import theme from '../styles/Theme';
import api from '../utils/API';
import Indicators from './Indicators';

const { Secondary, width } = theme;

class Carousel extends Component {
  static navigationOptions = {
    title: 'বিজ্ঞাপন',
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      currentPage: 0,
    };
  }

  componentDidMount() {
    this.getNotifications();
  }

  getNotifications = async () => {
    const { notifications, saveNotifications } = this.props;
    if (notifications.length === 0) await this.setState({ isLoading: true });
    const url = '/notifications';
    api.get(url).then(async (data) => {
      await saveNotifications(data);
      this.setState({ isLoading: false });
    });
  };

  handlePageChange = (e) => {
    const { currentPage } = this.state;
    const offset = e.nativeEvent.contentOffset;
    if (offset) {
      const page = Math.round(offset.x / width);
      if (page !== currentPage) {
        this.setState({ currentPage: page });
      }
    }
  };

  render() {
    const { container } = commonStyles;
    const { notifications } = this.props;
    const { isLoading, currentPage } = this.state;

    if (isLoading) {
      return (
        <View style={[container, { height: width / 2 }]}>
          <ActivityIndicator size="large" color={Secondary} />
        </View>
      );
    }

    const featuredNotifications = notifications.filter(
      notification => notification.image && notification,
    );

    if (featuredNotifications.length > 0) {
      return (
        <View style={styles.scrollContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            onMomentumScrollEnd={this.handlePageChange}
            showsHorizontalScrollIndicator={false}
          >
            {featuredNotifications.map(({ image, _id }) => (
              <Image key={_id} style={styles.image} source={{ uri: image }} />
            ))}
          </ScrollView>
          <View style={styles.indicators}>
            <Indicators total={featuredNotifications.length} activeIndex={currentPage} />
          </View>
        </View>
      );
    } return null;
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    height: width / 2,
    position: 'relative',
  },
  image: {
    width,
    height: width / 2,
    resizeMode: 'cover',
  },
  indicators: {
    position: 'absolute',
    bottom: width * 0.033,
    right: width * 0.033,
    zIndex: 10,
  },
});

const mapStateToProps = state => ({
  notifications: state.notifications,
});

const mapDispatchToProps = { saveNotifications };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Carousel);
