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
import { loadResults, updatePage } from './actions';
import { updateColor } from '../app/actions';

class Search extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    color: PropTypes.string,
    page: PropTypes.string,
    loadResults: PropTypes.func.isRequired,
    updateColor: PropTypes.func.isRequired,
    updatePage: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { history, location, color, page } = this.props;

    if(location.search) this.searchFromQuery(location.search);
    else if(color && page) history.replace({ search: queryString.stringify({ color, page }) });
  }

  componentDidUpdate({ location }) {
    const queryPreUpdate = location.search;
    const queryPostUpdate = this.props.location.search;
    if(queryPreUpdate === queryPostUpdate) return;
    this.searchFromQuery(this.props.location.search);
  }

  searchFromQuery = query => {
    const { color, page } = queryString.parse(query);
    if(color && page) {
      const { updateColor, updatePage, loadResults } = this.props;
      updateColor(color);
      updatePage(page);
      loadResults(color, page);
    }
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
  { loadResults, updateColor, updatePage }
)(Search);
