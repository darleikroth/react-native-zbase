import React from "react";
import { Pressable, View, ViewStyle } from "react-native";

type Props = {
  /**
   * Background color of component
   */
  color?: string;
  /**
   * Background color of ripple effect (Android)
   */
  background?: string;
  /**
   * Number for the elevation effect (iOS and Android)
   */
  elevation?: number;
  /**
   * Mini size: Only used to create visual continuity with other screen elements
   */
  small?: boolean;
  /**
   * Function for the onPress event
   */
  onPress?(): void;
  /**
   * Custom styles for the component
   */
  containerStyle?: ViewStyle;
};

export const FloatButton: React.FC<Props> = (props) => {
  const {
    color = "#2196F3",
    elevation = 6,
    background = "#1A78C2",
    small = false,
    onPress,
    containerStyle,
    children,
  } = props;
  const size = small ? 40 : 56;

  const currentStyle: ViewStyle = {
    height: size,
    width: size,
    backgroundColor: color,
    borderRadius: size / 2,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowRadius: elevation * 0.75,
    shadowOffset: {
      height: elevation * 0.75,
      width: 0,
    },
    elevation: elevation,
  };

  const bg = containerStyle?.backgroundColor || currentStyle.backgroundColor;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        currentStyle,
        containerStyle,
        { backgroundColor: pressed ? background : bg },
      ]}
    >
      <View
        style={{
          height: size,
          width: size,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </View>
    </Pressable>
  );
};

export default FloatButton;
