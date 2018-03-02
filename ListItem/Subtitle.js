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

type Props = {
  title: string;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
};

const ios = Platform.OS === 'ios';

class Subtitle extends React.PureComponent
{
  props: Props;

  render()
  {
    return (
      <View style={[styles.container, this.props.containerStyle]} >
        <Text style={[styles.title, this.props.titleStyle]} >{this.props.title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    paddingHorizontal: 16,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  title: {
    color: 'rgba(0, 0, 0, .54)',
    fontSize: 14,
    fontWeight: ios ? '600' : '500',
  },
});

Subtitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Subtitle;
