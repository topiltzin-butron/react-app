import React, { Component } from 'react';
import NavLink from './NavLink';

class HeroDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hero: {}
    }
  }

  render() {

    var hasId = (this.props.children.id);
    var link = "/hero/" + this.props.children.id;

    return(
      <div>
        <h2>Hero Details</h2>
        <p>{this.props.children.name}</p>

        {
          hasId ? (
            <NavLink to={link} >More details of {this.props.children.name}</NavLink>
          ) : (
            null
          )
        }

      </div>
    )
  }

}

export default HeroDetails;
