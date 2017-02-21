import React, { Component } from 'react';
import NavLink from './NavLink';

class KillerForm extends Component {

  constructor(props) {
    super(props);

    if(props.killer){
      this.state = {
        killer: Object.assign({}, props.killer),
        message: '',
        editMode: true
      };

    } else {
      this.state = {
        killer: Object.assign({}, KILLER),
        message: '',
        editMode: false
      };
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCodeChange = this.handleCodeChange.bind(this);
    this.handleActorChange = this.handleActorChange.bind(this);
    this.handleWeaponChange = this.handleWeaponChange.bind(this);
    this.handleGroupChange = this.handleGroupChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const canBeSubmitted = this.canBeSubmitted();

    alert("event: " + event
      + " id: " + this.state.killer.id
      + " name: " + this.state.killer.name
      + " codeName: " + this.state.killer.codeName
      + " actorName: " + this.state.killer.actorName
      + " weaponOfChoice: " + this.state.killer.weaponOfChoice
      + " group: " + this.state.killer.group
      + " canBeSubmitted: " + canBeSubmitted);

      if(canBeSubmitted) {

        var link = 'http://localhost:8080/thebride/persona';
        var method = 'POST';
        if(this.state.editMode) {
          link = link + '/' + this.state.killer.id;
          method = 'PUT';
        }

        alert("link: " + link + "\nmethod: " + method);

        fetch(link, {
          method: method,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.state.killer)
        }).then((response) => response.json())
          .then((responseJson) => {

            if(!this.state.editMode){
              this.setState({
                message: "Killer saved",
                killer: Object.assign({}, KILLER)
              });

            } else {
              alert("GO BACK TO NO EDIT MODE");
              this.props.onSuccess()
            }

          })
          .catch((error) => {

            alert("add error: " + error);
            // TODO set state
            console.error(error);
            this.setState({
              message: 'Error: ' + error,
              killer: Object.assign({}, KILLER)
            });

          });

      }

  }

  handleNameChange(event) {
    var killer = this.state.killer;
    killer.name = event.target.value;
    this.setState({
      killer: killer
    });
  }

  handleCodeChange(event) {
    var killer = this.state.killer;
    killer.codeName = event.target.value;
    this.setState({
      killer: killer
    });
  }

  handleActorChange(event) {
    var killer = this.state.killer;
    killer.actorName = event.target.value;
    this.setState({
      killer: killer
    });
  }

  handleWeaponChange(event) {
    var killer = this.state.killer;
    killer.weaponOfChoice = event.target.value;
    this.setState({
      killer: killer
    });
  }

  handleGroupChange(event) {
    var killer = this.state.killer;
    killer.group = event.target.value;
    this.setState({
      killer: killer
    });
  }

  canBeSubmitted() {
    const { name, codeName, actorName, weaponOfChoice, group} = this.state.killer;
    return (
      name.length > 0 &&
      codeName.length > 0 &&
      actorName.length > 0 &&
      weaponOfChoice.length > 0 &&
      group.length > 0
    );

  }

  render() {

    var isEnabled = this.canBeSubmitted();

    return(
      <div>
        <h1>Killer</h1>
        <p>{this.state.message}</p>
        <form onSubmit={this.handleSubmit}>
          <table className="killer-table">
            <tr>
              <td className="killer-feature">Name</td>
              <td>
                {
                  this.state.editMode ? (
                    <b>{this.state.killer.name}</b>
                  ):(
                    <input type="text" value={this.state.killer.name} onChange={this.handleNameChange} />
                  )
                }
              </td>
            </tr>
            <tr>
              <td className="killer-feature">Code name</td>
              <td><input type="text" value={this.state.killer.codeName} onChange={this.handleCodeChange} /></td>
            </tr>
            <tr>
              <td className="killer-feature">Actress/Actor</td>
              <td><input type="text" value={this.state.killer.actorName} onChange={this.handleActorChange} /></td>
            </tr>
            <tr>
              <td className="killer-feature">Weapon of Choice</td>
              <td><input type="text" value={this.state.killer.weaponOfChoice} onChange={this.handleWeaponChange} /></td>
            </tr>
            <tr>
              <td className="killer-feature">Organization</td>
              <td><input type="text" value={this.state.killer.group} onChange={this.handleGroupChange} /></td>
            </tr>
            <tr>
              <td colspan="2"><input type="submit" value="Submit" disabled={!isEnabled} /></td>
            </tr>
          </table>
        </form>

      </div>
    )
  }

}

const KILLER = {
  id: '',
  name: '',
  codeName: '',
  actorName: '',
  weaponOfChoice: '',
  group: ''
}

export default KillerForm;
