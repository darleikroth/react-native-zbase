import React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';

var ios = Platform.OS === 'ios';
var defaultHeight = 120;

class DrawerHeader extends React.Component
{
    render()
    {
        var {height, backgroundColor, dark} = this.props;
        height = height || defaultHeight;

        return(
            <View style={{ backgroundColor: backgroundColor || '#9e9e9e', zIndex: 5 }}>
                <View
                    style={{
                        flex: 1,
                        height: ios ? height : (height - 8),
                        justifyContent: 'flex-end',
                        paddingHorizontal: 16
                    }}
                >
                    {this.props.children}
                </View>

                <View
                    style={{
                        height: 0.6,
                        marginTop: 8,
                        backgroundColor: dark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)',
                    }}
                />
            </View>
        )
    }
}

module.exports = DrawerHeader;
