import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Item from './Item';
import './Items.css';

export default class Items extends Component {
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