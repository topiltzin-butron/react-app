import React, { Component } from 'react';

class HeroItem extends Component {

  render() {

    return(
      <li key={'key_item_' + this.props.children.id} id={'item_' + this.props.children.id} onClick={this.props.clickHandler} >
        <span className="badge" id={'item_span_' + this.props.children.id}>
          {this.props.children.name}
        </span>
      </li>
    );
  }

}

export default HeroItem;
