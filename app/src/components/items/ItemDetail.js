import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getItemById } from '../../services/api';
import styles from './ItemDetail.css';

export default class ItemDetail extends Component {
  static propTypes = {
    objectID: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired
  };

  state = {
    item: null
  };

  componentDidMount() {
    getItemById(this.props.objectID)
      .then(item => this.setState({ item }));
  }

  handleBack = event => {
    event.preventDefault();
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { item } = this.state;

    if(item === null) return null;

    const { largeImageUrl, title, medium, description } = item;

    return (
      <article className={styles['item-detail']}>
        <div>
          <img src={largeImageUrl} alt={title}/>
          <h3>{title}</h3>
          <p><span>{medium}</span></p>
          <p>{description}</p>
        </div>
        <a onClick={this.handleBack}><span>back to search</span></a>
      </article>
    );
  }
}