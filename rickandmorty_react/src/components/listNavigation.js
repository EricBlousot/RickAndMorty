
import React, { Component } from 'react';

class ListNavigation extends Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        return (
                <div className="col d-flex flex-row">
                    <div class="btn-group dropup">
  <button type="button" class="btn btn-light dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Résultats par page
  </button>
  <div className="dropdown-menu">
    <button onClick = {()=>this.props.onChangeNbResults(10)} className="dropdown-item">10</button>
    <button onClick = {()=>this.props.onChangeNbResults(25)} className="dropdown-item">25</button>
    <button onClick = {()=>this.props.onChangeNbResults(50)} className="dropdown-item">50</button>
    <button onClick = {()=>this.props.onChangeNbResults(100)} className="dropdown-item">100</button>
  </div>
</div>


<p>{this.props.currentPage}/{this.props.totalPages}</p>
<button className="btn btn-light mr-3" onClick={this.props.onClickFirstPage}>1</button>
                <button className="btn btn-light mr-3" onClick={this.props.onClickPrevious}>Previous</button>
                    <button className="btn btn-light mr-3" onClick={this.props.onClickNext}>Next</button>
                    <button className="btn btn-light mr-3" onClick={this.props.onClickLastPage}>{this.props.totalPages}</button>
              </div>)
    }
}

export default ListNavigation;