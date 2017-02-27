import React from 'react';
import { TouchableHighlight } from 'react-native';

class TouchableView extends React.Component
{
    render() {
        return (
            <TouchableHighlight
                style={{ borderRadius: this.props.borderRadius || undefined }}
                underlayColor={this.props.underlayColor || '#E0E0E0'}
                onPress={this.props.onPress}
                onLongPress={this.props.onLongPress}
                onLayout={this.props.onLayout}
            >
                {this.props.children}
            </TouchableHighlight>
        );
    }
}

module.exports = TouchableView;
