import React from 'react';
import { View, StyleSheet } from 'react-native';

type Props = {
  color: String;
  height: Number;
};

const Divider = (props: Props) => {
  const style = {
    backgroundColor: props.color,
    height: props.height,
  };
  return (
    <View style={style} />
  );
};

Divider.defaultProps = {
  color: '#bbb',
  height: StyleSheet.hairlineWidth,
};

export default Divider;
