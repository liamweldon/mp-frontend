import {API_ROOT} from '../api-config';

export default class RecipeService {
	static instance = null;
	static getInstance() {
		if (RecipeService.instance === null) {
			RecipeService.instance = new RecipeService();
		}
	return this.instance;
 	}
	getRecipes = () =>
	fetch(`${API_ROOT}/recipes/myRecipes`, {
		method: 'GET',
		headers: {
			'Content-Type' : 'application/json'
		}
	}).then((response) => response.json());

	getRecipeById = (id) => 
		fetch(`${API_ROOT}/recipes/details/${id}`, {
		method: 'GET',
		headers: {
			'Content-Type' : 'application/json'
		}
	}).then((response) => response.json());

	// type is "STK" or "RCP"
	addRecipe = (sourceId, servings, intakeDate, type) => {
		fetch(`${API_ROOT}/recipes`, {
		method: 'POST',
		headers: {
			'Content-Type' : 'application/json'
		},
		body : {
			sourceId: sourceId,
			servings: servings,
			intakeDate: intakeDate,
			type: type
		}
	}).then((response) => response.json());
	}
	

}