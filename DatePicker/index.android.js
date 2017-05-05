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
    this.setState({ date, index });
    this.showPicker({date: date, mode: 'calendar'}, true);
  }

  showModalTime(date, index?)
  {
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
  };

  showPicker = async (options, isDate) => {
    try {
      if (isDate) {
        const {action, year, month, day} = await DatePickerAndroid.open(options);

        if (action === DatePickerAndroid.dateSetAction) {
          this.onDateChange(new Date(year, month, day));
          requestAnimationFrame(() => {
            this.props.onDateChange({ value: this.state.date, index: this.state.index });
          });
        }
      }
      else {
        const {action, hour, minute} = await TimePickerAndroid.open(options);

        if (action === TimePickerAndroid.timeSetAction) {
          const date = this.state.date;
          this.onDateChange(new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDay(),
            hour,
            minute
          ));
          requestAnimationFrame(() => {
            this.props.onDateChange({ value: this.state.date, index: this.state.index });
          });
        }
      }
    }
    catch ({code, message}) {
      alert(message);
    }
  };

  render()
  {
    return(
      <View/>
    );
  }
};

module.exports = DatePicker;
