import React from "react";
import {
  Pressable,
  type StyleProp,
  StyleSheet,
  View,
  type ViewStyle,
} from "react-native";

interface Props {
  /**
   * Background color ripple for Android
   */
  background?: string;
  /**
   * If true, disable all interactions for this component.
   */
  touchDisabled?: boolean;
  /**
   * Define de container style
   */
  style?: StyleProp<ViewStyle>;
  /**
   * An image or icon element
   */
  children: JSX.Element;
  /**
   * Called when the touch is released
   */
  onPress?(): void;
}

export const Button: React.FC<Props> = (props) => (
  <Pressable
    disabled={props.touchDisabled}
    onPress={props.onPress}
    style={({ pressed }) => [
      styles.iconButtonHeader,
      props.style,
      pressed && { backgroundColor: props.background },
    ]}
  >
    <View style={styles.iconHeader}>
      {props.children}
    </View>
  </Pressable>
);

Button.defaultProps = {
  touchDisabled: false,
};

const styles = StyleSheet.create({
  iconButtonHeader: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  iconHeader: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Button;
