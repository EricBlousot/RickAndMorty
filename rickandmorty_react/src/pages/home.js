import React, { Component } from 'react';
import CharacterCard from '../components/characterCard';
import ListNavigation from '../components/listNavigation';

class HomePage extends Component {
    constructor() {
        super();
        this.state = {
            characters:[],
            loading:false,
            totalResults:0,
            firstLoad:true
        };
    }

    componentDidMount(){
        this.loadCharacters(this.props.currentPage, this.props.nbResults);
        if(this.state.firstLoad){
            this.loadTotalResults();
        }
    }

    loadTotalResults=()=>{
        console.log("load count");
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
        this.props.onChangePage(this.props.currentPage+1);
        this.loadCharacters(this.props.currentPage+1, this.props.nbResults);
    }
    clickPrevious=()=>{
        this.props.onChangePage(this.props.currentPage-1);
        this.loadCharacters(this.props.currentPage-1, this.props.nbResults);
    }
    clickPage=(pageNum)=>{
        this.props.onChangePage(pageNum);
        this.loadCharacters(pageNum, this.props.nbResults);
    }
    changeNbResults=(newNbResults)=>{
        this.setState({
            nbResults:newNbResults,
            currentPage:1
        });
        this.props.onChangeNbResults(newNbResults);
        this.loadCharacters(1, newNbResults);
    }

    render() {
        return (
            <>
            <div className="page-title">
            <p className="text-title">Home</p>
        </div>
            <div className="container-fluid page-content">
                {!this.state.loading && <div className="row mb-5">
                    {this.state.characters.map((c,index)=>
                    <div key={"character-"+index.toString()} className="col-12 col-sm-6 col-md-4 col-xl-3">
                        <CharacterCard imgSrc={c.image} name={c.name} species={c.species} status={c.status} onClick={()=>{this.props.history.push('/character/'+c.id)}}/>
                    </div>
                    )}
                </div>}
                <div className="row list-navigation w-100">
                    <ListNavigation onChangeNbResults={this.changeNbResults} disabled={this.state.loading} currentPage={this.props.currentPage} onClickLastPage={()=>{this.clickPage(Math.trunc(this.state.totalResults/this.props.nbResults)+1)}} onClickFirstPage={()=>{this.clickPage(1)}} totalPages={Math.trunc(this.state.totalResults/this.props.nbResults)+1} onClickNext={this.clickNext} onClickPrevious={this.clickPrevious}/>
                </div>
            </div></>)
    }
}

export default HomePage;