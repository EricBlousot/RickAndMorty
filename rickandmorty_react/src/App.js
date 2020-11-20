import './App.css';
import Message from './components/message';
import CharacterPage from './pages/character';
import HomePage from './pages/home';
import NotFoundPage from './pages/notfound';
import {Redirect, Route, Router, Switch} from 'react-router-dom';
import { createBrowserHistory as createHistory } from 'history';
import React, { Component } from 'react';
const history = createHistory();



class App extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      currentPage:1,
      nbResults:10
    };
  }
  
  addMessage = (newMessage, newType) => {
    let tempMessages = this.state.messages;
    tempMessages.push({ text: newMessage, type: newType });
    this.setState({
      messages: tempMessages
    })
  }
  changePage=(newCurrentPage)=>{
    this.setState({
      currentPage:newCurrentPage
    });
  }
  changeNbResults=(newNbResults)=>{
    this.setState({
      nbResults:newNbResults,
      currentPage:1
  });
  }

  render(){
  return (
    <Router history={history}>
      <div className="messages">
        {this.state.messages.map((m, i) => {
          return <Message messageText={m.text} messageType={m.type} />
        })}
      </div>
      <Switch>
        <Route path="/home" render={(props)=><HomePage onChangeNbResults={this.changeNbResults} onChangePage={this.changePage} nbResults={this.state.nbResults} currentPage={this.state.currentPage} className="page" {...props} onEmitMessage={(newMessage, newType) => this.addMessage(newMessage, newType)} />}/>
        <Route path="/character/:id" render={(props)=><CharacterPage className="page" {...props} onEmitMessage={(newMessage, newType) => this.addMessage(newMessage, newType)} />}/>
        <Route exact path="/">
          <Redirect to="/home"/>
        </Route>
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );}
}

export default App;
