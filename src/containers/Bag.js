import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import styles from '../styles/CommonStyles';

const mapStateToProps = state => ({
  bag: state.bag,
});

class Bag extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { bag } = this.props;
    const { container, welcome } = styles;
    console.log(bag);
    return (
      <View style={container}>
        <Text style={welcome}>BAG</Text>
      </View>
    );
  }
}

export default connect(mapStateToProps)(Bag);
