import React from 'react';
import { View, StyleSheet } from 'react-native';

const Indicators = ({ total, activeIndex = 1 }) => (
  <View style={styles.container}>
    {new Array(total)
      .fill(null)
      .map((p, index) => (activeIndex === index ? (
        <View key={index.toString()} style={[styles.indicator, styles.active]} />
      ) : (
        <View key={index.toString()} style={[styles.indicator, styles.inactive]} />
      )))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 18,
    paddingHorizontal: 5,
    borderRadius: 30,
    backgroundColor: 'rgba(229,229,229, 0.4)',
  },
  indicator: {
    height: 10,
    width: 10,
    borderRadius: 5,
    margin: 4.5,
  },
  active: {
    backgroundColor: '#FFC929',
  },
  inactive: {
    backgroundColor: 'rgba(255, 255, 255, .47)',
  },
});

export default Indicators;
