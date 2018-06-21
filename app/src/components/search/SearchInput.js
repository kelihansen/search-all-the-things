import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { ChromePicker } from 'react-color';
import { getCurrentColor } from '../app/reducers';
import { updateColor } from '../app/actions';
import { updatePage } from './actions';
import styles from './SearchInput.css';

class SearchInput extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,    
    color: PropTypes.string,
    updateColor: PropTypes.func.isRequired,
    updatePage: PropTypes.func.isRequired
  };

  handleChangeComplete = ({ hex }) => {
    const { history, updateColor, updatePage } = this.props;
    const colorMinusHash = hex.slice(1);
    updateColor(colorMinusHash);
    updatePage('1');
    history.push({ search: queryString.stringify({ color: colorMinusHash, page: 1 }) });
  };

  render() {
    const { color } = this.props;

    return (
      <section className={styles.search}>
        <label>
        Select a color to search by:
          <ChromePicker color={color || '#3f8177'} disableAlpha={true} onChangeComplete={this.handleChangeComplete}/>
        </label>
      </section>
    );
  }
}

export default withRouter(connect(
  state => ({
    color: getCurrentColor(state),
  }),
  { updateColor, updatePage }
)(SearchInput));
