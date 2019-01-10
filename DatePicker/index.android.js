import React from 'react'
import {
  DatePickerAndroid,
  TimePickerAndroid,
  StyleSheet,
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

  dateTime: Object
  callback: Function

  constructor(props) {
    super(props)
    this.state = {
      date: props.date
    }
  }

  showDate(date, callback) {
    this.dateTime = date
    this.callback = callback
    this.setState({ date })
    this.showPicker({date: date, mode: 'calendar'}, true)
  }

  showTime(date, callback) {
    this.dateTime = date
    this.callback = callback
    this.setState({ date })
    this.showPicker({
      hour: date.getHours(),
      minute: date.getMinutes(),
      is24Hour: true,
    }, false)
  }

  onDateChange = date => {
    this.setState({ date })
  }

  async showPicker(options, isDate) {
    try {
      const dateTime = this.dateTime

      if (isDate) {
        const {action, year, month, day} = await DatePickerAndroid.open(options)

        if (action === DatePickerAndroid.dateSetAction) {
          const date = new Date(
            year,
            month,
            day,
            dateTime.getHours(),
            dateTime.getMinutes()
          )
          this.onDateChange(date)
          requestAnimationFrame(() => this.callback(date))
        }
      }
      else {
        const {action, hour, minute} = await TimePickerAndroid.open(options)

        if (action === TimePickerAndroid.timeSetAction) {
          const date = new Date(
            dateTime.getFullYear(),
            dateTime.getMonth(),
            dateTime.getDate(),
            hour,
            minute
          )
          this.onDateChange(date)
          requestAnimationFrame(() => this.callback(date))
        }
      }
    }
    catch ({code, message}) {}
  }

  render() {
    return <View/>
  }
}
