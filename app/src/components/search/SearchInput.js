/* eslint react/no-deprecated:off */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ChromePicker } from 'react-color';
import styles from './SearchInput.css';

export default class SearchInput extends Component {
  static propTypes = {
    searchTerm: PropTypes.string,
    onSearch: PropTypes.func.isRequired
  };

  state = {
    current: this.props.searchTerm ? '#' + this.props.searchTerm : '#3f8177'
  };

  componentWillReceiveProps({ searchTerm }) {
    if(searchTerm !== this.state.current) {
      this.setState({ current: searchTerm ? '#' + searchTerm : '#3f8177' });
    }
  }

  handleChangeComplete = ({ hex }) => {
    this.setState({ current: hex }, this.callSearch);
  };

  callSearch() {
    const { current } = this.state;
    const colorMinusHash = current.slice(1);
    this.props.onSearch(colorMinusHash);
  }

  render() {
    const { current } = this.state;

    return (
      <section className={styles.search}>
        <label>
        Select a color to search by:
          <ChromePicker color={current} disableAlpha={true} onChangeComplete={ this.handleChangeComplete }/>
        </label>
      </section>
    );
  }
}