import React, { Component } from 'react';
import NavLink from './NavLink';
import KillerItem from './KillerItem';
import { browserHistory } from 'react-router';

class TheBride extends Component {

  constructor(props) {
    super(props);

    this.state = {
      killers: []
    };

  }

  componentDidMount() {

    fetch('http://localhost:8080/thebride/persona/', {
      method: 'GET'
    }).then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          message: "Killers loaded",
          killers: responseJson
        });

      })
      .catch((error) => {

        alert("error: " + error);
        // TODO set state
        console.error(error);
        this.setState({
          message: 'Error: ' + error,
          killers: []
        });

      });

  }

  render() {

    var link = '/theBride/add';
    const killerItems = this.state.killers.map((killer) =>
      <KillerItem key={'killer_' + killer.persona.id} >{killer}</KillerItem>
    );

    return (
        <div>
          <h1>The Bride characters</h1>
          <br />
          <NavLink to='/theBride/add' >Add killer</NavLink>
          <br />
          <ul className="killers" >
            {killerItems}
          </ul>
        </div>
    )
  }

}

export default TheBride;
