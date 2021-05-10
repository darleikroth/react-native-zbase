import React, { useRef, useState } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
  ViewStyle,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Color from "color";
import ActionButton from "./Button";

export interface SearchAndroidProps {
  /**
   * Title of header and hint for placeholder
   */
  title: string;
  /**
   * Tint color for the fields.
   */
  tintColor?: string;
  /**
   * Icon color.
   */
  iconColor?: string;
  /**
   * The color of the underlay that will show through when the touch is active.
   */
  underlayColor?: string;
  /**
   * If there is no `headerLeft` on toolbar, set this property to `false`.
   * Used to calculate dimensions. Default value is `true`.
   */
  hasHeaderLeft?: boolean;
  /**
   * If there is no `headerRight` on toolbar, set this property to `false`.
   * Used to calculate dimensions. Default value is `true`.
   */
  hasHeaderRight?: boolean;
  /**
   * Style for title.
   */
  titleStyle?: StyleProp<ViewStyle>;
  /**
   * Callback that is called when the text input's text changes.
   * Changed text is passed as an argument to the callback handler.
   */
  onChangeText?(text: string): void;
}

interface Props extends SearchAndroidProps {
  isSearchable: boolean;
  text: string;
  toggleSearchable(): void;
}

export const SearchAndroid: React.FC<Props> = (props) => {
  const screen = useWindowDimensions();

  const renderTitle = () => {
    const { title, tintColor, titleStyle, hasHeaderRight, hasHeaderLeft } =
      props;

    if (!props.isSearchable) {
      return (
        <Text style={[styles.title, { color: tintColor }, titleStyle]}>
          {title}
        </Text>
      );
    }

    let inputWid = screen.width - 80;

    if (hasHeaderLeft && hasHeaderRight) {
      inputWid = screen.width - (124 + 48);
    } else if (hasHeaderLeft) {
      inputWid = screen.width - 124;
    } else if (hasHeaderRight) {
      inputWid = screen.width - 110;
    }

    return (
      <TextInput
        value={props.text}
        placeholder={`Buscar ${title}`}
        placeholderTextColor={`${Color(tintColor).fade(0.46)}`}
        returnKeyType="done"
        autoCapitalize="none"
        onChangeText={props.onChangeText}
        underlineColorAndroid="transparent"
        selectTextOnFocus
        autoCorrect={false}
        autoFocus
        style={[styles.input, { color: tintColor, width: inputWid }]}
      />
    );
  };

  const renderSearchButton = () => {
    const search = props.isSearchable;
    const iconColor = props.iconColor;

    return (
      <ActionButton
        background={props.underlayColor}
        onPress={props.toggleSearchable}
        style={{ position: "absolute", right: 0 }}
      >
        <Icon name={search ? "close" : "magnify"} color={iconColor} size={24} />
      </ActionButton>
    );
  };

  const style = props.hasHeaderRight ? { marginRight: 48 } : undefined;

  return (
    <View style={[styles.container, style]}>
      {renderTitle()}
      {renderSearchButton()}
    </View>
  );
};

SearchAndroid.defaultProps = {
  title: "Título",
  tintColor: "white",
  iconColor: "white",
  hasHeaderLeft: false,
  hasHeaderRight: false,
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderRadius: 5,
    flex: 1,
    flexDirection: "row",
    height: 48,
  },
  title: {
    fontSize: 19,
    fontWeight: "500",
    textAlign: "left",
  },
  input: {
    height: 48,
    fontSize: 16,
  },
});

export default SearchAndroid;
