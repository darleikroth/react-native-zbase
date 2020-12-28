import React from 'react';
import {
  Pressable,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Platform,
  View,
  Text,
} from 'react-native';

type Props = {
  /**
   * Determines what the opacity of the wrapped view should be when touch is active. Defaults to `0.3`.
   */
  activeOpacity: Number;
  title: string;
  subtitle?: string;
  titleNumberOfLines?: Number;
  containerStyle?: ViewStyle;
  contentStyle?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
  rightStyle?: ViewStyle;
  /**
   * If true, disable all interactions for this component.
   */
  touchDisabled?: Boolean;
  onPress(): void;
  onLongPress(): void;
  right(): JSX.Element;
};

const ios = Platform.OS === 'ios';

const SimpleItem = React.memo((props: Props) => {
  const renderContent = () => (
    <>
      <View style={styles.flexContent} >
        <Text numberOfLines={props.titleNumberOfLines} style={[styles.title, props.titleStyle]} >
          {props.title}
        </Text>
        {!!props.subtitle && (
          <Text numberOfLines={2} style={[styles.subtitle, props.subtitleStyle]} >
            {props.subtitle}
          </Text>
        )}
      </View>
      {!!props.right && (
        <View style={[styles.right, props.rightStyle]} >
          {props.right()}
        </View>
      )}
    </>
  );

  return (
    <View style={[styles.container, props.containerStyle]} >
      <Pressable
        android_disableSound
        disabled={props.touchDisabled}
        onPress={props.onPress}
        onLongPress={props.onLongPress}
        style={({ pressed }) => [
          styles.content,
          props.contentStyle,
          { opacity: pressed ? props.activeOpacity : 1 }
        ]}
      >
        {renderContent()}
      </Pressable>
    </View>
  );
});

SimpleItem.defaultProps = {
  activeOpacity: 0.4,
  titleNumberOfLines: 1,
  touchDisabled: false,
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    height: 56,
  },
  content: {
    flexDirection: 'row',
  },
  flexContent: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    color: 'rgba(0, 0, 0, .87)',
    fontSize: 16,
  },
  subtitle: {
    color: 'rgba(0, 0, 0, .54)',
    fontSize: 14,
  },
  right: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
  },
});

export default SimpleItem;
