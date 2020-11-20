
import React, { Component } from 'react';

class ListNavigation extends Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        return (
            <div className="col d-flex flex-row justify-content-center">
                <p className="page-number">{this.props.currentPage} sur {this.props.totalPages}</p>
                <div class="btn-group dropup">
                    <button type="button" class="btn btn-outline-secondary dropdown-toggle m-2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Résultats par page</button>
                    <div className="dropdown-menu">
                        <button onClick={() => this.props.onChangeNbResults(10)} className="dropdown-item">10</button>
                        <button onClick={() => this.props.onChangeNbResults(25)} className="dropdown-item">25</button>
                        <button onClick={() => this.props.onChangeNbResults(50)} className="dropdown-item">50</button>
                        <button onClick={() => this.props.onChangeNbResults(100)} className="dropdown-item">100</button>
                    </div>
                </div>
                <button className="btn btn-outline-secondary m-2" onClick={this.props.onClickFirstPage}>1</button>
                <button disabled={this.props.currentPage == 1} className="btn btn-outline-secondary m-2" onClick={this.props.onClickPrevious}>Précédente</button>
                <button disabled={this.props.currentPage == this.props.totalPages} className="btn btn-outline-secondary m-2" onClick={this.props.onClickNext}>Suivante</button>
                <button className="btn btn-outline-secondary m-2" onClick={this.props.onClickLastPage}>{this.props.totalPages}</button>
            </div>)
    }
}

export default ListNavigation;