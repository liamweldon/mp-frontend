import {API_ROOT} from '../api-config';

export default class UserService {
	static instance = null;
	static getInstance() {
		if (UserService.instance === null) {
			UserService.instance = new UserService();
		}
	return this.instance;
 	}
	login = (username, password) =>
	fetch(`${API_ROOT}/login`, {
		method: 'POST',
		headers: {
			'Content-Type' : 'application/json'
		},
		body: JSON.stringify(	{username: username,
								password: password})
	}).then((response) => response.json());
	register = (email, username, password) => 
		fetch(`${API_ROOT}/register`, {
		method: 'POST',
		headers: {
			'Content-Type' : 'application/json'
		},
		body: JSON.stringify(	{username: username,
								email: email,
								password: password})
	}).then((response) => response.json());
	

}