import React, { Component } from 'react';
import {
  View, ActivityIndicator, ScrollView, Image, StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import commonStyles from '../styles/CommonStyles';
import { saveNotifications } from '../actions';
import theme from '../styles/Theme';
import api from '../utils/API';

const { Secondary, width } = theme;

class Carousel extends Component {
  static navigationOptions = {
    title: 'বিজ্ঞাপন',
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
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

  render() {
    const { isLoading } = this.state;
    const { container } = commonStyles;
    const { notifications } = this.props;

    if (isLoading) {
      return (
        <View style={container}>
          <ActivityIndicator size="large" color={Secondary} />
        </View>
      );
    }

    return (
      <View style={styles.scrollContainer}>
        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
          {notifications.map(
            ({ image }) => image && <Image style={styles.image} source={{ uri: image }} />,
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    height: width / 2,
  },
  image: {
    width,
    height: width / 2,
    resizeMode: 'cover',
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
