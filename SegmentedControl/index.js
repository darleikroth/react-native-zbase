import React from 'react';
import {
  SegmentedControlIOS,
  TouchableHighlight,
  StyleSheet,
  Platform,
  View,
  Text,
} from 'react-native';

type Props = {
  /**
   * If false the user won't be able to interact with the control. Default value is true.
   */
  enabled?: boolean;
  /**
   * The index in `props.values` of the segment to be (pre)selected.
   */
  selectedIndex?: number;
  /**
   * The labels for the control's segment buttons, in order.
   */
  values?: string[];
  /**
   * Accent color of the control.
   */
  tintColor?: string;
  /**
   * Callback that is called when the user taps a segment. 
   * Passes the selected index as an argument.
   */
  onChange(fn: (selectedIndex: number) => void): void;
  /**
   * Callback that is called when the user taps a segment. 
   * Passes the segment's value as an argument.
   */
  onValueChange(fn: (value: string) => void): void;
};

class SegmentedControl extends React.Component
{
  props: Props;

  render()
  {
    const {
      enabled,
      selectedIndex,
      values,
      tintColor,
      onChange,
      onValueChange
    } = this.props;

    return Platform.select({
      ios: (
        <SegmentedControlIOS
          enabled={enabled}
          values={values}
          selectedIndex={selectedIndex}
          tintColor={tintColor}
          onChange={event => onChange && onChange(event.nativeEvent.selectedSegmentIndex)}
          onValueChange={value => onValueChange && onValueChange(value)}
        />
      ),
      android: (
        <SegmentedControlAndroid {...this.props} />
      ),
    });
  }
}

class SegmentedControlAndroid extends React.PureComponent
{
  props: Props;

  render()
  {
    const {
      enabled,
      selectedIndex,
      values,
      tintColor,
      onChange,
      onValueChange
    } = this.props;

    return (
      <View style={{flexDirection: 'row'}} >
        {values.map((val, i, arr) => {
          const custom = this.getStyles(i, arr, selectedIndex, tintColor);

          return (
            <View key={`key-${i}`} style={{flex: 1}} >
              <TouchableHighlight
                onPress={() => {
                  (enabled && onChange) && onChange(i);
                  onValueChange && onValueChange(val);
                }}
                underlayColor={tintColor}
                activeOpacity={0.85}
                style={custom.touchable} >
                <View style={custom.container} >
                  <Text style={custom.title} >
                    {val}
                  </Text>
                </View>
              </TouchableHighlight>
            </View>
          );
        })}
      </View>
    );
  }

  getStyles(i, arr, selectedIndex, tint)
  {
    const start = (i === 0), end = (i === (arr.length-1)), selected = (i === selectedIndex),
    borderRadius = start ? styles.start : end ? styles.end : styles.middle;

    if (selected) {
      return {
        touchable: borderRadius,
        container: [styles.base, borderRadius, {backgroundColor: tint, borderColor: tint}],
        title: [styles.title, {color: 'white'}],
      };
    }
    return {
      touchable: borderRadius,
      container: [styles.base, borderRadius, {backgroundColor: 'white', borderColor: tint}],
      title: [styles.title, {color: tint}],
    };
  }

  getTitleStyle(selected, color)
  {
    return [styles.title, {color: selected ? 'white' : color}];
  }
}

const styles = StyleSheet.create({
  base: {
    height: 28,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    height: 28,
  },
  start: {
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
    borderRightWidth: 0,
  },
  end: {
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
    borderLeftWidth: 0,
  },
  middle: {
    borderRightWidth: 0,
  },
  title: {
    fontSize: 13,
  },
});

SegmentedControl.defaultProps = {
  enabled: true,
  selectedIndex: 0,
};

module.exports = SegmentedControl;