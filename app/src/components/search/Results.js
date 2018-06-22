import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import './Results.css';

export default class Results extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    results: PropTypes.number,
    color: PropTypes.string,
    page: PropTypes.string,
  };

  handlePage(increment) {
    const { history, color, page } = this.props;
    const newPage = +page + increment;
    history.push({ search: queryString.stringify({ color, page: newPage }) });
  }

  render() {
    const { results, color, page } = this.props;
    const totalPages = Math.ceil(results / 10);
    return (
      <section className="results-holder">
        {results !== null && <h2 className="results-info">{results} results found for color #{color}</h2>}
        {!!results &&
          <div className="page-info">
            <h2>Page {page} of {totalPages}</h2>
            <button onClick={() => this.handlePage(-1)} disabled={page === '1'}>&#10094;</button>
            <button onClick={() => this.handlePage(1)} disabled={page == totalPages}>&#10095;</button>
          </div>}
      </section>
    );
  }
}