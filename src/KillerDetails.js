import React, { Component } from 'react';
import KillerForm, { KILLER } from './KillerForm';

class KillerDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      killer: {},
      editMode: false
    }

    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleUpdated = this.handleUpdated.bind(this);
  }

  componentDidMount() {

    fetch('http://localhost:8080/thebride/persona/' + this.props.params.id, {
      method: 'GET'
    }).then((response) => response.json())
      .then((responseJson) => {

        // alert("responseJson: " + responseJson)

        this.setState({
          message: "Killer loaded: " + this.props.params.id,
          killer: responseJson,
          editMode: false
        });

      })
      .catch((error) => {

        alert("error: " + error);
        // TODO set state
        console.error(error);
        this.setState({
          message: 'Error: ' + error,
          killers: [],
          editMode: false
        });

      });

  }

  handleCancel(e) {
    this.setState({
      editMode: false
    });
  }

  handleEdit(e) {

    var link = this.state.killer._links.self.href;
    alert("event: " + e + " href: " + link )

    this.setState({
      editMode: true
    });

  }

  handleDelete(e) {
    var link = this.state.killer._links.self.href;
    var method = 'DELETE';

    alert("link: " + link + "\nmethod: " + method);

    fetch(link, {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((response) => {

        if(204 === response.status) {
            alert(response + " sttus: " + response.status);
            this.setState({
              message: 'Killer got killed',
              killer: Object.assign({}, KILLER)
            });
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

  handleUpdated() {
    alert("PLEASE RELOAD");
    this.setState({
      editMode: false
    });

    this.componentDidMount();
  }

  render() {

    var killer = this.state.killer;

    return (
      <div>
        <br />
        <p>{this.state.message}</p>
        {
          killer.persona ? (
            <div>
              <h2>{killer.persona.name}</h2>
              <table className="killer-table">
                <tr>
                  <td className="killer-feature">Code name</td>
                  <td>{killer.persona.codeName}</td>
                </tr>
                <tr>
                  <td className="killer-feature">Actress/Actor</td>
                  <td>{killer.persona.actorName}</td>
                </tr>
                <tr>
                  <td className="killer-feature">Weapon of Choice</td>
                  <td>{killer.persona.weaponOfChoice}</td>
                </tr>
                <tr>
                  <td className="killer-feature">Organization</td>
                  <td>{killer.persona.group}</td>
                </tr>
              </table>
              <br />

              <table className="killer-table mini">
                <tr>
                  <td className="killer-feature">API link</td>
                  <td>{killer._links.self.href}</td>
                </tr>
                <tr>
                  <td className="killer-feature">Add API</td>
                  <td>{killer._links.add.href}</td>
                </tr>
              </table>

              {
                this.state.editMode ? (
                  <div>
                    <KillerForm killer={this.state.killer.persona} onSuccess={this.handleUpdated} />

                    <br/><br/>
                    <button onClick={this.handleCancel}>Cancel</button>
                  </div>
                ): (
                  <div>
                    <button onClick={this.handleEdit}>Edit</button>
                    <br/>
                    <button onClick={this.handleDelete}>Delete</button>
                  </div>
                )
              }

            </div>

          ):(
            <p>Killer not found</p>
          )
        }

      </div>
    )
  }

}

export default KillerDetails;
