/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TextInput
} from 'react-native';
import {
    CardView,
    TouchableView,
    Navbar,
    DatePicker,
    ModalPicker
} from 'react-native-zbase';

const ios = Platform.OS === 'ios';

class sample extends Component
{
    state = { textInputValue: '' };

    pickerData()
    {
        return [
            { key: 0, section: true, label: 'Select' },
            { key: 1, label: 'Option one' },
            { key: 2, label: 'Option two' }
        ];
    }

    render()
    {
        return (
            <View style={styles.header}>
                <Navbar
                    color='goldenrod'
                    title='Navbar'
                    iconLeft={ios ? 'ios-menu' : 'md-menu'}
                    iconRight={ios ? 'ios-calendar' : 'md-calendar'}
                    onButtonLeftPress={()=>alert('onButtonLeftPressed')}
                    onButtonRightPress={()=>this.datepicker.showModal(new Date(), 0)}
                />

                <DatePicker
                    ref={c => this.datepicker = c}
                    date={new Date()}
                    onDateChange={date => console.log('Date selected', date)}
                />

                <View style={styles.container}>
                    <TouchableView onPress={()=>console.log('pressed')}>
                        <View style={{height: 50, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={styles.welcome}>
                                Welcome to React Native and zBase!
                            </Text>
                        </View>
                    </TouchableView>
                    <CardView
                        width={280}
                        padding={16}
                        marginTop={20}
                        elevation={4}
                        onPress={()=>console.log('CardView onPress')}
                        onLongPress={()=>console.log('CardView onLongPress')}
                        onLayout={evt=>console.log('onLayout', evt.nativeEvent.layout)}
                    >
                        <View>
                            <Text style={styles.instructions}>
                                To get started, edit index.ios.js
                            </Text>
                            <Text style={styles.instructions}>
                                Press Cmd+R to reload,{'\n'}
                                Cmd+D or shake for dev menu
                            </Text>
                        </View>
                    </CardView>

                    <ModalPicker
                        style={{marginVertical: 20}}
                        data={this.pickerData()}
                        initValue="Select a value!"
                        onChange={option => this.setState({textInputValue:option.label})}>

                        <TextInput
                            style={{
                                borderWidth:1,
                                borderColor:'#ccc',
                                padding:10,
                                width:280,
                                height:54,
                            }}
                            editable={false}
                            placeholder="Select a value!"
                            value={this.state.textInputValue}
                        />

                    </ModalPicker>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    header: {
        flex: 1,
        backgroundColor: 'white'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcome: {
        fontSize: 18,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

module.exports = sample;
