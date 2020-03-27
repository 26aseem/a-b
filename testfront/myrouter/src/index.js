import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import user from './user';
import visit from './visit';
import notfound from './notfound';


import {Route, Link, Switch, BrowserRouter as Router} from "react-router-dom";

const routing = (
  <Router>
    <div>
      <ul>
        <li><Link to="/app">Home</Link></li>
        <li><Link to="/user">User</Link></li>
        <li><Link to="/visit">visit</Link></li>
      </ul>
    </div>

    <Switch>
    <Route exact path="/app" component={App}/>
    <Route path="/user" component={user}/>
    <Route path="/visit" component={visit}/>
    <Route component={notfound}/>
  
  </Switch>
  </Router>
);

ReactDOM.render(
  routing,
  document.getElementById('root')
);


