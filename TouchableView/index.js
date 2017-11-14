import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
} from 'react-native';

type Props = {
  /**
   * Background color ripple for Android.
   * If api version is less than 21, it uses `TouchableOpacity`.
   */
  background: string;
  /**
   * Called when the touch is released
   */
  onPress(fn: () => void): void;
};

class TouchableView extends React.Component
{
  props: Props;

  render()
  {
    const props = this.props;

    if (Platform.OS === 'ios' || Platform.Version < 21) {
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
        background={TouchableNativeFeedback.Ripple(props.background, true)}
        onPress={props.onPress}
      >
        {props.children}
      </TouchableNativeFeedback>
    );
  }
}

TouchableView.defaultProps = {
  background: '#E0E0E0',
};

module.exports = TouchableView;
