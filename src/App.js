import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import ActivityList from './components/ActivityList';

import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <nav className="navbar">
            <div style={{ width: '100%',  borderBottom:'1px solid lightGray', padding: 10 }}>
              <i className="fa fa-search" />
              <span style={{ paddingLeft: 10, fontWeight: 'bold' }}>Search...</span>
            </div>
          </nav>
          <main className="App">
            <div>
              <Switch>
                <Route exact path="/" component={ActivityList} />
              </Switch>
            </div>
          </main>
        </Router>
      </Provider>
    );
  }
}

export default App;
