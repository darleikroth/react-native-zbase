import React from "react";
import {
  Pressable,
  type StyleProp,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
  type ViewStyle,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Color from "color";

export interface SearchIOSProps {
  /**
   * If there is no `headerRight` on toolbar, set this property to `false`.
   * Used to calculate dimensions. Default value is `true`.
   */
  hasHeaderRight?: boolean;
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

interface Props extends SearchIOSProps {
  isSearchable: boolean;
  text: string;
  toggleSearchable(): void;
}

export const SearchIOS = (props: Props) => {
  const computedTitle = props.title || "Title";
  const computedTintColor = props.tintColor || "white";
  const computedIconColor = props.iconColor || "white";

  const screen = useWindowDimensions();
  const searchWidth = screen.width - 90;
  const translateX = [{
    translateX: props.hasHeaderRight ? 0 : -35,
  }];

  const placeholder = props.placeholder || computedTitle
    ? `Buscar ${computedTitle.toLowerCase()}`
    : "pesquisar";

  const renderCloseButton = () => {
    if (!props.isSearchable) {
      return <View />;
    }

    return (
      <View style={[styles.iconButtonHeader]}>
        <Pressable onPress={props.toggleSearchable}>
          <View style={styles.iconHeader}>
            <Icon name="close-outline" color={computedIconColor} size={24} />
          </View>
        </Pressable>
      </View>
    );
  };

  const backgroundColor = `${Color(computedTintColor).fade(0.88)}`;

  if (!props.isSearchable) {
    return (
      <Pressable onPress={props.toggleSearchable}>
        <View
          style={[
            styles.container,
            {
              backgroundColor,
              width: searchWidth,
              transform: translateX,
            },
          ]}
        >
          <Icon name="search-outline" color={computedTintColor} size={19} />
          <Text
            style={[styles.title, { color: computedTintColor }, props.titleStyle]}
          >
            {`Buscar ${computedTitle.toLowerCase()}`}
          </Text>
        </View>
      </Pressable>
    );
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor,
          width: searchWidth,
          transform: translateX,
        },
      ]}
    >
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        autoFocus
        maxLength={100}
        onChangeText={props.onChangeText}
        placeholder={placeholder}
        placeholderTextColor={`${Color(computedTintColor).fade(0.46)}`}
        returnKeyType="done"
        selectTextOnFocus
        underlineColorAndroid="transparent"
        value={props.text}
        style={[
          styles.input,
          { color: computedTintColor, width: screen.width - 110 },
        ]}
      />

      {renderCloseButton()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 32,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  title: {
    marginLeft: 5,
  },
  input: {
    height: 48,
    fontSize: 16,
    marginLeft: 8,
  },
  iconButtonHeader: {
    position: "absolute",
    right: 2,
  },
  iconHeader: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SearchIOS;
