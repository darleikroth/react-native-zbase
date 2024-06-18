import React from "react";
import { StyleSheet, View, type ViewStyle } from "react-native";

type Props = {
  color?: string;
  height?: number;
};

export const Divider = (props: Props) => {
  const style: ViewStyle = {
    backgroundColor: props.color || "#bbb",
    height: props.height || StyleSheet.hairlineWidth,
  };
  return <View style={style} />;
};

export default Divider;
