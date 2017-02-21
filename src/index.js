import React from 'react';
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router';
import App from './App';
import Heroes from './Heroes';
import Dashboard from './Dashboard';
import HeroForm from './HeroForm';
import TheBride from './TheBride';
import KillerDetails from './KillerDetails';
import KillerForm from './KillerForm';
import './index.css';

render(
  (
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/heroes" component={Heroes} />
        <Route path="/hero/:id" component={HeroForm} />
        <Route path="/theBride" component={TheBride} />
        <Route path="/theBride/add" component={KillerForm} />
        <Route path="/theBride/:id" component={KillerDetails} />
      </Route>
    </Router>
  ), document.getElementById('root')
);
