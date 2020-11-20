import React, { Component } from 'react';

class CharacterPage extends Component {
  constructor() {
    super();
    this.state = {
      character:undefined,
      loading:true
    };
  }

  loadCharacter=(characterId)=>{
    fetch(process.env.REACT_APP_API_URL+"character/"+characterId,
  {
      method:'GET',
      headers:{"Content-Type":"application/json"}
  })
  .then(r=>{
          return r.json();
  })
  .then(json=>{{
      this.setState({
          character:json,
          loading:false
      });
  }})
  .catch(err=>{
      this.props.onEmitMessage(err.message, "error");
  });
  }

  componentDidMount(){
    this.loadCharacter(this.props.match.params.id);
  }

  render() {
    if(!this.state.loading){
      return (
        <div className="container-fluid">
          <div className="row">
              <div className="col-12 page-title">
                  <p>{this.state.character.name}</p>
              </div>
          </div>
          <div className="row">
              <div className="col col-sm-6 d-flex justify-content-end">
                <img className="character-image w-100" src={this.state.character.image}/>
              </div>
              <div className="col col-sm-6">
                <p className="species" >Status : {this.state.character.status}</p>
                <p className="species" >Species : {this.state.character.species}</p>
                <p className="species" >Origin : {this.state.character.origin.name}</p>
              </div>
          </div>
      </div>)
      }
      else{
        return <p>Loading</p>
      }
  }
}

export default CharacterPage;