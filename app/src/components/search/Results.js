import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Results.css';

export default class Results extends Component {
  static propTypes = {
    color: PropTypes.string,
    page: PropTypes.string,
    loading: PropTypes.bool,
    totalResults: PropTypes.number,
    onPage: PropTypes.func
  };

  handlePage(increment) {
    const { page, onPage } = this.props;
    onPage({ page: +page + increment });
  }

  render() {

    const { totalResults, color, page, loading } = this.props;
    const totalPages = Math.ceil(totalResults / 10);    
    if(loading) return <section className="results-holder"></section>;
    return (
      <section className="results-holder">
        {totalResults !== undefined && <h2 className="results-info">{totalResults} results found for color #{color}</h2>}
        {!!totalResults &&
          <div className="page-info">
            <h2>Page {page} of {totalPages}</h2>
            <button onClick={() => this.handlePage(-1)} disabled={page === '1'}>&#10094;</button>
            <button onClick={() => this.handlePage(1)} disabled={page == totalPages}>&#10095;</button>
          </div>}
      </section>
    );
  }
}