import React from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Color from 'color';
import ActionButton from './Button';

type Props = {
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
  titleStyle?: ViewStyle;
  /**
   * Callback that is called when the text input's text changes.
   * Changed text is passed as an argument to the callback handler.
   */
  onChangeText(fn: (text: string) => void): void;
};

type State = {
  isSearchable: boolean;
  text: string;
};

const screen = Dimensions.get('window');

class Search extends React.Component {
  props: Props;
  state: State;
  timeoutID: ?number = null;

  constructor() {
    super();
    this.onChangeText = this.onChangeText.bind(this);
    this.state = {
      isSearchable: false,
      text: '',
    };
  }

  toggleSearchable() {
    requestAnimationFrame(() => this.setState({
      isSearchable: !this.state.isSearchable,
      text: '',
    }));
    this.props.onChangeText && setTimeout(() => this.props.onChangeText(''), 200);
  }

  onChangeText(text) {
    this.setState({ text })
    clearTimeout(this.timeoutID);
    this.timeoutID = setTimeout(() => {
      this.props.onChangeText && this.props.onChangeText(text.toUpperCase());
    }, 500);
  }

  render() {
    const style = this.props.hasHeaderRight ? { marginRight: 48 } : undefined;

    return (
      <View style={[styles.container, style]} >
        {this.renderTitle()}
        {this.renderSearchButton()}
      </View>
    );
  }

  renderTitle() {
    const {title, tintColor, titleStyle, hasHeaderRight, hasHeaderLeft} = this.props;

    if (!this.state.isSearchable) {
      return (
        <Text style={[styles.title, {color: tintColor}, titleStyle]} >
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
        value={this.state.text}
        placeholder={`Buscar ${title}`}
        placeholderTextColor={`${Color(tintColor).fade(0.46)}`}
        returnKeyType='done'
        autoCapitalize='none'
        onChangeText={this.onChangeText}
        underlineColorAndroid='transparent'
        selectTextOnFocus
        autoCorrect={false}
        autoFocus
        style={[styles.input, {color: tintColor, width: inputWid}]}
      />
    );
  }

  renderSearchButton() {
    const search = this.state.isSearchable,
    iconColor = this.props.iconColor;

    return (
      <ActionButton
        background={this.props.underlayColor}
        onPress={() => this.toggleSearchable()}
        style={{position: 'absolute', right: 0}} >
        <Icon name={search ? 'close' : 'magnify'} color={iconColor} size={24} />
      </ActionButton>
    );
  }
}

Search.defaultProps = {
  title: 'Título',
  tintColor: 'white',
  iconColor: 'white',
  hasHeaderLeft: false,
  hasHeaderRight: false,
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 5,
    flex: 1,
    flexDirection: 'row',
    height: 48,
  },
  title: {
    fontSize: 19,
    fontWeight: '500',
    textAlign: 'left',
  },
  input: {
    height: 48,
    fontSize: 16,
  },
});

export default Search;
