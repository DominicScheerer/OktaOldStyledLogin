import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';

import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Profile from './components/pages/Profile';
import Login from './components/auth/Login';

import './App.css';

//pathing
function onAuthRequired({ history }) {
  history.push('/login');
}

class App extends Component {
  render() {
    return (
      <Router>
        <Security
          issuer="https://dev-58784824.okta.com/oauth2/default"
          client_id="0oa70lvln8v35F2wT5d7"
          redirect_uri={window.location.origin}
          // accepts a function when you can not log into profile
          onAuthRequired={onAuthRequired}
        >
          <div className="App">
            <Navbar />
            <div className="container">
              <Route path="/" exact={true} component={Home} />
              {/* okta must be logged in to view profile */}
              <SecureRoute path="/profile" exact={true} component={Profile} />
              <Route
                path="/login"
                render={() => (
                  <Login baseUrl="https://dev-58784824.okta.com" />
                )}
              />

              <Route path="/implicit/callback" component={ImplicitCallback} />
            </div>
          </div>
        </Security>
      </Router>
    );
  }
}

export default App;
