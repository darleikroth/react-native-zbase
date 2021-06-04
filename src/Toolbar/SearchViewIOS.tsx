import React from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
  ViewStyle,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Color from "color";

export interface SearchIOSProps {
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

export const SearchIOS: React.FC<Props> = (props) => {
  const screen = useWindowDimensions();
  const searchWidth = screen.width - 90;

  const renderCloseButton = () => {
    if (!props.isSearchable) {
      return <View />;
    }

    return (
      <View style={[styles.iconButtonHeader]}>
        <Pressable onPress={props.toggleSearchable}>
          <View style={styles.iconHeader}>
            <Icon name="ios-close" color={props.iconColor} size={24} />
          </View>
        </Pressable>
      </View>
    );
  };

  const backgroundColor = `${Color(props.tintColor).fade(0.88)}`;

  if (!props.isSearchable) {
    return (
      <Pressable onPress={props.toggleSearchable}>
        <View
          style={[
            styles.container,
            { backgroundColor, width: searchWidth },
          ]}
        >
          <Icon name="ios-search" color={props.tintColor} size={19} />
          <Text
            style={[styles.title, { color: props.tintColor }, props.titleStyle]}
          >
            {`Buscar ${props.title}`}
          </Text>
        </View>
      </Pressable>
    );
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor, width: searchWidth },
      ]}
    >
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        autoFocus
        maxLength={100}
        onChangeText={props.onChangeText}
        placeholder={`Buscar ${props.title}`}
        placeholderTextColor={`${Color(props.tintColor).fade(0.46)}`}
        returnKeyType="done"
        selectTextOnFocus
        underlineColorAndroid="transparent"
        value={props.text}
        style={[
          styles.input,
          { color: props.tintColor, width: screen.width - 110 },
        ]}
      />

      {renderCloseButton()}
    </View>
  );
};

SearchIOS.defaultProps = {
  title: "Título",
  tintColor: "white",
  iconColor: "white",
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 32,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
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
