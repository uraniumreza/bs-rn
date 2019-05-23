import React, { Component } from 'react';
import { View, ActivityIndicator, FlatList } from 'react-native';
import { connect } from 'react-redux';
import styles from '../styles/CommonStyles';
import NotificationThumbnail from '../components/NotificationThumbnail';
import { saveNotifications } from '../actions';
import theme from '../styles/Theme';
import api from '../utils/API';

const { Secondary } = theme;

class Notifications extends Component {
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
    const { container } = styles;
    const { isLoading } = this.state;
    const { notifications } = this.props;

    if (isLoading) {
      return (
        <View style={container}>
          <ActivityIndicator size="large" color={Secondary} />
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          contentContainerStyle={{ paddingVertical: 15 }}
          data={notifications}
          renderItem={({ item }) => <NotificationThumbnail notification={item} />}
          keyExtractor={item => item._id}
          onRefresh={this.getNotifications}
          refreshing={isLoading}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  notifications: state.notifications,
});

const mapDispatchToProps = { saveNotifications };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Notifications);
