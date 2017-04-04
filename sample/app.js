/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  ScrollView,
  Text,
  View,
  TextInput,
  Button,
} from 'react-native';
import {
  CardView,
  TouchableView,
  Navbar,
  DatePicker,
  ModalPicker,
  Drawer,
} from 'react-native-zbase';

const ios = Platform.OS === 'ios';

class sample extends Component
{
  constructor(props)
  {
    super(props);
    this.onDrawerItemPress = this.onDrawerItemPress.bind(this);
    this.state = { textInputValue: '', drawerDisable: false };
  }

  pickerData()
  {
    return [
      { key: 0, section: true, label: 'Select' },
      { key: 1, label: 'Option one' },
      { key: 2, label: 'Option two' }
    ];
  }

  onDrawerItemPress(i, id)
  {
    console.log('onItemPress', `index: ${i} identifier: ${id}`);
    requestAnimationFrame(() => this.drawer.close());
  }

  withDrawerItems()
  {
    return [
      {
        identifier: 'one',
        name: 'Home',
        textColor: undefined,
        colorSelected: 'deepskyblue',
        iconFamily: 'cmd',
        iconName: 'view-dashboard',
        iconColor: undefined,
        selected: true,
      },
      {
        identifier: 'two',
        name: 'Music',
        textColor: undefined,
        colorSelected: 'deepskyblue',
        iconFamily: undefined,
        iconName: ios ? 'ios-musical-notes' : 'md-musical-notes',
        iconColor: undefined,
      },
      {
        identifier: 'three',
        name: 'Settings',
        textColor: undefined,
        colorSelected: 'deepskyblue',
        iconFamily: 'md',
        iconName: 'settings',
        iconColor: undefined,
      },
      {
        identifier: 'four',
        name: 'News',
        colorSelected: 'deepskyblue',
        iconName: ios ? 'ios-notifications' : 'md-notifications',
        withDivider: {subtitle: 'Subheader'},
      },
    ];
  }

  withDrawerContent()
  {
    return(
      <Text
        style={{color: 'white',
          fontSize: 14,
          fontFamily: ios ? 'HelveticaNeue' : 'Roboto',
          fontWeight: '500'
        }}
      >
        Sample Header
      </Text>
    );
  }

  renderContent()
  {
    return (
      <View style={styles.container}>
        <Navbar
          color='goldenrod'
          title='Navbar'
          iconLeft={ios ? 'ios-menu' : 'md-menu'}
          iconRight={ios ? 'ios-calendar' : 'md-calendar'}
          onButtonLeftPress={() => this.drawer.toggle()}
          onButtonRightPress={()=>this.datepicker.showModal(new Date(), 0)}
        />

        <DatePicker
          ref={c => this.datepicker = c}
          date={new Date()}
          onDateChange={date => console.log('Date selected', date)}
        />

        <ScrollView>
          <View style={styles.content}>
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
                  Custom card
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

            <Button
              onPress={() => {
                this.drawer.setDisable(true);
                this.setState({ drawerDisable: true });
              }}
              title="Disable drawer"
              color={!this.state.drawerDisable ? "grey" : "deepskyblue"}
              accessibilityLabel="Disable the menu drawer"
            />
            <Button
              onPress={() => {
                this.drawer.setDisable(false);
                this.setState({ drawerDisable: false });
              }}
              title="Enable drawer"
              color={this.state.drawerDisable ? "grey" : "deepskyblue"}
              accessibilityLabel="Enable the menu drawer"
            />
          </View>
        </ScrollView>
      </View>
    );
  }

  render()
  {
    return (
      <Drawer
        ref={c => { this.drawer = c }}
        color='#303030'
        headerColor='royalblue'
        headerContent={this.withDrawerContent()}
        items={this.withDrawerItems()}
        onItemPress={this.onDrawerItemPress}
        dark={true}
        >
        {this.renderContent()}
      </Drawer>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  content: {
    flex: 1,
    paddingVertical: 16,
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
