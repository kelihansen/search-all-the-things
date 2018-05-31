import React, { Component } from 'react';

export default class Results extends Component {
  render() {
    const { totalResults, color, page, perPage } = this.props;
    
    return (
      <section>
        {!!totalResults && <h2>{totalResults} results found for color #{color}</h2>}
      </section>
    );
  }
}