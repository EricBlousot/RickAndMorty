
import React, { Component } from 'react';

class ListNavigation extends Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        return (
            <div className="col d-flex flex-row justify-content-center">
                <p className=" d-none d-sm-block page-number">{this.props.currentPage} sur {this.props.totalPages}</p>
                <button disabled={this.state.disabled} className="btn btn-outline-secondary m-2" onClick={this.props.onClickFirstPage}>1</button>
                <button disabled={this.state.disabled || this.props.currentPage == 1} className="btn btn-outline-secondary m-2" onClick={this.props.onClickPrevious}>Précédente</button>
                <button disabled={this.state.disabled || this.props.currentPage == this.props.totalPages} className="btn btn-outline-secondary m-2" onClick={this.props.onClickNext}>Suivante</button>
                <button disabled={this.state.disabled} className="btn btn-outline-secondary m-2" onClick={this.props.onClickLastPage}>{this.props.totalPages}</button>
            </div>)
    }
}

export default ListNavigation;