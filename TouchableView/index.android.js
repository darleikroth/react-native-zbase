import React from 'react';
import { TouchableNativeFeedback } from 'react-native';

class TouchableView extends React.Component
{
    render() {
        let ripple = this.props.dark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)';

        return (
            <TouchableNativeFeedback
                style={{ borderRadius: this.props.borderRadius || undefined }}
                onPress={this.props.onPress}
                onLongPress={this.props.onLongPress}
                background={TouchableNativeFeedback.Ripple(
                    this.props.underlayColor || ripple, true
                )}
                useForeground={true}
                onLayout={this.props.onLayout}
            >
                {this.props.children}
            </TouchableNativeFeedback>
        );
    }
}

module.exports = TouchableView;
