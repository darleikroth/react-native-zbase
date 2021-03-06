import React, { useRef, useState } from "react";
import { Platform } from "react-native";
import { SearchAndroid, SearchAndroidProps } from "./SearchViewAndroid";
import { SearchIOS, SearchIOSProps } from "./SearchViewIOS";

type Props = SearchAndroidProps & SearchIOSProps;

export const Search: React.FC<Props> = (props) => {
  const [isSearchable, setSearchable] = useState(false);
  const [text, setText] = useState("");
  const timeout = useRef<NodeJS.Timeout | number>(-1);

  const toggleSearchable = () => {
    setSearchable((prev) => !prev);
    setText("");
    setTimeout(() => props.onChangeText?.(""), 200);
  };

  const onChangeText = (text: string) => {
    setText(text);
    clearTimeout(timeout.current as number);
    timeout.current = setTimeout(() => {
      const s = text.replace(/\r?\n|\r/g, "");
      props.onChangeText?.(s.toUpperCase());
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
