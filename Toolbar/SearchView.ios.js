import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableWithoutFeedback,
  Dimensions,
  StyleSheet,
  TextInput,
  View,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Color from 'color';

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
const searchWidth = screen.width - 90;

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
    const backgroundColor = `${Color(this.props.tintColor).fade(0.88)}`;

    if (!this.state.isSearchable) {
      return (
        <TouchableWithoutFeedback onPress={() => this.toggleSearchable()} >
          <View style={[styles.container, {backgroundColor}]} >
            <Icon name='ios-search' color={this.props.tintColor} size={19} />
            <Text style={[styles.title, {color: this.props.tintColor}]} >
              {`Buscar ${this.props.title}`}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      );
    }

    return (
      <View style={[styles.container, {backgroundColor}]} >
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

        {this.renderCloseButton()}
      </View>
    );
  }

  renderCloseButton()
  {
    if (!this.state.isSearchable) {
      return <View/>
    }

    return (
      <View style={[styles.iconButtonHeader]} >
        <TouchableWithoutFeedback onPress={() => this.toggleSearchable()} >
          <View style={styles.iconHeader} >
            <Icon name='ios-close' color={this.props.tintColor} size={24} />
          </View>
        </TouchableWithoutFeedback>
      </View>
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
    height: 32,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginLeft: 5,
  },
  input: {
    width: screen.width - 110,
    height: 48,
    fontSize: 16,
    marginLeft: 8,
  },
  iconButtonHeader: {
    position: 'absolute',
    right: 2,
  },
  iconHeader: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

module.exports = Search;
