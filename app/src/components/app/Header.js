import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './Header.css';
import { getUser } from '../auth/reducers';
import { logout } from '../auth/actions';
import { getCurrentColor } from './reducers';

class Header extends Component {
  static propTypes = {
    color: PropTypes.string,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired
  };

  render() {
    const { color, user, logout } = this.props;

    return (
      <header style={{ backgroundColor: '#' + color }} className={styles.header}>
        <h1>Explore the Museum</h1>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/search">New Search</Link></li>
            <li><Link to="/saved">Saved</Link></li>
            
            {user ? <li><Link to="/" onClick={logout}>Log Out</Link></li>
              : <Fragment>
                <li><Link to="/auth/signin">Sign In</Link></li>
                <li><Link to="/auth/signup">Sign Up</Link></li>
              </Fragment>}
            
          </ul>
        </nav>
      </header>
    );
  }
}

export default connect(
  state => ({
    user: getUser(state),
    color: getCurrentColor(state)
  }),
  { logout }
)(Header);