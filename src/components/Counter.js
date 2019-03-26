import React from 'react';
import { Text, View, Button } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from '../actions';
import CommonStyles from '../styles/CommonStyles';

const mapStateToProps = state => ({
  value: state.temporaryValue,
});

const Counter = (props) => {
  const { value, dispatch } = props;
  return (
    <View>
      <Text style={CommonStyles.instructions}>{value}</Text>
      <Button
        onPress={() => dispatch(actions.add(value))}
        title="Add value"
        color="#841584"
        accessibilityLabel="Add this value"
      />
    </View>
  );
};

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Counter);
