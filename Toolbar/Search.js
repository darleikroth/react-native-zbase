import React from 'react';
import SearchView from './SearchView'

type Props = {
  /**
   * Title of header and hint for placeholder
   */
  title: string;
  /**
   * Tint color for the fields.
   */
  tintColor?: string;
  /**
   * The color of the underlay that will show through when the touch is active.
   */
  underlayColor?: string;
  /**
   * Callback that is called when the text input's text changes.
   * Changed text is passed as an argument to the callback handler.
   */
  onChangeText(fn: (text: string) => void): void;
};

class Search extends React.Component
{
  props: Props;

  componentDidMount() {
    console.warn('Deprecated. This component will be removed in the future')
  }

  render()
  {
    return <SearchView {...this.props} />
  }
}

export default Search;
