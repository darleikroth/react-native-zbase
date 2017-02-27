import React from 'react';
import { TouchableNativeFeedback } from 'react-native';

class TouchableView extends React.Component
{
    render() {
        return (
            <TouchableNativeFeedback
                onPress={this.props.onPress}
                onLongPress={this.props.onLongPress}
                background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
                useForeground={true}
            >
                {this.props.children}
            </TouchableNativeFeedback>
        );
    }
}

module.exports = TouchableView;
