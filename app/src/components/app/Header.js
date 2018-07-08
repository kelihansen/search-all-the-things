import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './Header.css';
import { getUser } from '../auth/reducers';
import { logout } from '../auth/actions';
import { getCurrentColor } from './reducers';

class Header extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    color: PropTypes.string,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired
  };

  render() {
    const { color, user, logout, history } = this.props;
    
    return (
      <header style={{ backgroundColor: color ? '#' + color : '#ffffff' }} className={styles.header}>
        <h1>Explore the Museum</h1>
        <nav>
          <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink onClick={history.location.pathname === '/search' ? e => e.preventDefault() : undefined} to="/search">Search</NavLink></li>
            <li><NavLink to="/saved">Saved</NavLink></li>
            {user ? <li><NavLink to="/" onClick={logout}>Log Out</NavLink></li>
              : <Fragment>
                <li><NavLink to="/auth/signin">Sign In</NavLink></li>
                <li><NavLink to="/auth/signup">Sign Up</NavLink></li>
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