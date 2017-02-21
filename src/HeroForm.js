import React, { Component } from 'react';
import { hashHistory } from 'react-router';

class HeroForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: -1,
      hero: {},
      message: ""
    }
  }

  componentDidUpdate(prevProps, prevState) {
    this.componentDidMount();
  }

  componentDidMount() {
    fetch("/heroes.json")
      .then((response) => response.json())
      .then((responseJson) => {

        var id = parseInt(this.props.params.id, 10);
        var hero = responseJson.heroes.find(function(element) {
          return element.id === id;
        });

        var message = "Hero found";
        if(!hero){
          message = "Hero not found";
        }

        this.setState({
          id: id,
          hero: hero,
          message: message
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

  render() {

    var hasId = (this.state.id > 0);
    var hero = this.state.hero;

    return(
      <div>
        <h2>Hero Form</h2>
        {
          (hasId && hero) ? (
            <div>
              <p>Id: {this.state.hero.id}</p>
              <p>Name: {this.state.hero.name}</p>
            </div>
          ) : (
            <p>Invalid hero ID</p>
          )
        }
        <button onClick={hashHistory.goBack} >Go back</button>
      </div>
    )
  }

}

export default HeroForm;
