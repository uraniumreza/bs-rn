import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import BagItem from '../components/BagItem';

const mapStateToProps = state => ({
  bag: state.bag,
});

class Bag extends Component {
  static navigationOptions = {
    title: 'Your Bag',
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { bag } = this.props;

    return (
      <View>
        <FlatList
          contentContainerStyle={{ paddingVertical: 15 }}
          data={bag}
          renderItem={({ item }) => <BagItem product={item} />}
          keyExtractor={item => item._id}
          numColumns={1}
        />
      </View>
    );
  }
}

export default connect(mapStateToProps)(Bag);
