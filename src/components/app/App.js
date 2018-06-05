import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Search from '../search/Search';
import ItemDetail from '../items/ItemDetail';
import './App.css';

export default class App extends Component {
  state = {
    color: 'ffffff'
  };

  handleColor = color => {
    this.setState({ color });
  };

  render() {
    const { color } = this.state;

    return (
      <Router>
        <div>
          <Header color={color}/>
          <main>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/search" render={({ location, history }) => {
                return <Search location={location} history={history} onColor={this.handleColor}/>;
              }}/>
              <Route path="/items/:id" render={({ match, history }) => {
                return <ItemDetail objectID={match.params.id} history={history}/>;
              }}/>
              <Redirect to="/"/>
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}