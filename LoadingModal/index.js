import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TouchableWithoutFeedback,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  Platform,
  Modal,
  View,
  Text,
} from 'react-native';

const screen = Dimensions.get('window');
const ios = Platform.OS === 'ios';

type OptionsParam = {
  label: string
};

class LoadingModal extends Component
{
  state = {
    visible: false,
    label: 'Carregando',
  }

  _show(options: OptionsParam = {})
  {
    this.setState({
      visible: true,
      label: options.label || this.state.label,
    });
    !ios && StatusBar.setBackgroundColor('black', true);
  }

  _cancel()
  {
    if (this.props.cancelable) {
      this.dismiss();
    }
  }

  dismiss()
  {
    this.setState({ visible: false });
    !ios && StatusBar.setBackgroundColor(this.props.statusBarColor, true);
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
    return (
      <View style={styles.container} >
        <TouchableWithoutFeedback onPress={() => {/* do nothing */}} >
          <View style={[styles.dialog]} >

          <View style={styles.spinner} >
            <ActivityIndicator
              animating={this.state.visible}
              style={[styles.centering, {height: 100}]}
              size="large"
              color={this.props.indicatorColor}
            />
          </View>

            <Text style={{
              alignSelf: 'center',
              marginTop: 8,
              fontSize: ios ? 17 : 18,
              color: this.props.labelColor,
            }} >
              {this.state.label}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
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
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 5,
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
  spinner: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
});

LoadingModal.propTypes = {
  statusBarColor: PropTypes.string.isRequired,
  indicatorColor: PropTypes.string,
  labelColor: PropTypes.string,
  cancelable: PropTypes.bool,
};

LoadingModal.defaultProps = {
  cancelable: true,
  indicatorColor: '#00bfff',
  labelColor: '#757575',
};

export default LoadingModal;
