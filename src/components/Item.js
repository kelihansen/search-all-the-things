import React, { Component } from 'react';
import '../styles/Item.css';

export default class Item extends Component {
  render() {
    const { title, description, images } = this.props.item;

    return (
      <li>
        <img src={images[0].n.url} alt={description}/>
        <h3>{title}</h3>
      </li>
    );
  }
}