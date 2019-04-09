import {API_ROOT} from '../api-config';

export default class IntakeService {
	static instance = null;
	static getInstance() {
		if (IntakeService.instance === null) {
			IntakeService.instance = new IntakeService();
		}
	return this.instance;
 	}
	getIntakes = () =>
	fetch(`${API_ROOT}/intakes`, {
		method: 'GET',
		headers: {
			'Content-Type' : 'application/json'
		}
	}).then((response) => response.json());

	getIntakeById = (id) => 
		fetch(`${API_ROOT}/intakes/${id}`, {
		method: 'GET',
		headers: {
			'Content-Type' : 'application/json'
		}
	}).then((response) => response.json());

	// type is "STK" or "RCP"
	addIntake = (sourceId, servings, intakeDate, type) => {
		let formatted = new Date(intakeDate);
		//TODO: date formatting
		fetch(`${API_ROOT}/intakes`, {
		method: 'POST',
		headers: {
			'Content-Type' : 'application/json'
		},
		body : JSON.stringify({
			sourceId: sourceId,
			servings: servings,
			intakeDate: formatted,
			type: type
		})
	}).then((response) => response.json());
	}
	

}