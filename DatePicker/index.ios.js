import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableHighlight,
  DatePickerIOS,
  StyleSheet,
  Dimensions,
  Modal,
  View,
  Text,
} from 'react-native';

const screen = Dimensions.get('window');

class DatePicker extends React.Component
{
  callback: Function;

  constructor(props)
  {
    super(props);
    this.onDateChange = this.onDateChange.bind(this);

    this.state = {
      orientation: ['portrait'],
      date: props.date,
      mode: 'date',
      modalVisible: false,
      width: screen.width,
    };
  }

  setModalVisible(modalVisible)
  {
    this.setState({ modalVisible });
  }

  showDate(date, callback)
  {
    const orientation = screen.width > screen.height ? ['landscape'] : ['portrait'];
    this.callback = callback;
    this.setState({
      orientation,
      date,
      mode: 'date',
      modalVisible: true,
    });
  }

  showTime(date, callback)
  {
    const orientation = screen.width > screen.height ? ['landscape'] : ['portrait'];
    this.callback = callback;
    this.setState({
      orientation,
      date,
      mode: 'time',
      modalVisible: true,
    });
  }

  onDateChange(date)
  {
    this.setState({ date });
  };

  cancelar()
  {
    requestAnimationFrame(() => this.setModalVisible(false));
  }

  salvar()
  {
    requestAnimationFrame(() => {
      this.setModalVisible(false);
      requestAnimationFrame(() => this.callback(this.state.date));
    });
  }

  render()
  {
    return(
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={this.state.modalVisible}
        supportedOrientations={this.state.orientation}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.4)',
          }}
        >
          <View
            style={{
              width: (this.state.width - 32),
              borderRadius: 15,
              backgroundColor: 'white',
            }}
          >
            <DatePickerIOS
              style={{
                marginTop: 16,
              }}
              date={this.state.date}
              mode={this.state.mode}
              minuteInterval={5}
              onDateChange={this.onDateChange}
            />
            <View
              style={{
                flexGrow: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <TouchableHighlight
                style={{
                  flex: 1,
                  height: 56,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: '#E0E0E0',
                  borderWidth: 0.5,
                  borderBottomLeftRadius: 15,
                }}
                underlayColor='#E0E0E0'
                onPress={() => this.cancelar()}
              >
                <Text style={{ fontSize: 18, color: 'dodgerblue' }}>
                  Cancelar
                </Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={{
                  flex: 1,
                  height: 56,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: '#E0E0E0',
                  borderWidth: 0.5,
                  borderBottomRightRadius: 15,
                }}
                underlayColor='#E0E0E0'
                onPress={() => this.salvar()}
              >
                <Text style={{ fontSize: 18, color: 'dodgerblue'}}>
                  Salvar
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

DatePicker.propTypes = {
  date: PropTypes.object,
};

DatePicker.defaultProps = {
  date: new Date(),
};

module.exports = DatePicker;
