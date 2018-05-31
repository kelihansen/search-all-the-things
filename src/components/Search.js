import React, { Component } from 'react';

export default class Search extends Component {
  state = {
    search: '#b8b8b8'
  };

  handleChange = ({ target }) => {
    this.setState({ search: target.value }, this.submitValue);
  };
  
  submitValue = () => {
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