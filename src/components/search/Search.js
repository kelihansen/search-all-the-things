/* eslint react/no-deprecated:off */
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
    location: PropTypes.object.isRequired
  };

  state = {
    searchTerms: {
      color: '',
      page: 0,
      perPage: 0
    },
    loading: false,
    error: null,
    totalResults: 0,
    items: []
  };

  componentDidMount() {
    if(this.props.location.search) this.searchFromQuery(this.props.location.search);
  }

  componentWillReceiveProps({ location }) {
    const next = getSearch(location);
    const current = getSearch(this.props.location);
    if(current === next) return;
    this.searchFromQuery(next);
  }

  searchFromQuery = query => {
    const searchTerms = queryString.parse(query);
    this.setState({ searchTerms });
    if(!searchTerms) return;

    this.setState({ loading: true });

    const { color, page, perPage } = searchTerms;
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
    this.setState(prevState => ({ searchTerms: { ...prevState.searchTerms, page } }), this.searchFromQuery);
  };

  render() {
    const { searchTerms, loading, error, totalResults, items } = this.state;
    const { color, page, perPage } = searchTerms || '';

    return (
      <section>
        <SearchInput searchTerm={color} onSearch={this.handleSearch}/>
        {(loading || error) && <Status loading={loading} error={error}/>}
        {searchTerms && searchTerms.color && <Results
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