import React from 'react';
import { TouchableHighlight } from 'react-native';

class TouchableView extends React.Component
{
    render() {
        return (
            <TouchableHighlight
                underlayColor={this.props.underlayColor || '#E0E0E0'}
                onPress={this.props.onPress}
                onLongPress={this.props.onLongPress}
            >
                {this.props.children}
            </TouchableHighlight>
        );
    }
}

module.exports = TouchableView;
