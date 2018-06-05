import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import retrieve from '../../services/ch-api';
import SearchInput from './SearchInput';
import Status from './Status';
import Results from './Results';
import Items from '../items/Items';
import './Search.css';

const getSearch = location => location ? location.search : '';

export default class Search extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    onColor: PropTypes.func
  };

  state = {
    searchTerms: {
      color: '',
      page: 0,
      perPage: 0
    },
    loading: false,
    error: null,
    totalResults: null,
    items: []
  };

  componentDidMount() {
    this.props.location.search && this.searchFromQuery(this.props.location.search);
  }

  componentDidUpdate({ location }) {
    const next = getSearch(this.props.location);
    const current = getSearch(location);
    if(current === next) return;
    this.searchFromQuery(next);
  }

  searchFromQuery = query => {
    if(!query) {
      this.setState(prevState => ({
        searchTerms: { ...prevState.searchTerms, color: '' },
        items: [],
        totalResults: null,
        error: null })
      );
      this.props.onColor();
      return;    
    }
    const searchTerms = queryString.parse(query);
    this.setState({ searchTerms });

    this.setState({ loading: true });

    const { color, page, perPage } = searchTerms;
    this.props.onColor(color);
    retrieve(color, page, perPage)
      .then(({ objects, total, page, per_page: perPage }) => {
        this.setState(prevState => ({
          searchTerms: { ...prevState.searchTerms, page, perPage },
          items: objects,
          totalResults: total,
          error: null })
        );
      }, error => {
        this.setState({ error });
      })
      .then(() => this.setState({ loading: false }));
  };

  handleSearch = searchTerm => {
    this.setState({ error: null });
    this.props.history.push({
      search: searchTerm ? queryString.stringify({ color: searchTerm, page: 1 }) : ''
    });
  };

  handlePage = ({ page }) => {
    const { color } = this.state.searchTerms;
    this.props.history.push({ search: queryString.stringify({ color, page }) });
  };

  render() {
    const { searchTerms, loading, error, totalResults, items } = this.state;
    const { color, page, perPage } = searchTerms || '';

    return (
      <section>
        <SearchInput searchTerm={color} onSearch={this.handleSearch}/>
        <Status loading={loading} error={error}/>
        {totalResults !== null && <Results
          color={color}
          page={page}
          perPage={perPage}
          loading={loading}
          totalResults={totalResults}
          onPage={this.handlePage}/>}
        <Items items={items}/>
      </section>
    );
  }
}