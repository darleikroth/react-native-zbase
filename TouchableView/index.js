import React from 'react';
import {
  TouchableNativeFeedbackProperties,
  TouchableOpacityProperties,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
} from 'react-native';

interface TouchableProps extends TouchableNativeFeedbackProperties, TouchableOpacityProperties {
  /**
   * Background color ripple for Android.
   * If api version is less than 21, it uses `TouchableOpacity`.
   */
  background?: string;
  children?: any;
}

type Props = TouchableProps;

class TouchableView extends React.Component
{
  props: Props;

  render()
  {
    const props = this.props;

    if (Platform.OS === 'ios' || Platform.Version < 21) {
      return (
        <TouchableOpacity {...props} >
          {props.children}
        </TouchableOpacity>
      );
    }

    return (
      <TouchableNativeFeedback
        {...props}
        background={TouchableNativeFeedback.Ripple(props.background, true)}
      >
        {props.children}
      </TouchableNativeFeedback>
    );
  }
}

TouchableView.defaultProps = {
  background: '#E0E0E0',
};

export default TouchableView;
