import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Auth from '../auth/Auth';
import Search from '../search/Search';
import ItemDetail from '../items/ItemDetail';
import PrivateRoute from './PrivateRoute';
import Saved from '../saved/Saved';
import { connect } from 'react-redux';
import { getCheckedAuth } from '../auth/reducers';
import { attemptUserLoad } from '../auth/actions';

class App extends PureComponent {
  static propTypes = {
    attemptUserLoad: PropTypes.func.isRequired,
    checkedAuth: PropTypes.bool.isRequired
  };

  componentDidMount() {
    this.props.attemptUserLoad();
  }

  render() {
    const { checkedAuth } = this.props;

    return (
      <Router>
        <div>
          <Route component={Header}/>
          <main>
            {checkedAuth &&
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/auth" component={Auth}/>
              <PrivateRoute path="/search" component={Search}/>
              <PrivateRoute path="/items/:id" render={({ match, history }) => {
                return <ItemDetail objectID={match.params.id} history={history}/>;
              }}/>
              <PrivateRoute path="/saved" component={Saved}/>
              <Redirect to="/"/>
            </Switch>
            }
          </main>
        </div>
      </Router>
    );
  }
}

export default connect(
  state => ({ checkedAuth: getCheckedAuth(state) }),
  { attemptUserLoad }
)(App);