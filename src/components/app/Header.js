import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.css';

export default class Header extends Component {
  render() {
    return (
      <header className={styles.header}>
        <h1>Explore the Cooper Hewitt Smithsonian Design Museum</h1>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/search">Search</Link></li>
          </ul>
        </nav>
      </header>
    );
  }
}