import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Status.css';

export default class Status extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.object
  };

  render() {
    const { loading, error } = this.props;
    return (
      <section className={styles.status}>
        {loading && <h2>Retrieving results...</h2>}
        {error && <h2>Error: {error.message}</h2>}
      </section>
    );
  }
}