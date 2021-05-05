import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

type Props = {
  title?: string;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
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
