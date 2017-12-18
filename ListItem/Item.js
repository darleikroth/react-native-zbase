import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  ViewStyle,
  TextStyle,
  Platform,
  View,
  Text,
} from 'react-native';
import { TouchableView } from 'react-native-zbase';

type Props = {
  /**
   * Item's primary text. It is `isRequired`.
   */
  title: string;
  /**
   * Item's secondary text.
   */
  subtitle?: string;
  /**
   * Expects a React Element. Rendered at the item's start/left. It is `isRequired`.
   */
  iconElement: Element;
  /**
   * Used to truncate the text with an ellipsis after computing the text layout,
   * including line wrapping, such that the total number of lines does not exceed this number.
   * The default is `1`.
   */
  titleNumberOfLines?: number;
  /**
   * Used to truncate the text with an ellipsis after computing the text layout,
   * including line wrapping, such that the total number of lines does not exceed this number.
   * The default is `1`.
   */
  subtitleNumberOfLines?: number;
  /**
   * Item parent's styles.
   */
  containerStyle?: ViewStyle;
  /**
   * Item contents styles.
   */
  contentStyle?: ViewStyle;
  /**
   * Styles of the `title` property.
   */
  titleStyle?: TextStyle;
  /**
   * Styles of the `subtitle` property.
   */
  subtitleStyle?: TextStyle;
  /**
   * Styles of the `divider` property.
   */
  dividerStyle?: ViewStyle;
  /**
   * Expects a color. Determines the color of background that's going to be used to display feedback.
   * It works just on Android devices. For iOS devices the `TouchableOpacity` feedback is used.
   */
  selectableBackground?: string;
  /**
   * If `true` a line element (divider) will be rendered at the bottom of the item.
   * The default is `false`.
   */
  divider?: boolean;
  /**
   * Called when the touch is released.
   */
  onPress(fn: () => void): void;
  /**
   * Called when the long press is released.
   */
  onLongPress(fn: () => void): void;
};

const ios = Platform.OS === 'ios';

class Item extends React.PureComponent
{
  props: Props;

  render()
  {
    const {
      title,
      subtitle,
      iconElement,
      titleNumberOfLines,
      subtitleNumberOfLines,
      containerStyle,
      contentStyle,
      titleStyle,
      subtitleStyle,
      dividerStyle,
      divider,
      selectableBackground,
      onPress,
      onLongPress,
    } = this.props;

    return (
      <View>
      <View style={[styles.container, containerStyle]} >
        <TouchableView onPress={onPress} background={selectableBackground} onLongPress={onLongPress} >
          <View style={[styles.content, contentStyle]} >

            <View style={styles.icon} >
              {iconElement}
            </View>
            
            <View style={styles.titleContainer} >
              <Text style={[styles.title, titleStyle]} numberOfLines={titleNumberOfLines} >
                {title}
              </Text>
              {subtitle && (
                <Text style={[styles.subtitle, subtitleStyle]} numberOfLines={subtitleNumberOfLines} >
                  {subtitle}
                </Text>
              )}
            </View>
          </View>
        </TouchableView>
      </View>
      {divider && (<View style={[styles.divider, dividerStyle]} />)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 72,
    backgroundColor: 'white',
  },
  content: {
    flexDirection: 'row',
    height: 72,
  },
  titleContainer: {
    height: 72,
    paddingRight: 16,
    marginLeft: 72,
    justifyContent: 'center',
  },
  title: {
    color: 'rgba(0, 0, 0, .87)',
    fontSize: 16,
  },
  subtitle: {
    color: 'rgba(0, 0, 0, .54)',
    fontSize: 14,
    marginTop: 1,
  },
  icon: {
    width: 72,
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, .12)',
  },
});

Item.propTypes = {
  title: PropTypes.string.isRequired,
  iconElement: PropTypes.any.isRequired,
};

Item.defaultProps = {
  titleNumberOfLines: 1,
  subtitleNumberOfLines: 1,
  divider: false,
};

module.exports = Item;
