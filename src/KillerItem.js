import React, { Component } from 'react';
import NavLink from './NavLink';

class KillerItem extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    var link = '/theBride/'+this.props.children.persona.id;

    return(
      <li>
        <NavLink to={link} >
          <span className="killer">
            {this.props.children.persona.name}
          </span>
        </NavLink>

      </li>

    )
  }
}

export default KillerItem;
