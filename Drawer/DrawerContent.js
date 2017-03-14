import React from 'react';
import {
    Platform,
    StyleSheet,
    ScrollView,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import TimerMixin from 'react-timer-mixin';
import Icon from 'react-native-vector-icons/Ionicons';
import IconMD from 'react-native-vector-icons/MaterialCommunityIcons';
import DrawerHeader from './DrawerHeader';
import DrawerItem from './DrawerItem';
import DrawerItemDivider from './DrawerItemDivider';

var ios = Platform.OS === 'ios';

class DrawerContent extends React.Component
{
    constructor(props)
    {
        super(props);
        let selected = props.items.map(d => d.selected === true);

        this.state = { selected };
    }

    toggleSelected(i, identifier)
    {
        let selected = [false, false, false, false];
        selected[i] = true;
        TimerMixin.requestAnimationFrame(() => {
            this.setState({ selected });
            this.props.onItemPress(i, identifier)
        });
    }

    renderHeader()
    {
        return(
            this.props.headerContent ?
            <DrawerHeader
                backgroundColor={this.props.headerColor}
                dark={this.props.dark}
            >
                {this.props.headerContent}
            </DrawerHeader> :
            <View style={{ height: ios ? 24 : 0 }} />
        );
    }

    renderItems()
    {
        return(
            <View>
                {this.props.items.map((item, i) => (
                    <View key={i}>
                        {item.withDivider &&
                            <DrawerItemDivider
                                subtitle={item.withDivider.subtitle}
                                dark={this.props.dark}
                            />}
                        <DrawerItem
                            onPress={() => this.toggleSelected(i, item.identifier)}
                            name={item.name}
                            textColor={item.textColor}
                            colorSelected={item.colorSelected}
                            iconFamily={item.iconFamily}
                            iconName={item.iconName}
                            selected={this.state.selected[i]}
                            dark={this.props.dark}
                        />
                    </View>
                ))}
            </View>
        );
    }

    render()
    {
        return(
            <ScrollView style={{ backgroundColor:  this.props.color || 'white' }}>
                <View>

                    {this.renderHeader()}

                    <View style={{ height: 8 }} />

                    {this.renderItems()}

                </View>
            </ScrollView>
        );
    }
}

module.exports = DrawerContent;
