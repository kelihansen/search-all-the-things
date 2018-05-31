import React, { Component } from 'react';
import retrieve from '../services/ch-api';
import Search from './Search';
import Results from './Results';
import Items from './Items';
import '../styles/App.css';

export default class App extends Component {
  state = {
    color: '',
    loading: false,
    error: null,
    page: 1,
    perPage: 10,
    totalResults: undefined,
    items: []
  };

  searchMuseum = () => {
    const { color, page, perPage } = this.state;

    this.setState({ loading: true });

    retrieve(color, page, perPage)
      .then(({ objects, total }) => {
        this.setState({ items: objects, totalResults: total, error: null });
      }, error => {
        this.setState({ error });
      })
      .then(() => this.setState({ loading: false }));
  };

  handleSearch = ({ search }) => {
    const colorMinusHash = search.slice(1);
    this.setState({ color: colorMinusHash }, this.searchMuseum);
  };

  handlePage = ({ page }) => {
    this.setState({ page }, this.searchMuseum);
  };

  render() {
    const { color, loading, error, page, perPage, totalResults, items } = this.state;
    return (
      <div>
        <header>
          <h1 style={{ backgroundColor: '#' + color }}>Explore the Cooper Hewitt Smithsonian Design Museum</h1>
          <Search onSearch={this.handleSearch}/>
        </header>
        <main>
          <section>
            {loading && <h2>Retrieving results...</h2>}
            {error && <h2>Error: {error.message}</h2>}
          </section>
          <section>
            <Results
              loading={loading}
              totalResults={totalResults}
              color={color}
              page={page}
              perPage={perPage}
              onPage={this.handlePage}/>
            <Items items={items}/>
          </section>
        </main>
      </div>
    );
  }
}