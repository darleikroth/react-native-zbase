import React from 'react'
import {
  TouchableNativeFeedbackProperties,
  TouchableOpacityProperties,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform
} from 'react-native'

interface TouchableProps extends TouchableNativeFeedbackProperties, TouchableOpacityProperties {
  /**
   * Background color ripple for Android.
   * If api version is less than 21, it uses `TouchableOpacity`.
   */
  background?: String;
  borderless: Boolean;
  children?: JSX.Element;
}

const TouchableView = (props: TouchableProps) => {
  if (Platform.OS === 'ios' || Platform.Version < 21) {
    return (
      <TouchableOpacity {...props} >
        {props.children}
      </TouchableOpacity>
    )
  }

  return (
    <TouchableNativeFeedback
      {...props}
      background={TouchableNativeFeedback.Ripple(props.background, props.borderless)} >
      {props.children}
    </TouchableNativeFeedback>
  )
}

TouchableView.defaultProps = {
  background: '#E0E0E0',
  borderless: true
}

export default TouchableView
