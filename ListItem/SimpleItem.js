import React from 'react';
import {
  StyleSheet,
  ViewStyle,
  TextStyle,
  Platform,
  View,
  Text,
} from 'react-native';
import { TouchableView } from 'react-native-zbase';

type Props = {
  title: string;
  subtitle?: string;
  containerStyle?: ViewStyle;
  contentStyle?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
  /**
   * If true, disable all interactions for this component.
   */
  touchDisabled?: Boolean;
  onPress(): void;
  onLongPress(): void;
};

const ios = Platform.OS === 'ios';

const SimpleItem = React.memo((props: Props) => (
  <View style={[styles.container, props.containerStyle]} >
    <TouchableView
      disabled={props.touchDisabled}
      onPress={props.onPress}
      onLongPress={props.onLongPress} >
      <View style={[styles.content, props.contentStyle]} >
        <Text numberOfLines={1} style={[styles.title, props.titleStyle]} >
          {props.title}
        </Text>
        {!!props.subtitle && (
          <Text numberOfLines={2} style={[styles.subtitle, props.subtitleStyle]} >
            {props.subtitle}
          </Text>
        )}

      </View>
    </TouchableView>
  </View>
));

SimpleItem.defaultProps = {
  touchDisabled: false,
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  content: {
    padding: 16,
  },
  title: {
    color: 'rgba(0, 0, 0, .87)',
    fontSize: 16,
  },
  subtitle: {
    color: 'rgba(0, 0, 0, .54)',
    fontSize: 14,
  },
});

export default SimpleItem;
