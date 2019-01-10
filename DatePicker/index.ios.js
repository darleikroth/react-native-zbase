import React from 'react'
import {
  TouchableHighlight,
  DatePickerIOS,
  StyleSheet,
  Dimensions,
  Modal,
  View,
  Text,
} from 'react-native'

type Props = {
  date: Date;
}

export default class DatePicker extends React.Component<Props> {
  static defaultProps = {
    date: new Date()
  }

  callback: Function

  constructor(props) {
    super(props)
    this.state = {
      date: props.date,
      mode: 'date',
      modalVisible: false,
      window: Dimensions.get('window')
    }
  }

  componentDidMount() {
    Dimensions.addEventListener('change', this.handleOrientationChange)
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.handleOrientationChange)
  }

  handleOrientationChange = ({ window }) => {
    this.setState({ window })
  }

  setModalVisible = modalVisible => {
    this.setState({ modalVisible })
  }

  showDate(date, callback) {
    this.callback = callback
    this.setState({
      date,
      mode: 'date',
      modalVisible: true,
    })
  }

  showTime(date, callback) {
    this.callback = callback
    this.setState({
      date,
      mode: 'time',
      modalVisible: true,
    })
  }

  onDateChange = date => {
    this.setState({ date })
  }

  cancelar = () => {
    requestAnimationFrame(() => this.setModalVisible(false))
  }

  salvar = () => {
    requestAnimationFrame(() => {
      this.setModalVisible(false)
      requestAnimationFrame(() => this.callback(this.state.date))
    })
  }

  render() {
    const {width, height} = this.state.window
    const wid = width > height ? height - 32 : width - 32

    return(
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={this.state.modalVisible}
        supportedOrientations={['portrait','landscape']}
      >
        <View
          style={styles.container}
        >
          <View style={[styles.content, {width: wid}]} >
            <DatePickerIOS
              style={styles.picker}
              date={this.state.date}
              mode={this.state.mode}
              minuteInterval={5}
              onDateChange={this.onDateChange}
            />
            <View style={styles.pickerBottom} >
              <TouchableHighlight
                style={[styles.button, {borderBottomLeftRadius: 15}]}
                underlayColor='#E0E0E0'
                onPress={this.cancelar}
              >
                <Text style={styles.buttonTitle} >
                  Cancelar
                </Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={[styles.button, {borderBottomRightRadius: 15}]}
                underlayColor='#E0E0E0'
                onPress={this.salvar}
              >
                <Text style={styles.buttonTitle} >
                  Salvar
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  content: {
    borderRadius: 15,
    backgroundColor: 'white',
  },
  picker: {
    marginTop: 16
  },
  pickerBottom: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flex: 1,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#E0E0E0',
    borderWidth: 0.5
  },
  buttonTitle: {
    fontSize: 18,
    color: 'dodgerblue'
  }
})
