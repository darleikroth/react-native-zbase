import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    DatePickerAndroid,
} from 'react-native';
import TimerMixin from 'react-timer-mixin';

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
        this.showPicker({date: date, mode: 'calendar'});
    }

    onDateChange(date)
    {
        this.setState({date: date});
    };

    showPicker = async (options) => {
        try {
            const {action, year, month, day} = await DatePickerAndroid.open(options);

            if (action === DatePickerAndroid.dateSetAction) {
                this.onDateChange(new Date(year, month, day));
                TimerMixin.requestAnimationFrame(() => {
                    this.props.onDateChange({ value: this.state.date, index: this.state.index });
                });
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
