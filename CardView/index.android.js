import React from 'react';
import {
    Platform,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import TouchableView from '../TouchableView';

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
                borderRadius: (borderRadius === undefined) ? 2 : borderRadius,
                elevation: (elevation === undefined) ? 2 : elevation,
            }
        });
    }

    render()
    {
        const styles = this.getInitialStyle();
        var content =
            <View style={styles.card}>
                {this.props.children}
            </View>

        return(
            this.props.noFeedback ?
                <TouchableWithoutFeedback
                    onPress={this.props.onPress}
                    onLongPress={this.props.onLongPress}
                    onLayout={this.props.onLayout}
                >
                    { content }
                </TouchableWithoutFeedback> :
                <TouchableView
                    borderRadius={styles.card.borderRadius}
                    onPress={this.props.onPress}
                    onLongPress={this.props.onLongPress}
                    onLayout={this.props.onLayout}
                >
                    { content }
                </TouchableView>
        );
    }
};

module.exports = CardView;
