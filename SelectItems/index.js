import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  FlatList,
  Platform,
  Modal,
  View,
  Text,
} from 'react-native';

const screen = Dimensions.get('window');
const ios = Platform.OS === 'ios';

type ValueObject = {
  id: number,
  name: string
};

type OptionsParam = {
  values: Array<ValueObject>,
  title?: string,
  itemFunc?: Function,
};

class SelectItems extends React.Component
{
  callback: Function;
  itemFunc: Function;
  
  state = {
    visible: false,
    values: [],
    title: 'Selecione',
  }

  /**
   * Show a modal with list items
   * @param {OptionsParam} options
   * @param {Function} callback 
   */
  _show(options, callback: Function)
  {
    this.setState({
      visible: true,
      values: options.values,
      title: options.title || this.state.title,
    });
    this.itemFunc = options.itemFunc || (item => item.name);
    this.callback = callback;
    !ios && StatusBar.setBackgroundColor('black', true);
  }

  _cancel()
  {
    this.setState({ visible: false });
    !ios && StatusBar.setBackgroundColor(this.props.statusBarColor, true);
    requestAnimationFrame(() => this.callback(null));
  }

  updateValues(values: OptionsParam)
  {
    this.setState({
      values: options.values,
      title: options.title || this.state.title,
    });
  }

  handlePress(item)
  {
    this.setState({ visible: false });
    !ios && StatusBar.setBackgroundColor(this.props.statusBarColor, true);
    requestAnimationFrame(() => this.callback(item));
  }

  render()
  {
    return (
      <Modal
        animationType='fade'
        visible={this.state.visible}
        transparent={true}
        onRequestClose={this._cancel.bind(this)}
      >
        <TouchableWithoutFeedback onPress={this._cancel.bind(this)} >
          {this.renderContent()}
        </TouchableWithoutFeedback>
      </Modal>
    );
  }

  renderContent()
  {
    const size = this.state.values.length;
    const dialogHeight = size < 10 ? (size * 48) + 72 : (9 * 48) + 72;

    return (
      <View style={styles.container} >
        <TouchableWithoutFeedback onPress={() => {}} >
          <View style={[styles.dialog, {height: dialogHeight}]} >
            <View style={styles.titleContent} >
              <Text style={styles.title} >
                {this.state.title}
              </Text>
            </View>
            <FlatList
              data={this.state.values}
              keyExtractor={(val, key) => key}
              renderItem={({item}) => this.renderItem(item)}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  renderItem(item)
  {
    const title = this.itemFunc(item);

    return (
      <TouchableOpacity onPress={() => this.handlePress(item)} >
        <View style={styles.itemContent} >
          <Text style={styles.itemText} >
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, .6)',
  },
  dialog: {
    width: screen.width - 64,
    paddingTop: 8,
    paddingBottom: 16,
    borderRadius: 3,
    backgroundColor: 'white',
    ...Platform.select({
      ios: {    
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowRadius: 8 * .75,
        shadowOffset: { height: 8 * .75 },
      },
      android: {
        elevation: 8,
      },
    }),
  },
  titleContent: {
    height: 48,
    paddingHorizontal: 28,
    justifyContent: 'center',
  },
  title: {
    color: '#212121',
    fontSize: ios ? 16 : 17,
    fontWeight: ios ? '600' : '500',
  },
  itemContent: {
    height: 48,
    paddingHorizontal: 28,
    justifyContent: 'center',
  },
  itemText: {
    color: '#212121',
    fontSize: ios ? 16 : 17,
  },
});

SelectItems.propTypes = {
  statusBarColor: PropTypes.string.isRequired,
};

module.exports = SelectItems;
