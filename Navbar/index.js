import React from 'react';
import {
    StyleSheet,
    Platform,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

var ios = Platform.OS === 'ios';
var themeIOS = false;

class Navbar extends React.Component
{
    styles()
    {
        let backgroundColor = this.props.color;

        if (this.props.theme) {
            themeIOS = this.props.theme === 'ios'
        }

        return StyleSheet.create({
            header:{
                flexDirection: 'row',
                height: (ios || themeIOS) ? 64 : 56,
                paddingTop: (ios || themeIOS) ? 15 : 0,
                backgroundColor: this.props.color || 'dodgerblue',
                shadowColor: ios ? 'rgba(0, 0, 0, 0.3)' : undefined,
                shadowOffset: ios ? { width: 0.5, height: 2 * .65 } : undefined,
                shadowOpacity: ios ? 1 : undefined,
                shadowRadius: ios ? (2 * .65) : undefined,
                elevation: !ios ? 3 : undefined,
                zIndex: 10,
            },
            title: {
                color: 'white',
                fontSize: ios ? 17 : 19,
            },
        });
    }

    render() {
        let {title, iconLeft, iconRight} = this.props;
        const styles = this.styles();

        return (
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={this.props.onButtonLeftPress}
                    style={{
                        flex: 2,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {iconLeft && <Icon name={iconLeft} size={27} color='white'/>}
                </TouchableOpacity>
                <View
                    style={{
                        flex: 10,
                        alignItems: (ios || themeIOS) ? 'center' : undefined,
                        justifyContent: 'center',
                    }}
                >
                    <Text style={styles.title}>{title}</Text>
                </View>
                <TouchableOpacity
                    onPress={this.props.onButtonRightPress}
                    style={{
                        flex: 2,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {iconRight && <Icon name={iconRight} size={27} color='white'/>}
                </TouchableOpacity>
            </View>
        );
    }
};

module.exports = Navbar;
