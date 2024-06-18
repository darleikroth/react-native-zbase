import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";

type Props = {
  activeOpacity?: number;
  title?: string | Element;
  subtitle?: string | Element;
  titleNumberOfLines?: number;
  containerStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  subtitleStyle?: StyleProp<TextStyle>;
  rightStyle?: StyleProp<ViewStyle>;
  /**
   * If true, disable all interactions for this component.
   */
  touchDisabled?: boolean;
  onPress?(): void;
  onLongPress?(): void;
  right?(): JSX.Element | undefined;
};

export const SimpleItem = (props: Props) => {

  const activeOpacity = props.activeOpacity ?? 0.4;
  const titleNumberOfLines = props.titleNumberOfLines ?? 1;
  const touchDisabled = props.touchDisabled ?? false;

  const renderContent = () => (
    <>
      <View style={styles.flexContent}>
        <Text
          numberOfLines={titleNumberOfLines}
          style={[styles.title, props.titleStyle]}
        >
          {props.title}
        </Text>
        {!!props.subtitle && (
          <Text
            numberOfLines={2}
            style={[styles.subtitle, props.subtitleStyle]}
          >
            {props.subtitle}
          </Text>
        )}
      </View>
      {!!props.right && (
        <View style={[styles.right, props.rightStyle]}>
          {props.right()}
        </View>
      )}
    </>
  );

  return (
    <Pressable
      android_disableSound
      disabled={touchDisabled}
      onPress={props.onPress}
      onLongPress={props.onLongPress}
      style={({ pressed }) => [
        styles.container,
        props.containerStyle,
        { opacity: pressed ? activeOpacity : 1 },
      ]}
    >
      <View style={[styles.content, props.contentStyle]}>
        {renderContent()}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    justifyContent: "center",
    height: 56,
  },
  content: {
    flexDirection: "row",
  },
  flexContent: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    color: "rgba(0, 0, 0, .87)",
    fontSize: 16,
  },
  subtitle: {
    color: "rgba(0, 0, 0, .54)",
    fontSize: 14,
  },
  right: {
    alignItems: "center",
    justifyContent: "center",
    width: 48,
  },
});

export default SimpleItem;
