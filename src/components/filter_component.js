import React from 'react';
import * as _ from 'lodash';

export class FilterComponent extends React.Component {
    constructor(props) {
        super(props);
        this.status = props.Status;
        this.species = props.species;
        this.origin = props.origin;
        this.gender = props.gender;
        console.log(this.species);
        this.filetrStatus=[];
        this.filetrSpecies=[];
        this.filetrOrigin=[];
        this.filetrGender=[];

        this.handleChange = this.handleChange.bind(this);
    }
    handleChange = (event) => {
        //debugger;
        if(event.target.checked===true){
            if(event.target.name==='status'){
                this.filetrStatus.push(event.target.value);
            }else if(event.target.name==='species'){
                this.filetrSpecies.push(event.target.value);
            }else if(event.target.name==='origin'){
                this.filetrOrigin.push(event.target.value);
            }else if(event.target.name==='gender'){
                this.filetrGender.push(event.target.value);
            }
        }else{
            if(event.target.name==='status'){
                var removerArray=_.filter(this.filetrStatus,function(element){
                     if(element!==event.target.value){
                         return element;
                     }
                 });
                 this.filetrStatus=removerArray;
            }else if(event.target.name==='species'){
                var removerArray=_.filter(this.filetrSpecies,function(element){
                   // console.log(element+"----"+event.target.value);
                    if(element!==event.target.value){
                        return element;
                    }
                });
                this.filetrSpecies=removerArray;
                //console.log(removerArray);
            }else if(event.target.name==='origin'){
                var removerArray=_.filter(this.filetrOrigin,function(element){
                    // console.log(element+"----"+event.target.value);
                     if(element!==event.target.value){
                         return element;
                     }
                 });
                 this.filetrOrigin=removerArray;
            }else if(event.target.name==='gender'){
                var removerArray=_.filter(this.filetrGender,function(element){
                    // console.log(element+"----"+event.target.value);
                     if(element!==event.target.value){
                         return element;
                     }
                 });
                 this.filetrGender=removerArray;
            }
        }
        let filteredArray={
            "status":this.filetrStatus,
            "species":this.filetrSpecies,
            "origin":this.filetrOrigin,
            "gender":this.filetrGender
        }
       this.props.updatedFilter(filteredArray);
    }
    render() {
        return (
            <div>
                <h4>Filters</h4>
                <div className='visible-xs'>X</div>
                <div id="filterDiv" className='hidden-xs'>
                <div>
                    <h5>Species</h5>
                    {this.species.map(el => (
                        
                        <div key={el} className="checkbox">
                            <label>
                                <input type="checkbox" name="species"  value={el} onChange={this.handleChange} /> {el}
                            </label>
                        </div>
                    ))
                    }
                </div>
                <div>
                    <h5>Gender</h5>
                    {this.gender.map(el => (
                        <div key={el} className="checkbox">
                            <label>
                                <input type="checkbox" name="gender"  value={el} onChange={this.handleChange} /> {el}
                            </label>
                        </div>
                    ))
                    }
                </div>
                <div>
                    <h5>Origin</h5>
                    {this.origin.map(el => (
                        <div key={el} className="checkbox">
                            <label>
                                <input type="checkbox" name="origin"  value={el} onChange={this.handleChange} /> {el}
                            </label>
                        </div>
                    ))
                    }
                </div>
                <div>
                    <h5>Status</h5>
                    {this.status.map(el => (
                        <div key={el} className="checkbox">
                            <label>
                                <input type="checkbox" name="status"  value={el} onChange={this.handleChange} /> {el}
                            </label>
                        </div>
                    ))
                    }
                </div>  
                </div>                                              
            </div>
        );
    }
}


/* var React = require("react");

module.exports = React.createClass({
    render:function(){
        return(
            <div>
                <h2>Filters</h2>
                <div>
                   <h3>Species</h3>
                   <div ClassName="checkbox">
                        <label><input type="checkbox" value=""/>Human</label>
                    </div>
                    <div ClassName="checkbox">
                        <label><input type="checkbox" value=""/>Mytholog</label>
                    </div>
                    <div ClassName="checkbox disabled">
                        <label><input type="checkbox" value="" disabled/>Other species...</label>
                    </div>
                </div>
            </div>
        )
    }
}) */