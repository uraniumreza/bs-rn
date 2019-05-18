import React, { Component } from 'react';
import { View, ActivityIndicator, FlatList } from 'react-native';
import styles from '../styles/CommonStyles';
import NotificationThumbnail from '../components/NotificationThumbnail';
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
      notifications: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    this.getNotifications();
  }

  getNotifications = async () => {
    await this.setState({ isLoading: true });
    const url = '/notifications';
    api.get(url).then((data) => {
      this.setState({ notifications: data, isLoading: false });
    });
  };

  render() {
    const { container } = styles;
    const { isLoading, notifications } = this.state;

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
          keyExtractor={item => item.id}
          numColumns={2}
          onRefresh={this.getProducts}
          refreshing={isLoading}
        />
      </View>
    );
  }
}

export default Notifications;
