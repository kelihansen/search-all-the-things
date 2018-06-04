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
      page: null,
      perPage: null
    },
    loading: false,
    error: null,
    totalResults: undefined,
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
        this.setState({ items: objects, totalResults: total, error: null });
        this.setState(prevState => ({ searchTerms: { ...prevState.searchTerms, page, perPage } }));
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
    const { color, page, perPage } = searchTerms ? searchTerms : '';

    return (
      <section>
        <SearchInput searchTerm={color} onSearch={this.handleSearch}/>
        <Status loading={loading} error={error}/>
        <Results
          loading={loading}
          totalResults={totalResults}
          color={color}
          page={page}
          perPage={perPage}
          onPage={this.handlePage}/>
        <Items items={items}/>
      </section>
    );
  }
}