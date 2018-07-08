import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { ChromePicker } from 'react-color';
import styles from './SearchInput.css';

export default class SearchInput extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,    
    color: PropTypes.string,
  };

  handleChangeComplete = ({ hex }) => {
    const colorMinusHash = hex.slice(1);
    this.props.history.push({ search: queryString.stringify({ color: colorMinusHash, page: 1 }) });
  };

  render() {
    const { color } = this.props;

    return (
      <section className={styles.search}>
        <label>
        Select a color to search by:
          <ChromePicker color={color || '#3f8177'} disableAlpha={true} onChangeComplete={this.handleChangeComplete}/>
        </label>
      </section>
    );
  }
}
