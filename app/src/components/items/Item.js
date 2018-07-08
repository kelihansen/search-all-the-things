import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Item.css';

export default class Item extends Component {
  static propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    smallImageUrl: PropTypes.string
  };

  render() {
    const { id, title, smallImageUrl } = this.props;

    return (
      <li>
        <Link to={`/items/${id}`}>
          <img src={smallImageUrl} alt={title}/>
          <h3>{title}</h3>
        </Link>
      </li>
    );
  }
}