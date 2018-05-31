import React, { Component } from 'react';
import retrieve from '../services/ch-api';
import Search from './Search';

export default class App extends Component {
  state = {
    color: '',
    error: null,
    page: 1,
    perPage: 10,
    totalResults: 0,
    objects: []
  };

  searchMuseum = () => {
    const { color, page, perPage } = this.state;

    retrieve(color, page, perPage)
      .then(({ objects, total }) => {
        this.setState({ objects, totalResults: total, error: null });
      }, error => {
        this.setState({ error });
      });
  };

  handleSearch = ({ search }) => {
    const colorMinusHash = search.slice(1);
    this.setState({ color: colorMinusHash }, this.searchMuseum);
  };

  render() {
    return (
      <main>
        <header>
          <h1>Explore the Museum</h1>
          <Search onSearch={this.handleSearch}/>
        </header>
      </main>
    );
  }
}