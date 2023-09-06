import React from "react";
import {
  Platform,
  type StyleProp,
  StyleSheet,
  Text,
  type TextStyle,
  View,
  type ViewStyle,
} from "react-native";

type Props = {
  title?: string;
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
};

const ios = Platform.OS === "ios";

export const Subtitle: React.FC<Props> = (props) => {
  return (
    <View style={[styles.container, props.containerStyle]}>
      <Text style={[styles.title, props.titleStyle]}>
        {props.title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    paddingHorizontal: 16,
    justifyContent: "center",
    backgroundColor: "white",
  },
  title: {
    color: "rgba(0, 0, 0, .54)",
    fontSize: 14,
    fontWeight: ios ? "600" : "500",
  },
});

export default Subtitle;
