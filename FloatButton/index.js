import React from 'react';
import PropTypes from 'prop-types';
import { View, Platform, ViewStyle } from 'react-native';
import TouchableView from '../TouchableView';

type Props = {
  /**
   * Background color of component
   */
  color: string,
  /**
   * Background color of ripple effect (Android)
   */
  background: string,
  /**
   * Number for the elevation effect (iOS and Android)
   */
  elevation: number,
  /**
   * Mini size: Only used to create visual continuity with other screen elements
   */
  small: boolean,
  /**
   * Function for the onPress event
   */
  onPress: Function,
  /**
   * Custom styles for the component
   */
  containerStyle:  ViewStyle,
};

class FloatButton extends React.Component
{
  props: Props;

  render()
  {
    const {
      color,
      elevation,
      background,
      small,
      onPress,
      containerStyle,
      children
    } = this.props;
    const size = small ? 40 : 56;

    return (
      <View 
        style={[{
          height: size,
          width: size,
          backgroundColor: color,
          borderRadius: size / 2,
          shadowColor: 'black',
          shadowOpacity: 0.25,
          shadowRadius: elevation * .75,
          shadowOffset: { height: elevation * .75 },
          elevation: elevation,
        }, containerStyle]} >
        <TouchableView
          activeOpacity={0.5}
          background={background}
          onPress={onPress} >
          <View style={{ height: size, width: size, alignItems: 'center', justifyContent: 'center' }} >
            {children}
          </View>
        </TouchableView>
      </View>
    );
  }
}

FloatButton.propTypes = {
  /**
   * Background color of component
   */
  color: PropTypes.string,
  /**
   * Background color of ripple effect (Android)
   */
  background: PropTypes.string,
  /**
   * Number for the elevation effect (iOS and Android)
   */
  elevation: PropTypes.number,
  /**
   * Mini size: Only used to create visual continuity with other screen elements
   */
  small: PropTypes.bool,
  /**
   * Function for the onPress event
   */
  onPress: PropTypes.func,
  /**
   * Custom styles for the component
   */
  containerStyle:  View.propTypes.style,
};

FloatButton.defaultProps = {
  color: '#2196F3',
  elevation: 6,
  background: '#1A78C2',
  small: false,
};

module.exports = FloatButton;
