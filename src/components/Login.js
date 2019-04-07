import React, { Component } from 'react';
import UserService from '../services/UserService';
import {Redirect} from 'react-router-dom';

class Login extends Component {
	constructor(props) {
    	super(props);
    	this.state = {username: '', password: ''};
    	this.handleUsernameChange = this.handleUsernameChange.bind(this);
    	this.handlePasswordChange = this.handlePasswordChange.bind(this);
    	this.handleSubmit = this.handleSubmit.bind(this);
    	this.service = UserService.getInstance();
  	}

  	handleSubmit(event) {
  		console.log("username: " + this.state.username + "\npassword: " + this.state.password);
  		this.service.login(this.state.username, this.state.password).then((res) => {
  			// gross, I know :(
  			if(res.message === "Login Succeeded!") {
  				this.props.callback();
  			}
  		})
  	}

  	handleUsernameChange(event) {
  		this.setState({username: event.target.value});
  	}

  	handlePasswordChange(event) {
  		this.setState({password: event.target.value});
  	}

	render() {
		return (

			<div>
  				{this.props.loggedIn && <Redirect to = '/stocks'/>}
  				<label>
    				Username:
    				<input type="text" value={this.state.username} onChange={this.handleUsernameChange}/>
  				</label>
  				<label>
  					Password:
  					<input type="text" value={this.state.password} onChange={this.handlePasswordChange}/>
  				</label>
  				<button onClick={this.handleSubmit}>
  				Login
  				</button>		
			
			</div>	)
	}
}

export default Login;