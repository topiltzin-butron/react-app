import React, { Component } from 'react';
import NavLink from './NavLink';

class Navigation extends Component{

  render() {
    return (
      <nav role="nav">
        <NavLink to="/">Home</NavLink> |
        <NavLink to="/dashboard">Dashboard</NavLink> |
        <NavLink to="/heroes">Heroes</NavLink> |
        <NavLink to="/theBride">The Bride</NavLink>
      </nav>
    )
  }

}

export default Navigation;
