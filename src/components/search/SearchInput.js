/* eslint react/no-deprecated:off */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './SearchInput.css';

export default class SearchInput extends Component {
  static propTypes = {
    searchTerm: PropTypes.string,
    onSearch: PropTypes.func.isRequired
  };

  state = {
    current: this.props.searchTerm || '#b8b8b8'
  };

  componentWillReceiveProps({ searchTerm }) {
    if(searchTerm !== this.state.current) {
      this.setState({ current: searchTerm || '#b8b8b8' });
    }
  }

  handleChange = ({ target }) => {
    this.setState({ current: target.value }, this.callSearch);
  };

  callSearch() {
    this.props.onSearch(this.state);
  }

  render() {
    const { current } = this.state;

    return (
      <section className={styles.search}>
        <label>
        Select a color to search by:
          <input
            type="color"
            value={current}
            onChange={this.handleChange}  
          />
        </label>
      </section>
    );
  }
}