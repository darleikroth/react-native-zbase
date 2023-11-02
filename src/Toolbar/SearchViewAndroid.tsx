import React from "react";
import {
  type StyleProp,
  StyleSheet,
  Text,
  TextInput,
  type TextStyle,
  View,
  type ViewStyle,
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
   * The string that will be rendered before text input has been entered.
   */
  placeholder?: string;
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
  const actionButtonStyle = React.useMemo<ViewStyle>(() => ({
    position: "absolute",
    right: 0,
    marginRight: props.hasHeaderRight ? -22 : -18,
  }), [props.hasHeaderRight]);

  const renderTitle = () => {
    const { title, tintColor, titleStyle } = props;
    const inputStyle: TextStyle = { color: tintColor, width: "100%" };

    if (!props.isSearchable) {
      return (
        <Text style={[styles.title, { color: tintColor }, titleStyle]}>
          {title}
        </Text>
      );
    }

    const placeholder = props.placeholder || title
      ? `Buscar ${title.toLowerCase()}`
      : "pesquisar";

    return (
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        autoFocus
        maxLength={100}
        onChangeText={props.onChangeText}
        placeholder={placeholder}
        placeholderTextColor={`${Color(tintColor).fade(0.46)}`}
        returnKeyType="done"
        selectTextOnFocus
        style={[styles.input, inputStyle]}
        underlineColorAndroid="transparent"
        value={props.text}
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
        style={actionButtonStyle}
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
  title: "Title",
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
    width: "100%",
  },
  title: {
    fontSize: 19,
    fontWeight: "500",
    textAlign: "left",
    width: "100%",
  },
  input: {
    height: 48,
    fontSize: 16,
  },
});

export default SearchAndroid;
