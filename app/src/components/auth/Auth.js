import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signin, signup } from './actions';
import { getUser } from './reducers';
import Credentials from './Credentials';

class Auth extends PureComponent {
  static propTypes = {
    user: PropTypes.object,
    signin: PropTypes.func.isRequired,
    signup: PropTypes.func.isRequired,
    location: PropTypes.object
  };

  render() {
    const { user, signin, signup, location } = this.props;
    const redirect = location.state ? location.state.from : '/';

    if(user) return <Redirect to={redirect}/>;

    return (
      <section>
        <Switch>
          <Route path="/auth/signin" render={() => (
            <div>
              <h5>No account? <Link to="/auth/signup">Sign up instead.</Link></h5>
              <Credentials action="SIGN IN" submit={signin}/>
            </div>
          )}/>
          <Route path="/auth/signup" render={() => (
            <div>
              <Credentials action="SIGN UP" submit={signup} allowName={true}/>
            </div>
          )}/>
          <Redirect to="/auth/signin"/>
        </Switch>
      </section>
    );
  }
}

export default connect(
  state => ({ user: getUser(state) }),
  { signup, signin }
)(Auth);