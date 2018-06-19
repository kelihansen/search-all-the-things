import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { getMatchingItems } from '../../services/api';
import SearchInput from './SearchInput';
import Status from './Status';
import Results from './Results';
import Items from '../items/Items';

const getSearch = location => location ? location.search : '';

export default class Search extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    onColor: PropTypes.func
  };

  state = {
    color: '',
    page: 0,
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
      this.setState({
        color: '',
        items: [],
        totalResults: null,
        error: null
      });
      this.props.onColor('ffffff');
      return;    
    }
    const { color, page } = queryString.parse(query);
    this.setState({ color, page });

    this.setState({ loading: true });

    this.props.onColor(color);
    getMatchingItems(color, page)
      .then(({ items, totalResults }) => {
        this.setState({
          items,
          totalResults,
          error: null
        });
      }, error => {
        this.setState({ error });
      })
      .then(() => this.setState({ loading: false }));
  };

  handleSearch = searchTerm => {
    if(!searchTerm) return;
    this.setState({ error: null });
    this.props.history.push({
      search: queryString.stringify({ color: searchTerm, page: 1 })
    });
  };

  handlePage = ({ page }) => {
    const { color } = this.state;
    this.props.history.push({ search: queryString.stringify({ color, page }) });
  };

  componentWillUnmount() {
    this.props.onColor('ffffff');
  }

  render() {
    const { loading, error, totalResults, items, color, page } = this.state;

    return (
      <section>
        <SearchInput searchTerm={color} onSearch={this.handleSearch}/>
        <Status loading={loading} error={error}/>
        {totalResults !== null && <Results
          color={color}
          page={page}
          loading={loading}
          totalResults={totalResults}
          onPage={this.handlePage}/>}
        <Items items={items}/>
      </section>
    );
  }
}