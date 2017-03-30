import React from 'react';
import {
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

class CardView extends React.Component
{
    getInitialStyle()
    {
        var {
            width,
            height,
            padding,
            paddingVertical,
            paddingHorizontal,
            marginTop,
            marginBottom,
            marginVertical,
            marginHorizontal,
            backgroundColor,
            borderRadius,
            elevation,
        } = this.props;

        if (padding >= 0) {
            paddingVertical = padding;
            paddingHorizontal = padding;
        } else {
            paddingVertical = paddingVertical || 16;
            paddingHorizontal = paddingHorizontal || 16;
        }

        return({
            card: {
                flexWrap: 'wrap',
                width: width || undefined,
                height: height || undefined,
                paddingVertical: paddingVertical,
                paddingHorizontal: paddingHorizontal,
                marginTop: marginTop || undefined,
                marginBottom: marginBottom || undefined,
                marginVertical: marginVertical || undefined,
                marginHorizontal: marginHorizontal || undefined,
                backgroundColor: backgroundColor || '#FFF',
                borderRadius: borderRadius || 2,
                shadowColor: 'black',
                shadowOpacity: 0.2,
                shadowRadius: (elevation || 2) * 0.5,
                shadowOffset: {height: (elevation || 2) * 0.67},
            }
        });
    }

    render()
    {
        const styles = this.getInitialStyle();

        return(
            this.props.noFeedback ?
                <TouchableWithoutFeedback
                    onPress={this.props.onPress}
                    onLongPress={this.props.onLongPress}
                    onLayout={this.props.onLayout}
                >
                    <View style={styles.card}>
                        {this.props.children}
                    </View>
                </TouchableWithoutFeedback> :
                <TouchableOpacity
                    activeOpacity={0.4}
                    onPress={this.props.onPress}
                    onLongPress={this.props.onLongPress}
                >
                    <View style={styles.card} onLayout={this.props.onLayout}>
                        {this.props.children}
                    </View>
                </TouchableOpacity>
        );
    }
};

module.exports = CardView;
