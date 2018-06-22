import React, { Component } from 'react';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SearchInput from './SearchInput';
import Status from './Status';
import Results from './Results';
import Items from '../items/Items';
import { getCurrentColor } from '../app/reducers';
import { updateColor } from '../app/actions';
import { getPage, getItems, getTotalResults } from './reducers';
import { loadResults } from './actions';

class Search extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    color: PropTypes.string,
    page: PropTypes.string,
    results: PropTypes.number,
    items: PropTypes.array,
    loadResults: PropTypes.func.isRequired,
    updateColor: PropTypes.func.isRequired,
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
    this.searchFromQuery(queryPostUpdate);
  }

  searchFromQuery = search => {
    const { color, page } = queryString.parse(search);
    if(color && page) {
      const { updateColor, loadResults } = this.props;
      updateColor(color);
      loadResults(color, page);
    }
  };

  render() {
    const { color, results, page, items, history } = this.props;

    return (
      <section>
        <SearchInput color={color} history={history}/>
        <Status/>
        <Results color={color} history={history} results={results} page={page}/>
        <Items items={items}/>
      </section>
    );
  }
}

export default connect(
  state => ({
    color: getCurrentColor(state),
    page: getPage(state),
    results: getTotalResults(state),
    items: getItems(state)
  }),
  { loadResults, updateColor }
)(Search);
