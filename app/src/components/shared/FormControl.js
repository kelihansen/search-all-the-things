import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class FormControl extends PureComponent {
  static propTypes = {
    label: PropTypes.string,
    children: PropTypes.element
  }

  render() {
    const { label, children } = this.props;

    return (
      <div>
        {label && <label>{label}:</label>}
        <div>
          {children}
        </div>
      </div>
    );
  }
}