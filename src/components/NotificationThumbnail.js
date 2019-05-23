import React from 'react';
import {
  View, Text, Image, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import theme from '../styles/Theme';

const { width } = theme;

const NotificationThumbnail = ({
  notification: {
    _id, message, createdAt, image: banner,
  },
}) => {
  const {
    container, messageText, date, image,
  } = styles;

  return (
    <View style={container} key={_id}>
      {banner && <Image source={{ uri: banner }} style={image} />}
      <Text style={messageText} numberOfLines={2}>
        {message}
      </Text>
      <Text style={date}>{new Date(createdAt).toDateString()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.94,
    padding: 10,
    paddingBottom: 20,
    marginBottom: width * 0.035,
    marginLeft: width * 0.03,
    backgroundColor: '#ffffff',
    borderWidth: 0.5,
    borderRadius: 4,
    borderColor: '#c7ea46',
    elevation: 3,
    position: 'relative',
  },
  image: {
    margin: -10,
    marginBottom: 10,
    width: width * 0.94,
    height: (width * 0.94) / 2,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    resizeMode: 'cover',
  },
  messageText: {
    fontSize: 14,
    color: '#161925',
  },
  date: {
    fontSize: 10,
    position: 'absolute',
    color: '#8d021f',
    right: 10,
    bottom: 7,
  },
});

NotificationThumbnail.propTypes = {
  notification: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }).isRequired,
};

export default withNavigation(NotificationThumbnail);
