import React from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  StyleSheet,
  TextInput,
  View,
  Text,
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
   * The color of the underlay that will show through when the touch is active.
   */
  underlayColor?: string;
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
const searchWidth = screen.width - 64;

class Search extends React.Component
{
  props: Props;
  state: State;
  timeoutID: ?number = null;

  constructor()
  {
    super();
    this.onChangeText = this.onChangeText.bind(this);
    this.state = {
      isSearchable: false,
      text: '',
    };
  }

  toggleSearchable()
  {
    requestAnimationFrame(() => this.setState({
      isSearchable: !this.state.isSearchable,
      text: '',
    }));
    this.props.onChangeText && setTimeout(() => this.props.onChangeText(''), 200);
  }

  onChangeText(text)
  {
    this.setState({ text })
    clearTimeout(this.timeoutID);
    this.timeoutID = setTimeout(() => {
      this.props.onChangeText && this.props.onChangeText(text);
    }, 650);
  }

  render()
  {
    return (
      <View style={[styles.container]} >
        {this.renderTitle()}
        {this.renderSearchButton()}
      </View>
    );
  }

  renderTitle()
  {
    if (!this.state.isSearchable) {
      return (
        <Text style={[styles.title, {color: this.props.tintColor}]} >
          {this.props.title}
        </Text>
      );
    }

    return (
      <TextInput
        value={this.state.text}
        placeholder={`Buscar ${this.props.title}`}
        placeholderTextColor={`${Color(this.props.tintColor).fade(0.46)}`}
        returnKeyType='done'
        autoCapitalize='none'
        onChangeText={this.onChangeText}
        underlineColorAndroid='transparent'
        selectTextOnFocus
        autoCorrect={false}
        autoFocus
        style={[styles.input, {color: this.props.tintColor}]}
      />
    );
  }

  renderSearchButton()
  {
    const search = this.state.isSearchable;

    return (
      <ActionButton
        background={this.props.underlayColor}
        onPress={() => this.toggleSearchable()}
        style={{position: 'absolute', right: 0}} >
        <Icon name={search ? 'close' : 'magnify'} color='white' size={24} />
      </ActionButton>
    );
  }
}

Search.defaultProps = {
  title: 'Título',
  tintColor: 'white',
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: searchWidth,
    height: 48,
    borderRadius: 5,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'left',
    marginHorizontal: 16,
  },
  input: {
    width: screen.width - 110,
    height: 48,
    fontSize: 16,
    marginLeft: 16,
  },
});

module.exports = Search;
