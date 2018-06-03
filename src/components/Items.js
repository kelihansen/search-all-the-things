import React, { Component } from 'react';
import Item from './Item';
import './Items.css';

export default class Items extends Component {
  render() {
    const { items } = this.props;

    return (
      <ul>
        {items.map((item, i) => <Item key={i} item={item}/>)}
      </ul>
    );
  }
}