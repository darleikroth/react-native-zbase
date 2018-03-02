import React from 'react';
import PropTypes from 'prop-types';
import RN from 'react-native';

type Props = {
  color?: string;
};

class Divider extends React.PureComponent
{
  props: Props;

  render()
  {
    return <RN.View style={{ height: 1, backgroundColor: this.props.color }} />
  }
}

Divider.defaultProps = {
  color: 'rgba(0, 0, 0, .12)',
};

export default Divider;
