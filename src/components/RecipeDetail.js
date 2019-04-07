import React, { Component } from 'react';
import RecipeService from '../services/RecipeService';

class RecipeDetail extends Component {

//TODO: Link
	constructor(props) {
		super(props);
		this.recipeService = RecipeService.getInstance();
	}

	componentDidMount() {
		const id = parseInt(this.props.match.params.id);
		this.intakeService.getRecipeById(id).then((recipeJson) => {
			this.setState({recipe: recipeJson.recipe})
		})
	}

	render() {
		return (
		<label>
			Recipe Detail Here
		</label>
		)
	}
}


export default RecipeDetail;