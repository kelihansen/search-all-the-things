import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Item.css';

export default class Item extends Component {
  static propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    images: PropTypes.array
  };

  render() {
    const { id, title, description, images } = this.props;

    return (
      <li>
        <Link to={`/items/${id}`}>
          <img src={images[0].n.url} alt={description}/>
          <h3>{title}</h3>
        </Link>
      </li>
    );
  }
}