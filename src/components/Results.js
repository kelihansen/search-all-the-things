import React, { Component } from 'react';
import '../styles/Results.css';

export default class Results extends Component {
  render() {

    const { totalResults, color, page, perPage } = this.props;
    const totalPages = Math.ceil(totalResults / perPage);    
    
    return (
      <section>
        {totalResults !== undefined && <h2>{totalResults} results found for color #{color}</h2>}
        {!!totalResults &&
          <div>
            <h2>Page {page} of {totalPages}</h2>
            <button onClick={() => this.handlePage(-1)} disabled={page === 1}>&#10094;</button>
            <button onClick={() => this.handlePage(1)} disabled={page === totalPages}>&#10095;</button>
          </div>}
      </section>
    );
  }
}