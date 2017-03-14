import React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MDIcons from 'react-native-vector-icons/MaterialIcons';
import CMDIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import TouchableView from '../TouchableView';

class DrawerItem extends React.Component
{
    getTextDefaultColor(dark)
    {
        return dark ? '#fff' : 'rgba(0, 0, 0, 0.87)';
    }

    getIconDefaultColor(dark)
    {
        return dark ? 'rgba(255, 255, 255, 0.70)' : 'rgba(0, 0, 0, 0.54)';
    }

    render()
    {
        var {selected, colorSelected, iconColor, textColor, dark} = this.props;
        let atextColor = selected ?
            (colorSelected || this.getTextDefaultColor(dark)) :
            (textColor || this.getTextDefaultColor(dark));
        let aIconColor = selected ?
            (colorSelected || this.getIconDefaultColor(dark)) :
            (iconColor || this.getIconDefaultColor(dark));

        return(
            <TouchableView dark={dark} onPress={this.props.onPress}>
                <View
                    style={{
                        flexDirection: 'row',
                        height: 48,
                        alignItems: 'center'
                    }}
                >
                    <View style={{width: 72, paddingHorizontal: 16}}>
                        <Icon
                            family={this.props.iconFamily}
                            name={this.props.iconName}
                            size={24}
                            color={aIconColor}
                        />
                    </View>
                    <View>
                        <Text
                            style={{
                                color: atextColor,
                                fontSize: 14,
                                fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue' : 'Roboto',
                                fontWeight: '500'
                            }}
                        >
                            {this.props.name}
                        </Text>
                    </View>
                </View>
            </TouchableView>
        );
    }
};

class Icon extends React.Component
{
    renderIcon()
    {
        switch (this.props.family) {
            case 'md':
                return(
                    <MDIcons
                        name={this.props.name}
                        size={this.props.size}
                        color={this.props.color}
                    />
                );
                break;
            case 'cmd':
                return(
                    <CMDIcons
                        name={this.props.name}
                        size={this.props.size}
                        color={this.props.color}
                    />
                );
                break;
            case 'FontAwesome':
                return(
                    <FontAwesome
                        name={this.props.name}
                        size={this.props.size}
                        color={this.props.color}
                    />
                );
                break;
            default:
                return(
                    <Ionicons
                        name={this.props.name}
                        size={this.props.size}
                        color={this.props.color}
                    />
                );
        }
    }

    render()
    {
        return(
            <View
                style={{
                    width: 24,
                    height: 30,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                {this.renderIcon()}
            </View>
        );
    }
}

module.exports = DrawerItem;
