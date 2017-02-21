import React, { Component } from 'react';
import HeroItem from './HeroItem';
import HeroDetails from './HeroDetails';

class Heroes extends Component {

  constructor(props) {
    super(props);
    this.state = {
      heroes: [],
      message: "",
      hero: {}
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    fetch("/heroes.json")
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          message: "Heroes loaded",
          heroes: responseJson.heroes
        });

      })
      .catch((error) => {
        console.error(error);
        this.setState({
          message: 'Error: ' + error,
          heroes: []
        });

      });

  }

  handleClick(e) {
    e.preventDefault();
    var id = e.target.id;
    id = id.replace("item_span_", "");
    id = id.replace("item_", "");
    id = parseInt(id, 10);

    let hero = this.state.heroes.find(function(element) {
      return element.id === id;
    });

    this.setState({
      message: 'Found: ' + id,
      hero: hero
    });

  }

  render() {

    const heroItems = this.state.heroes.map((hero) =>
      <HeroItem key={'hero_' + hero.id} clickHandler={this.handleClick} >{hero}</HeroItem>
    );

    return(
      <div>
        <h1>Heroes</h1>

        <p className="error">Message: {this.state.message}</p>
        <ul className="heroes" >
          {heroItems}
        </ul>

        <HeroDetails>{this.state.hero}</HeroDetails>
      </div>
    );
  }


}

export default Heroes;
