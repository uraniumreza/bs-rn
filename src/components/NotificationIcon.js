import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const NotificationIcon = ({ navigation }) => (
  <TouchableOpacity onPress={() => navigation.navigate('Notifications')} style={styles.button}>
    <View
      hitSlop={{
        top: 30,
        bottom: 30,
        left: 30,
        right: 30,
      }}
    >
      <Icon name="notification" size={24} color="#616161" />
    </View>
    <View style={styles.badge} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    marginRight: 15,
    position: 'relative',
  },
  badge: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#52C41A',
    position: 'absolute',
    top: 8,
    left: -5,
  },
});

export default NotificationIcon;
