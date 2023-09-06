import React from "react";
import { StyleSheet, View, type ViewStyle } from "react-native";

type Props = {
  color?: string;
  height?: number;
};

export const Divider: React.FC<Props> = (props) => {
  const style: ViewStyle = {
    backgroundColor: props.color,
    height: props.height,
  };
  return <View style={style} />;
};

Divider.defaultProps = {
  color: "#bbb",
  height: StyleSheet.hairlineWidth,
};

export default Divider;
