import React, { Component } from 'react';
import CharacterCard from '../components/characterCard';
import ListNavigation from '../components/listNavigation';

class HomePage extends Component {
    constructor() {
        super();
        this.state = {
            characters:[],
            loading:false,
            nbTotalPages:0
        };
    }

    componentDidMount(){
        this.loadCharacters(this.props.currentPage);
    }

    loadCharacters=(pageNb)=>{
        this.setState({
            loading:true
        });
        fetch(process.env.REACT_APP_API_URL+"character/?page="+pageNb,
        {
            method:'GET',
            headers:{"Content-Type":"application/json"}
        })
        .then(r=>{
                return r.json();
        })
        .then(json=>{{
            this.setState({
                characters:json.results,
                loading:false,
                nbTotalPages:json.info.pages
            });
        }})
        .catch(err=>{
            this.props.onEmitMessage(err.message, "error");
        });
    }

    clickNext=()=>{
        this.props.onChangePage(this.props.currentPage+1);
        this.loadCharacters(this.props.currentPage+1);
    }
    clickPrevious=()=>{
        this.props.onChangePage(this.props.currentPage-1);
        this.loadCharacters(this.props.currentPage-1);
    }
    clickPage=(pageNum)=>{
        this.props.onChangePage(pageNum);
        this.loadCharacters(pageNum);
    }
    
    

    render() {
        return (
            <>
            <div className="page-title">
            <p className="text-title">Home</p>
        </div>
            <div className="container-fluid page-content">
                <div className="row">
                    <input type="text" placeholder="Enter a name"/>
                </div>
                {!this.state.loading && <div className="row mb-5">
                    {this.state.characters.map((c,index)=>
                    <div key={"character-"+index.toString()} className="col-12 col-sm-6 col-xl-4">
                        <CharacterCard imgSrc={c.image} name={c.name} species={c.species} status={c.status} onClick={()=>{this.props.history.push('/character/'+c.id)}}/>
                    </div>
                    )}
                </div>}
                <div className="row list-navigation w-100">
                    <ListNavigation disabled={this.state.loading} currentPage={this.props.currentPage} onClickLastPage={()=>{this.clickPage(this.state.nbTotalPages)}} onClickFirstPage={()=>{this.clickPage(1)}} totalPages={this.state.nbTotalPages} onClickNext={this.clickNext} onClickPrevious={this.clickPrevious}/>
                </div>
            </div></>)
    }
}

export default HomePage;