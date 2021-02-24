import React, { Component } from 'react';
import axios from 'axios'
const baseUrl = 'http://localhost:3080/users'

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
        axios[method](url, user)
            .then(resp =>{
                const list = this.getUpdatedList(resp.data)
                this.setState( {user : initialState, list})
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
    
    render () {
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
                    <button type="button" className="btn btn-danger" onClick={e => this.clear(e)}>Cancel</button>
                </form>
            </div>
            
        );
    }
}