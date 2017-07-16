import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  DatePickerAndroid,
  TimePickerAndroid,
} from 'react-native';

class DatePicker extends React.Component
{
  dateTime: ?Object = null;

  constructor(props)
  {
    super(props);
    this.onDateChange = this.onDateChange.bind(this);

    this.state = {
      date: props.date,
      index: -1,
    };
  }

  showModal(date, index)
  {
    this.dateTime = date;
    this.setState({ date, index });
    this.showPicker({date: date, mode: 'calendar'}, true);
  }

  showModalTime(date, index?)
  {
    this.dateTime = date;
    this.setState({ date, index });
    this.showPicker({
      hour: date.getHours(),
      minute: date.getMinutes(),
      is24Hour: true,
    }, false);
  }

  onDateChange(date)
  {
    this.setState({date: date});
  }

  async showPicker(options, isDate)
  {
    try {
      const dateTime = this.dateTime;

      if (isDate) {
        const {action, year, month, day} = await DatePickerAndroid.open(options);

        if (action === DatePickerAndroid.dateSetAction) {
          const date = new Date(
            year,
            month,
            day,
            dateTime.getHours(),
            dateTime.getMinutes()
          );
          this.onDateChange(date);
          requestAnimationFrame(() => {
            this.props.onDateChange({ value: date, index: this.state.index });
          });
        }
      }
      else {
        const {action, hour, minute} = await TimePickerAndroid.open(options);

        if (action === TimePickerAndroid.timeSetAction) {
          const date = new Date(
            dateTime.getFullYear(),
            dateTime.getMonth(),
            dateTime.getDate(),
            hour,
            minute
          );
          this.onDateChange(date);
          requestAnimationFrame(() => {
            this.props.onDateChange({ value: date, index: this.state.index });
          });
        }
      }
    }
    catch ({code, message}) {
      alert(message);
    }
  }

  render()
  {
    return(
      <View/>
    );
  }
};

module.exports = DatePicker;
