import React from 'react';
import {
  StyleSheet,
  ViewStyle,
  View,
} from 'react-native';
import { TouchableView } from 'react-native-zbase';

type Props = {
  /**
   * Background color ripple for Android
   */
  background?: string;
  /**
   * Define de container style
   */
  style: ViewStyle;
  /**
   * An image or icon element
   */
  children: any;
  /**
   * Called when the touch is released
   */
  onPress(fn: () => void): void;
};

class Button extends React.PureComponent
{
  props: Props;

  componentDidMount() {
    console.warn('Deprecated. This component will be removed in the future')
  }

  render()
  {
    return (
      <View style={[styles.iconButtonHeader, this.props.style]} >
        <TouchableView
          activeOpacity={0.5}
          background={this.props.background}
          onPress={this.props.onPress} >
          <View style={styles.iconHeader} >
            {this.props.children}
          </View>
        </TouchableView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  iconButtonHeader: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  iconHeader: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Button;
