import React, { Component } from 'react';
import UserService from '../services/UserService';

class Register extends Component {
constructor(props) {
    	super(props);
    	this.state = {username: '', email: '', password: ''};
    	this.handleUsernameChange = this.handleUsernameChange.bind(this);
    	this.handleEmailChange = this.handleEmailChange.bind(this);
    	this.handlePasswordChange = this.handlePasswordChange.bind(this);
    	this.handleSubmit = this.handleSubmit.bind(this);
    	this.service = UserService.getInstance();
  	}

  	handleSubmit(event) {
  		this.service.register(this.state.email, this.state.username, this.state.password).then((res) => {
  			if(res.message === "User successfully inserted"){
  				// redirect to overview
  			}
  		})
  	}

  	handleUsernameChange(event) {
  		this.setState({username: event.target.value});
  	}

  	handleEmailChange(event) {
  		this.setState({email: event.target.value});
  	}

  	handlePasswordChange(event) {
  		this.setState({password: event.target.value});
  	}

	render() {
		return (
			<div>
				<label>
    				Email:
    				<input type="text" value={this.state.email} onChange={this.handleEmailChange}/>
  				</label>
  				<label>
    				Username:
    				<input type="text" value={this.state.username} onChange={this.handleUsernameChange}/>
  				</label>
  				<label>
  					Password:
  					<input type="text" value={this.state.password} onChange={this.handlePasswordChange}/>
  				</label>
  				<button onClick={this.handleSubmit}>
  				Register
  				</button>		
			
			</div>	)
	}
}

export default Register;