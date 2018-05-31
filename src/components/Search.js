import React, { Component } from 'react';

export default class Search extends Component {
  state = {
    search: '#ffffff'
  };

  handleChange = ({ target }) => {
    this.setState({ search: target.value });
    this.props.onSearch(this.state);
  };

  render() {
    const { search } = this.state;
    return (
      <label>
        Select a color to search by:
        <input
          type="color"
          value={search}
          onChange={this.handleChange}  
        />
      </label>
    );
  }
}