import React from 'react';
import { TouchableHighlight } from 'react-native';

class TouchableView extends React.Component
{
    render() {
        let ripple = this.props.dark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)';

        return (
            <TouchableHighlight
                style={{ borderRadius: this.props.borderRadius || undefined }}
                underlayColor={this.props.underlayColor || ripple}
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
