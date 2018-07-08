import React, { Component, } from 'react';
import styles from './Home.css';

export default class Home extends Component {
  render() {
    return (
      <div className={styles.home}>
        <p>I made an app using React!</p>
        <p>It lets you search objects in the <a href="https://www.cooperhewitt.org/" target="_blank" rel="noopener noreferrer">Smithsonian Design Museum&#8217;s</a> collection by color.</p>
      </div>
    );
  }
}
