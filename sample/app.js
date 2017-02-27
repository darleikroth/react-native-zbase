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
    View
} from 'react-native';

import {TouchableView, Navbar, DatePicker, CardView} from './dist';

const ios = Platform.OS === 'ios';

export default class sample extends Component {
    render() {
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
                </View>
            </View>
        );
    }
}

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
