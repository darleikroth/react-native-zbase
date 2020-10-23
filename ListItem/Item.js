import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { TouchableView } from 'react-native-zbase';

type Props = {
  /**
   * Determines what the opacity of the wrapped view should be when touch is active. Defaults to `0.3`.
   */
  activeOpacity: Number;
  /**
   * Item's primary text. It is `isRequired`.
   */
  title: string;
  /**
   * Item's secondary text.
   */
  subtitle?: string;
  /**
   * Item's 3 lines text.
   */
  text?: string;
  /**
   * Expects a React Element. Rendered at the item's start/left. It is `isRequired`.
   */
  iconLeft: Element;
  /**
   * Expects a React Element. Rendered at the item's start/right.
   */
  iconRight: Element;
  /**
   * Used to truncate the text with an ellipsis after computing the text layout,
   * including line wrapping, such that the total number of lines does not exceed this number.
   * The default is `1`.
   */
  titleNumberOfLines?: number;
  /**
   * Used to truncate the text with an ellipsis after computing the text layout,
   * including line wrapping, such that the total number of lines does not exceed this number.
   * The default is `1`.
   */
  subtitleNumberOfLines?: number;
  /**
   * If true, disable all interactions for this component.
   */
  touchDisabled?: Boolean;
  /**
   * Item parent's styles.
   */
  containerStyle?: ViewStyle;
  /**
   * Item contents styles.
   */
  contentStyle?: ViewStyle;
  /**
   * Styles of the `title` property.
   */
  titleStyle?: TextStyle;
  /**
   * Styles of the `subtitle` property.
   */
  subtitleStyle?: TextStyle;
  /**
   * Styles of the `divider` property.
   */
  dividerStyle?: ViewStyle;
  /**
   * If `true` a line element (divider) will be rendered at the bottom of the item.
   * The default is `false`.
   */
  divider?: boolean;
  /**
   * Set `true` to disable the touchable feedback and change the color to disabled styles.
   */
  disabled?: boolean;
  /**
   * Called when the touch is released.
   */
  onPress(): void;
  /**
   * Called when the long press is released.
   */
  onLongPress(): void;
};

const Item = React.memo((props: Props) => {
  const {
    activeOpacity,
    containerStyle,
    contentStyle,
    disabled,
    divider,
    dividerStyle,
    iconLeft,
    iconRight,
    subtitle,
    subtitleNumberOfLines,
    subtitleStyle,
    text,
    title,
    titleNumberOfLines,
    titleStyle,
    onPress,
    onLongPress,
  } = props;

  return (
    <>
      <View style={[styles.container, containerStyle]} >
        <Pressable
          android_disableSound
          onPress={onPress}
          disabled={props.touchDisabled}
          onLongPress={onLongPress}
          style={({ pressed }) => [
            styles.content,
            contentStyle,
            { opacity: pressed ? activeOpacity : 1 }
          ]}
        >
          <View style={[styles.icon, {left: 0}]} >
            {iconLeft}
          </View>
          {!!iconRight && (
            <View style={[styles.icon, {right: 0, width: 48}]} >
              {iconRight}
            </View>
          )}

          <View style={[styles.titleContainer, {marginRight: !iconRight ? 16 : 54}]} >
            <Text
              style={[
                styles.title,
                titleStyle,
                disabled ? {color: 'rgba(0, 0, 0, .38)'} : undefined,
              ]}
              numberOfLines={titleNumberOfLines} >
              {title}
            </Text>
            {!!subtitle && (
              <Text
                style={[
                  styles.subtitle,
                  subtitleStyle,
                  disabled ? {color: 'rgba(0, 0, 0, .38)'} : undefined,
                ]}
                numberOfLines={subtitleNumberOfLines} >
                {subtitle}
              </Text>
            )}
            {!!text && (
              <Text
                style={[
                  styles.subtitle,
                  subtitleStyle,
                  disabled ? {color: 'rgba(0, 0, 0, .38)'} : undefined,
                ]}
                numberOfLines={1} >
                {text}
              </Text>
            )}
          </View>
        </Pressable>
      </View>
      {!!divider && (<View style={[styles.divider, dividerStyle]} />)}
    </>
  );
});

Item.defaultProps = {
  activeOpacity: 0.4,
  divider: false,
  subtitleNumberOfLines: 1,
  titleNumberOfLines: 1,
  touchDisabled: false,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    height: 72,
  },
  content: {
    flexDirection: 'row',
    height: 72,
  },
  titleContainer: {
    height: 72,
    marginLeft: 72,
    justifyContent: 'center',
  },
  title: {
    color: 'rgba(0, 0, 0, .87)',
    fontSize: 16,
  },
  subtitle: {
    color: 'rgba(0, 0, 0, .54)',
    fontSize: 14,
    marginTop: 1,
  },
  icon: {
    width: 72,
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, .12)',
  },
});

export default Item;
