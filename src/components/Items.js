import React, { Component } from 'react';
import Item from './Item';

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