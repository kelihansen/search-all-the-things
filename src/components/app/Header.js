import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Header.css';

export default class Header extends Component {
  static propTypes = {
    color: PropTypes.string
  };

  render() {
    const { color } = this.props;

    return (
      <header style={{ backgroundColor: '#' + color }} className={styles.header}>
        <h1>Explore the Museum</h1>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/search">New Search</Link></li>
          </ul>
        </nav>
      </header>
    );
  }
}