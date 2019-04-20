import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import styles from '../styles/CommonStyles';
import BagItem from '../components/BagItem';

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

    return (
      <FlatList
        contentContainerStyle={{ paddingVertical: 15 }}
        data={bag}
        renderItem={({ item }) => <BagItem product={item} />}
        keyExtractor={item => item._id}
        numColumns={1}
      />
    );
  }
}

export default connect(mapStateToProps)(Bag);
