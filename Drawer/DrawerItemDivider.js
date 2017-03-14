import React from 'react';
import { Platform, View, Text } from 'react-native';

class DrawerItemDivider extends React.Component
{
    render()
    {
        let dark = this.props.dark;

        if (this.props.subtitle) {
            return(
                <View
                    style={{
                        height: 48,
                        marginTop: 8,
                        paddingHorizontal: 16,
                        borderTopWidth: 0.5,
                        borderTopColor: dark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)',
                        justifyContent: 'center'
                    }}
                >
                    <Text
                        style={{
                            fontSize: 14,
                            color: dark ? 'rgba(255,255,255,0.70)' : 'rgba(0,0,0,0.54)',
                            fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue' : 'Roboto',
                            fontWeight: '500'
                        }}
                    >
                        {this.props.subtitle}
                    </Text>
                </View>
            );
        }

        return(
            <View
                style={{
                    marginVertical: 8,
                    borderBottomWidth: 0.5,
                    borderBottomColor: dark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'
                }}
            />
        );
    }
}

module.exports = DrawerItemDivider;
