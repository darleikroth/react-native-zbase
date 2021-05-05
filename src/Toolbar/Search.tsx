import React, { useRef, useState } from "react";
import { Platform } from "react-native";
import { SearchAndroid, SearchAndroidProps } from "./SearchViewAndroid";
import { SearchIOS, SearchIOSProps } from "./SearchViewIOS";

type Props = SearchAndroidProps & SearchIOSProps;

export const Search: React.FC<Props> = (props) => {
  const [isSearchable, setSearchable] = useState(false);
  const [text, setText] = useState("");
  const timeout = useRef(-1);

  const toggleSearchable = () => {
    setSearchable((prev) => !prev);
    setText("");
    setTimeout(() => props.onChangeText?.(""), 200);
  };

  const onChangeText = (text: string) => {
    setText(text);
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      props.onChangeText?.(text.toUpperCase());
    }, 500);
  };

  return Platform.select({
    ios: (
      <SearchIOS
        iconColor={props.iconColor}
        isSearchable={isSearchable}
        onChangeText={onChangeText}
        text={text}
        tintColor={props.tintColor}
        title={props.title}
        titleStyle={props.titleStyle}
        toggleSearchable={toggleSearchable}
      />
    ),
    default: (
      <SearchAndroid
        hasHeaderLeft={props.hasHeaderLeft}
        hasHeaderRight={props.hasHeaderRight}
        iconColor={props.iconColor}
        isSearchable={isSearchable}
        onChangeText={onChangeText}
        text={text}
        tintColor={props.tintColor}
        title={props.title}
        titleStyle={props.titleStyle}
        toggleSearchable={toggleSearchable}
      />
    ),
  });
};

export default Search;
