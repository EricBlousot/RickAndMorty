import React, { Component } from 'react';

class CharacterPage extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
          Characterpage, {this.props.match.params.id}
      </div>)
  }
}

export default CharacterPage;