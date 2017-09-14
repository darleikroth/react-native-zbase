import React from 'react';
import {
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
} from 'react-native';

const TouchableView = props =>
{
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

module.exports = TouchableView;
