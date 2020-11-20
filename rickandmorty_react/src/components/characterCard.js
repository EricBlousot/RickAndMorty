
import React, { Component } from 'react';

class CharacterCard extends Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        return (
                <div onClick={this.props.onClick} className="bloc-character-card d-flex flex-row">
                  <img className="image-character-card" src={this.props.imgSrc}></img>
                  <div className="d-flex flex-column justify-content-between">
                    <div className="title-character-card">{this.props.name}</div>
                    <div className="w-100 d-flex flex-row justify-content-around">
                      <p>{this.props.status}</p>
                      <p>{this.props.species}</p>
                    </div>
                  </div>
              </div>)
    }
}

export default CharacterCard;