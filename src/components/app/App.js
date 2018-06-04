import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Search from '../search/Search';
import ItemDetail from '../items/ItemDetail';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header/>
          <main>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/search" component={Search}/>
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