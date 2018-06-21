import React, { Component } from 'react';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SearchInput from './SearchInput';
import Status from './Status';
import Results from './Results';
import Items from '../items/Items';
import { getCurrentColor } from '../app/reducers';
import { getPage } from './reducers';
import { loadResults } from './actions';

class Search extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    color: PropTypes.string,
    page: PropTypes.string,
    loadResults: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { location, color, page } = this.props;
    const directQuery = location.search ? queryString.parse(location.search) : null;
    const storedQuery = color && page ? { color, page } : null;
    const queryObject = directQuery || storedQuery;
    if(queryObject) this.searchFromQuery(queryObject);
  }

  componentDidUpdate({ location }) {
    const queryPreUpdate = location.search;
    const queryPostUpdate = this.props.location.search;
    if(queryPreUpdate === queryPostUpdate) return;
    this.searchFromQuery(queryString.parse(queryPostUpdate));
  }

  searchFromQuery = queryObject => {
    const { color, page } = queryObject;
    this.props.loadResults(color, page);
  };

  render() {
    return (
      <section>
        <SearchInput/>
        <Status/>
        <Results/>
        <Items/>
      </section>
    );
  }
}

export default connect(
  state => ({
    color: getCurrentColor(state),
    page: getPage(state)
  }),
  { loadResults }
)(Search);
