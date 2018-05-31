import React, { Component } from 'react';
import retrieve from '../services/ch-api';
import Search from './Search';
import Results from './Results';
import Items from './Items';
import '../styles/App.css';

export default class App extends Component {
  state = {
    color: '',
    error: null,
    page: 1,
    perPage: 10,
    totalResults: undefined,
    items: []
  };

  searchMuseum = () => {
    const { color, page, perPage } = this.state;

    retrieve(color, page, perPage)
      .then(({ objects, total }) => {
        this.setState({ items: objects, totalResults: total, error: null });
      }, error => {
        this.setState({ error });
      });
  };

  handleSearch = ({ search }) => {
    const colorMinusHash = search.slice(1);
    this.setState({ color: colorMinusHash }, this.searchMuseum);
  };

  render() {
    const { color, page, perPage, totalResults, items } = this.state;
    return (
      <main>
        <header>
          <h1 style={{ backgroundColor: '#' + color }}>Explore the Cooper Hewitt Smithsonian Design Museum</h1>
          <Search onSearch={this.handleSearch}/>
        </header>
        <section>
          <Results
            totalResults={totalResults}
            color={color}
            page={page}
            perPage={perPage}
            onPage={this.handlePage}
          />
          <Items items={items}/>
        </section>
      </main>
    );
  }
}