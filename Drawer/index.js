import React from 'react';
import {
    Platform,
    Text,
    View,
} from 'react-native';
import TimerMixin from 'react-timer-mixin'
import RNDrawer from 'react-native-drawer';
import DrawerContent from './DrawerContent';
import Orientation from 'react-native-orientation';

const ios = Platform.OS === 'ios';

class Drawer extends React.Component
{
    constructor(props)
    {
        super(props);

        let orientation = Orientation.getInitialOrientation();

        this.state={
            landscape: orientation === 'LANDSCAPE',
            drawerOpen: false,
            disabled: false,
        };

        this._updateOrientation = this._updateOrientation.bind(this);
    }

    componentDidMount()
    {
        Orientation.addOrientationListener(this._updateOrientation);
    }

    componentWillUnmount()
    {
        Orientation.removeOrientationListener(this._orientationDidChange);
    }

    _updateOrientation(orientation) {
        this.setState({ landscape: orientation === 'LANDSCAPE' });
        TimerMixin.setTimeout(() => {
            this.state.drawerOpen && this._drawer.close();
        }, 400);
    }

    setDisable(disabled)
    {
        this.setState({ disabled });
    }

    open()
    {
        !this.state.disabled && this._drawer.open();
    }

    close()
    {
        !this.state.disabled && this._drawer.close();
    }

    toggle()
    {
        !this.state.disabled && (
            this.state.drawerOpen ? this._drawer.close() : this._drawer.open()
        );
    }

    render() {
        return (
            <RNDrawer
                content={ <DrawerContent {...this.props} /> }
                ref={(ref) => this._drawer = ref}
                type='overlay'
                styles={{
                    drawer: {
                      shadowColor: '#000000',
                      shadowOpacity: 0,
                      shadowRadius: 8,
                      elevation: 16
                    },
                    mainOverlay: {
                      opacity: 0,
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    }
                }}
                onOpenStart={() => {
                    this.setState({drawerOpen: true})
                }}
                onCloseStart={() => {
                    this.setState({drawerOpen: false})
                }}
                tweenHandler={ratio => ({
                    drawer: { shadowOpacity: ratio * 0.4 },
                    mainOverlay: { opacity: ratio / 2 }
                })}
                tweenDuration={300}
                tweenEasing='easeInOutSine'
                panThreshold={0.08}
                openDrawerOffset={this.state.landscape ? 0.5 : 0.2}
                panOpenMask={0.05}
                tapToClose
                negotiatePan
                useInteractionManager
                disabled={this.state.disabled}
            >
                {this.props.children}
            </RNDrawer>
        );
    }
}

module.exports = Drawer;
