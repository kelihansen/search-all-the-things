import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getItem } from '../../services/ch-api';
import styles from './ItemDetail.css';

export default class ItemDetail extends Component {
  static propTypes = {
    objectID: PropTypes.string.isRequired,
    history: PropTypes.object
  };

  state = {
    item: null
  };

  componentDidMount() {
    getItem(this.props.objectID)
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

    return (

      <article className={styles['item-detail']}>
        <div>
          <img src={item.object.images[0].z.url} alt={item.object.title}/>
          <h3>{item.object.title}</h3>
          <p><span>{item.object.medium}</span></p>
          <p>{item.object.description}</p>
        </div>
        <a onClick={this.handleBack}><span>back</span></a>
      </article>
    );
  }
}