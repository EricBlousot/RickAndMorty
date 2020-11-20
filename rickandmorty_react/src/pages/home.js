import React, { Component } from 'react';
import CharacterCard from '../components/characterCard';
import ListNavigation from '../components/listNavigation';

class HomePage extends Component {
    constructor() {
        super();
        this.state = {
            characters:[],
            currentPage:1,
            nbResults:10,
            loading:false,
            totalResults:0,
            firstLoad:true
        };
    }

    componentDidMount(){
        this.loadCharacters(this.state.currentPage, this.state.nbResults);
        if(this.state.firstLoad){
            this.loadTotalResults();
        }
    }

    loadTotalResults=()=>{
        fetch(process.env.REACT_APP_API_URL+"character/",
        {
            method:'GET',
            headers:{"Content-Type":"application/json"}
        })
        .then(r=>{
                return r.json();
        })
        .then(json=>{{
            this.setState({
                totalResults:json.info.count,
                firstLoad:false
            });
        }})
        .catch(err=>{
            this.props.onEmitMessage(err.message, "error");
        });
    }

    generateIdList=(pageNumber, nbResults)=>{
        let begin=(nbResults)*(pageNumber-1)+1;
        let list="["+begin;
        for(let i=begin+1;i<(begin+nbResults);i++){
            list+=(","+i);
        }
        list+="]";
        return list;
    }

    loadCharacters=(pageNb, nbResults)=>{
        this.setState({
            loading:true
        });
        fetch(process.env.REACT_APP_API_URL+"character/"+this.generateIdList(pageNb, nbResults),
        {
            method:'GET',
            headers:{"Content-Type":"application/json"}
        })
        .then(r=>{
                return r.json();
        })
        .then(json=>{{
            this.setState({
                characters:json,
                loading:false
            });
        }})
        .catch(err=>{
            this.props.onEmitMessage(err.message, "error");
        });
    }

    clickNext=()=>{
        let newCurrentPage=this.state.currentPage+1;
        this.setState({
            currentPage:newCurrentPage
        });
        this.loadCharacters(newCurrentPage, this.state.nbResults);
    }
    clickPrevious=()=>{
        let newCurrentPage=this.state.currentPage-1;
        this.setState({
            currentPage:newCurrentPage
        });
        this.loadCharacters(newCurrentPage, this.state.nbResults);
    }
    clickPage=(pageNum)=>{
        this.setState({
            currentPage:pageNum
        });
        this.loadCharacters(pageNum, this.state.nbResults);
    }
    changeNbResults=(newNbResults)=>{
        this.setState({
            nbResults:newNbResults,
            currentPage:1
        });
        this.loadCharacters(1, newNbResults);
    }

    render() {

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col page-title">
                        <p>Home</p>
                    </div>
                </div>
                {!this.state.loading && <div className="row mb-5">
                    {this.state.characters.map((c,index)=>
                    <div key={"character-"+index.toString()} className="col-12 col-sm-6 col-md-4 col-xl-3">
                        <CharacterCard imgSrc={c.image} name={c.name} species={c.species} status={c.status} onClick={()=>{this.props.history.push('/character/'+c.id)}}/>
                    </div>
                    )}
                </div>}
                {!this.state.loading && <div className="row list-navigation w-100">
                    <ListNavigation onChangeNbResults={this.changeNbResults} currentPage={this.state.currentPage} onClickLastPage={()=>{this.clickPage(Math.trunc(this.state.totalResults/this.state.nbResults)+1)}} onClickFirstPage={()=>{this.clickPage(1)}} totalPages={Math.trunc(this.state.totalResults/this.state.nbResults)+1} onClickNext={this.clickNext} onClickPrevious={this.clickPrevious}/>
                </div>}
            </div>)
    }
}

export default HomePage;