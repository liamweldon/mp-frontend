import React, { Component } from 'react';
import RecipeService from '../services/RecipeService';

class RecipeDetail extends Component {

	constructor(props) {
		super(props);
		this.recipeService = RecipeService.getInstance();
	}

	componentDidMount() {
		const id = parseInt(this.props.match.params.id);
		this.recipeService.getRecipeById(id).then((recipe) => {
			this.setState({recipe: recipe})
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