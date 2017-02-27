import React from 'react';
import {
    TouchableNativeFeedback,
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
                flex: 1,
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
                borderRadius: 2,
                elevation: elevation || 2,
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
                <TouchableNativeFeedback
                    onPress={this.props.onPress}
                    onLongPress={this.props.onLongPress}
                    background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
                    useForeground={true}
                    onLayout={this.props.onLayout}
                >
                    { content }
                </TouchableNativeFeedback>
        );
    }
};

module.exports = CardView;
