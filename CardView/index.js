import React from 'react';
import {
    Platform,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import TouchableView from '../TouchableView';

const ios = Platform.OS === 'ios';

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
                shadowColor: ios ? 'rgba(0, 0, 0, 0.3)' : undefined,
                shadowOffset: ios ? { width: 0.5, height: (elevation || 2) * .65 } : undefined,
                shadowOpacity: ios ? 1 : undefined,
                shadowRadius: ios ? ((elevation || 2) * .65) : undefined,
                elevation: !ios ? elevation || 2 : undefined,
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
