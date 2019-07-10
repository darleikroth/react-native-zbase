import React from 'react'
import SearchView from './SearchView'

interface Props {
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
}

const Search = (props: Props) => <SearchView {...props} />

export default Search
