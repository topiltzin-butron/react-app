import React, { Component } from 'react';
import HeroDetails from './HeroDetails';

class Dashboard extends Component {

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
          heroes: responseJson.heroes.slice(1,5)
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

    id = id.replace("top_div_item_", "");
    id = id.replace("top_header_item_", "");
    id = parseInt(id, 10);

    let hero = this.state.heroes.find(function(element) {
      return element.id === id;
    });

    // alert("jala: " + hero);

    this.setState({
      message: 'Found: ' + id,
      hero: hero
    });

  }

  render() {

    const heroItems = this.state.heroes.map((hero) =>

      <a className="col-1-4" key={'top_key_item_' + hero.id} id={'top_item_' + hero.id} onClick={this.handleClick} >
        <div id={'top_div_item_' + hero.id} className="module hero">
          <h4 id={'top_header_item_' + hero.id} >{hero.name}</h4>
        </div>
      </a>

    );

    return(
      <div>
        <h3>Top heroes</h3>

        <p className="error">Message: {this.state.message}</p>
        <div className="grid grid-pad">
          {heroItems}
        </div>

        <HeroDetails>{this.state.hero}</HeroDetails>

      </div>
    );
  }

}

export default Dashboard;
