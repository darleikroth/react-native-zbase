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
  title: string;
  subtitle?: string;
  containerStyle?: ViewStyle;
  contentStyle?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
  onPress(fn: () => void): void;
  onLongPress(fn: () => void): void;
};

const ios = Platform.OS === 'ios';

class SimpleItem extends React.PureComponent
{
  props: Props;

  render()
  {
    return (
      <View style={[styles.container, this.props.containerStyle]} >
        <TouchableView onPress={this.props.onPress} onLongPress={this.props.onLongPress} >
          <View style={[styles.content, this.props.contentStyle]} >
            <Text numberOfLines={1} style={[styles.title, this.props.titleStyle]} >
              {this.props.title}
            </Text>
            {this.props.subtitle && (
              <Text numberOfLines={2} style={[styles.subtitle, this.props.subtitleStyle]} >
                {this.props.subtitle}
              </Text>
            )}
    
          </View>
        </TouchableView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  content: {
    padding: 16,
  },
  title: {
    color: 'rgba(0, 0, 0, .87)',
    fontSize: 16,
  },
  subtitle: {
    color: 'rgba(0, 0, 0, .54)',
    fontSize: 14,
  },
});

SimpleItem.propTypes = {
  title: PropTypes.string.isRequired,
};

module.exports = SimpleItem;
