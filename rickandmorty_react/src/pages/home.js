import React, { Component } from 'react';
import CharacterCard from '../components/characterCard';
import ListNavigation from '../components/listNavigation';

class HomePage extends Component {
    constructor() {
        super();
        this.state = {
            characters: [],
            loading: false,
            nbTotalPages: 0,
            moreLoadedPage: 0,
        };
    }

    componentDidMount() {
        this.loadCharacters(this.props.currentPage, this.props.searchInput);
    }

    loadCharacters = (pageNb, searchInput, isLoadingMore = false) => {
        this.setState({
            loading: true
        });
        let url = process.env.REACT_APP_API_URL + "character/?page=" + pageNb;
        if (searchInput != "") {
            url += ("&name=" + searchInput);
        }
        fetch(url,
            {
                method: 'GET',
                headers: { "Content-Type": "application/json" }
            })
            .then(r => {
                return r.json();
            })
            .then(json => {
                {
                    let newCharacters = isLoadingMore ? this.state.characters.concat(json.results) : json.results;
                    this.setState({
                        characters: newCharacters != undefined ? newCharacters : [],
                        loading: false,
                        nbTotalPages: json.info != null ? json.info.pages : 0,
                        moreLoadedPage: (isLoadingMore ? this.state.moreLoadedPage + 1 : 0)
                    });
                }
            })
            .catch(err => {
                this.props.onEmitMessage(err.message, "error");
            });
    }

    clickNext = () => {
        this.props.onChangePage(this.props.currentPage + 1);
        this.loadCharacters(this.props.currentPage + 1, this.props.searchInput);
    }

    clickPrevious = () => {
        this.props.onChangePage(this.props.currentPage - 1);
        this.loadCharacters(this.props.currentPage - 1, this.props.searchInput);
    }

    clickPage = (pageNum) => {
        this.props.onChangePage(pageNum);
        this.loadCharacters(pageNum, this.props.searchInput);
    }

    loadMore = () => {
        this.loadCharacters(this.props.currentPage + 1, this.props.searchInput, true);
    }
    
    keyDownSearch = (event) => {
        if (event.key == "Enter") {
            this.loadCharacters(this.props.currentPage, this.props.searchInput);
        }
    }
    changeSearchInput = (event) => {
        this.props.onChangePage(1);
        this.props.onChangeSearchInput(event.target.value);
        this.loadCharacters(this.props.currentPage, event.target.value);
    }


    render() {
        return (
            <>
                <div className="page-title">
                    <p className="text-title">Home</p>
                </div>
                <div className="container-fluid page-content">
                    <div className="row">
                        <div className="col col-sm-4 col-xl-3 d-flex justify-content-left">
                            <input value={this.props.searchInput} onChange={this.changeSearchInput} type="text" onKeyDown={this.keyDownSearch} className="form-control" placeholder="Entrez un nom" />
                        </div>
                    </div>
                    {!this.state.loading && <div className="row">
                        {this.state.characters.map((c, index) =>
                            <div key={"character-" + index.toString()} className="col-12 col-md-6 col-xl-4">
                                <CharacterCard imgSrc={c.image} name={c.name} species={c.species} status={c.status} onClick={() => { this.props.history.push('/character/' + c.id) }} />
                            </div>
                        )}
                        {this.state.characters.length == 0 && <div className="mt-5 col-12 d-flex justify-content-center species"><p>No results.</p></div>}
                    </div>}
                    {this.state.characters.length != 0 && <div className="row">
                        <div className="col d-flex justify-content-end load-more-button">
                            <button disabled={(this.state.moreLoadedPage + this.props.currentPage == this.state.nbTotalPages) || this.state.characters.length === 0} className="btn btn-outline-secondary" onClick={this.loadMore}>Load More</button>
                        </div>
                    </div>}
                    {this.state.characters.length > 0 && <div className="row list-navigation w-100">
                        <ListNavigation disabled={this.state.loading} currentPage={this.props.currentPage} onClickLastPage={() => { this.clickPage(this.state.nbTotalPages) }} onClickFirstPage={() => { this.clickPage(1) }} totalPages={this.state.nbTotalPages} onClickNext={this.clickNext} onClickPrevious={this.clickPrevious} />
                    </div>}
                </div></>)
    }
}

export default HomePage;