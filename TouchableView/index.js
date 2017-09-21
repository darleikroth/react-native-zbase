import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
} from 'react-native';

class TouchableView extends React.Component
{
  render()
  {
    const props = this.props;

    if (Platform.OS === 'ios') {
      return (
        <TouchableOpacity
          {...props}
          onPress={props.onPress}
        >
          {props.children}
        </TouchableOpacity>
      );
    }
  
    return (
      <TouchableNativeFeedback
        {...props}
        background={TouchableNativeFeedback.Ripple(props.background || '#E0E0E0', true)}
        onPress={props.onPress}
      >
        {props.children}
      </TouchableNativeFeedback>
    );
  }
}

TouchableView.propsType = {
  onPress: PropTypes.func,
  background: PropTypes.string,
};

module.exports = TouchableView;
