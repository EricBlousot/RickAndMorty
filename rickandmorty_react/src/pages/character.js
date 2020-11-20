import React, { Component } from 'react';

class CharacterPage extends Component {
  constructor() {
    super();
    this.state = {
      character:undefined,
      loading:true,
      episodesLoading:false,
      episodes:[]
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
          loading:false,
          episodesLoading:true
      });
      this.loadEpisodes(json.episode);
  }})
  .catch(err=>{
      this.props.onEmitMessage(err.message, "error");
  });
  }
  
  loadEpisodes=(linksList)=>{
    console.log("episodes to load : ",linksList);
    fetch(process.env.REACT_APP_API_URL+"episode/"+this.generateEpisodesIds(linksList),
  {
      method:'GET',
      headers:{"Content-Type":"application/json"}
  })
  .then(r=>{
          return r.json();
  })
  .then(json=>{{
      this.setState({
          episodes:json,
          episodesLoading:false
      });
  }})
  .catch(err=>{
      this.props.onEmitMessage(err.message, "error");
  });
  }

  generateEpisodesIds=(linksList)=>{
    let list="[";
    let s=linksList[0].split("/");
    console.log("s=",s);
    list+=s[s.length-1];
    for(let i=1;i<linksList.length;i++){
      let s=linksList[i].split("/");
      list+=(","+s[s.length-1]);
    }
    list+="]";
    console.log("list : ",list);
    return list;
  }

  componentDidMount(){
    this.loadCharacter(this.props.match.params.id);
  }

  render() {
    if(!this.state.loading){
      return (
        <div className="container-fluid">
          <div className="page-title">
                  <p className="text-title">{this.state.character.name}</p>
          </div>
          <div className="row">
              <div className="col-12 col-sm-6 d-flex justify-content-center justify-content-sm-end mb-3">
                <img className="character-image w-100" src={this.state.character.image}/>
              </div>
              <div className="col-12 col-sm-6">
                <p className="species" >Status : {this.state.character.status}</p>
                <p className="species" >Species : {this.state.character.species}</p>
                <p className="species" >Origin : {this.state.character.origin.name}</p>
              </div>
          </div>
          <div className="row">
              <div className="col-12 mb-3 col-sm-6 mt-4 offset-sm-3 d-flex justify-content-center">
                <p className="page-subtitle">Episodes</p>
              </div>
              </div>
          <div className="row">
              <div className="col-12 col-sm-6 offset-sm-3 ">
                {this.state.episodes.map(e=>{
                  return <div className="d-flex justify-content-center"><p className="species">{e.name}</p></div>
                })}
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