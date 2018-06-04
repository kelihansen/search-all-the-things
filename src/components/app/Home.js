import React, { Component } from 'react';
import styles from './Home.css';

export default class Home extends Component {
  render() {
    return (
      <div className={styles.home}>
        <p>I made an app!</p>
        <p>It lets you search objects in the Smithsonian Design Museum&#8217;s collection by color.</p>
        <p>It&#8217;s a work in progress.</p>
      </div>
    );
  }
}