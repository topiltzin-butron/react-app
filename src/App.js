import React, { Component } from 'react';
import Navigation from './Navigation';
import logo from './logo.svg';
import Heroes from './Heroes';
import Dashboard from './Dashboard';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>

        <Navigation />
        {this.props.children}

      </div>
    );
  }
}

export default App;
