import React, { Component } from 'react';
import '../styles/Results.css';

export default class Results extends Component {
  handlePage(increment) {
    const { page, onPage } = this.props;
    onPage({ page: page + increment });
  }

  render() {

    const { totalResults, color, page, perPage, loading } = this.props;
    const totalPages = Math.ceil(totalResults / perPage);    
    if(loading) return <section className="results-holder"></section>;
    return (
      <section className="results-holder">
        {totalResults !== undefined && <h2 className="results-info">{totalResults} results found for color #{color}</h2>}
        {!!totalResults &&
          <div className="page-info">
            <h2>Page {page} of {totalPages}</h2>
            <button onClick={() => this.handlePage(-1)} disabled={page === 1}>&#10094;</button>
            <button onClick={() => this.handlePage(1)} disabled={page === totalPages}>&#10095;</button>
          </div>}
      </section>
    );
  }
}