import React from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableHighlight,
  Modal,
  DatePickerIOS,
} from 'react-native';

class DatePicker extends React.Component
{
  constructor(props)
  {
    super(props);
    this.onDateChange = this.onDateChange.bind(this);

    let {width} = Dimensions.get('window');

    this.state = {
      orientation: ['portrait'],
      date: props.date,
      mode: 'date',
      index: -1,
      modalVisible: false,
      width,
    };
  }

  setModalVisible(visible)
  {
    this.setState({modalVisible: visible});
  }

  showModal(date, index)
  {
    let {width, height} = Dimensions.get('window');
    let orientation = width > height ? ['landscape'] : ['portrait'];

    this.setState({
      orientation,
      date,
      mode: 'date',
      index,
      modalVisible: true,
    });
  }

  showModalTime(date, index?)
  {
    let {width, height} = Dimensions.get('window');
    let orientation = width > height ? ['landscape'] : ['portrait'];

    this.setState({
      orientation,
      date,
      mode: 'time',
      index,
      modalVisible: true,
    });
  }

  onDateChange(date)
  {
    this.setState({date: date});
  };

  cancelar()
  {
    requestAnimationFrame(() => this.setModalVisible(false));
  }

  salvar()
  {
    requestAnimationFrame(() => {
      this.setModalVisible(false);
      requestAnimationFrame(() => {
        this.props.onDateChange({ value: this.state.date, index: this.state.index });
      });
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
};

module.exports = DatePicker;
