import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Item from './Item';
import { getItems } from '../search/reducers';
import './Items.css';

class Items extends Component {
  static propTypes = {
    items: PropTypes.array
  };

  render() {
    const { items } = this.props;

    return (
      <ul>
        {items.map(item => <Item key={item.id} {...item}/>)}
      </ul>
    );
  }
}

export default connect(
  state => ({ items: getItems(state) })
)(Items);