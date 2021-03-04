import React, { Component } from 'react';
import axios from 'axios'
import dbConnection from '../json/dbConnection.json'

var baseUrl = ""

function dbConnect(){
    {dbConnection.map((content, i) =>{
        baseUrl = content.baseUrl
    })}
}

dbConnect()

const initialState = {
    user : {name: ''},
    list: []
}

export default class Home extends Component {

    state = {...initialState}

    clear(){
        this.setState({user : initialState.user})
    }

    save(){
        const user = this.state.user
        const method = 'post'
        const url = baseUrl

        var nameValid = function(){
            if( user.name ){
                return true
            }
            alert("Name field is empty")
            return false
        }

        if(!nameValid()){
            return false;
        }

        axios[method](url, user)
        .then(resp =>{
            const list = this.getUpdatedList(resp.data)
            this.setState( {user : initialState, list})
            this.clear()
        })
    }

    get(){
        const user = this.state.user
        const method = 'get'
        const url = baseUrl

        axios[method](url, user)
        .then(resp =>{
            //const list = this.getUpdatedList(resp.data)
            //this.setState( {user : initialState, list})
            this.setState({list : resp.data})
        })
    }

    getUpdatedList(user){
        const list = this.state.list.filter(u => u.id != user.id)
        list.unshift(user)
        return list 
    }

    updateField(event){
        const user = {...this.state.user}
        user[event.target.name] = event.target.value
        this.setState({user})
    }

    renderTable(){
        return this.state.list.map(user => {
            return (
                <div>
                    {user.id} {user.name}
                </div>
            )
        })
    }

    render () {
        console.log(this.state.list)
        return (
            <div className="container">
                <form>
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label htmlFor="exampleInputEmail1">First Name</label>
                            <input type="text" className="form-control" value={this.state.user.name} onChange={e => this.updateField(e)}
                             name="name" id="name" aria-describedby="emailHelp" placeholder="First Name" />
                        </div>
                    </div>
                    
                    <button type="button" className="btn btn-danger" onClick={e => this.save(e)}>Save</button>
                    <button type="button" className="btn btn-danger ml-2" onClick={e => this.get(e)}>Get</button>
                    <button type="button" className="btn btn-danger ml-2" onClick={e => this.clear(e)}>Cancel</button>
                </form>
                {this.renderTable()}
            </div>
            
        );
    }
}