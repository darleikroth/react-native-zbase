import React from "react";
import {
  Pressable,
  type StyleProp,
  StyleSheet,
  Text,
  type TextStyle,
  View,
  type ViewStyle,
} from "react-native";

type Props = {
  /**
   * Determines what the opacity of the wrapped view should be when touch is active. Defaults to `0.3`.
   */
  activeOpacity?: number;
  /**
   * Item's primary text. It is `isRequired`.
   */
  title?: string | Element;
  /**
   * Item's secondary text.
   */
  subtitle?: string | Element;
  /**
   * Item's 3 lines text.
   */
  text?: string | Element;
  /**
   * Expects a React Element. Rendered at the item's start/left. It is `isRequired`.
   */
  iconLeft?: any;
  /**
   * Expects a React Element. Rendered at the item's start/right.
   */
  iconRight?: any;
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
  touchDisabled?: boolean | null;
  /**
   * Item parent's styles.
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Item contents styles.
   */
  contentStyle?: StyleProp<ViewStyle>;
  /**
   * Styles of the `title` property.
   */
  titleStyle?: StyleProp<TextStyle>;
  /**
   * Styles of the `subtitle` property.
   */
  subtitleStyle?: StyleProp<TextStyle>;
  /**
   * Styles of the `divider` property.
   */
  dividerStyle?: StyleProp<ViewStyle>;
  /**
   * If `true` a line element (divider) will be rendered at the bottom of the item.
   * The default is `false`.
   */
  divider?: boolean;
  /**
   * Set `true` to disable the touchable feedback and change the color to disabled styles.
   */
  disabled?: boolean | null;
  /**
   * Called when the touch is released.
   */
  onPress?(): void;
  /**
   * Called when the long press is released.
   */
  onLongPress?(): void;
};

export const Item = (props: Props) => {
  const computedProps = React.useMemo(() => {
    return {
      ...props,
      activeOpacity: props.activeOpacity ?? 0.4,
      titleNumberOfLines: props.titleNumberOfLines ?? 1,
      subtitleNumberOfLines: props.subtitleNumberOfLines ?? 1,
      touchDisabled: props.touchDisabled ?? false,
      divider: props.divider ?? false,
    };
  }, [props]);

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
  } = computedProps;

  const titleContainerStyle: ViewStyle = {
    marginRight: !iconRight ? 16 : 54,
    marginLeft: !iconLeft ? 16 : 72,
  };
  const disabledColor = { color: "rgba(0, 0, 0, .38)" };

  return (
    <>
      <View style={[styles.container, containerStyle]}>
        <Pressable
          android_disableSound
          onPress={onPress}
          disabled={computedProps.touchDisabled}
          onLongPress={onLongPress}
          style={({ pressed }) => [
            styles.content,
            contentStyle,
            { opacity: pressed ? activeOpacity : 1 },
          ]}
        >
          {!!iconLeft && (
            <View style={[styles.icon, styles.iconLeft]}>
              {iconLeft}
            </View>
          )}
          {!!iconRight && (
            <View style={[styles.icon, styles.iconRight]}>
              {iconRight}
            </View>
          )}

          <View
            style={[styles.titleContainer, titleContainerStyle]}
          >
            <Text
              style={[
                styles.title,
                titleStyle,
                disabled ? disabledColor : undefined,
              ]}
              numberOfLines={titleNumberOfLines}
            >
              {title}
            </Text>
            {!!subtitle && (
              <Text
                style={[
                  styles.subtitle,
                  subtitleStyle,
                  disabled ? disabledColor : undefined,
                ]}
                numberOfLines={subtitleNumberOfLines}
              >
                {subtitle}
              </Text>
            )}
            {!!text && (
              <Text
                style={[
                  styles.subtitle,
                  subtitleStyle,
                  disabled ? disabledColor : undefined,
                ]}
                numberOfLines={1}
              >
                {text}
              </Text>
            )}
          </View>
        </Pressable>
      </View>
      {!!divider && <View style={[styles.divider, dividerStyle]} />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    justifyContent: "center",
    height: 72,
  },
  content: {
    flexDirection: "row",
    height: 72,
  },
  titleContainer: {
    height: 72,
    marginLeft: 72,
    justifyContent: "center",
  },
  title: {
    color: "rgba(0, 0, 0, .87)",
    fontSize: 16,
  },
  subtitle: {
    color: "rgba(0, 0, 0, .54)",
    fontSize: 14,
    marginTop: 1,
  },
  icon: {
    width: 72,
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  iconLeft: {
    left: 0,
  },
  iconRight: {
    right: 0,
    width: 48,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(0, 0, 0, .12)",
  },
});

export default Item;
