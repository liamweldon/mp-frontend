import React, { Component } from 'react';
import RecipeService from '../services/RecipeService';

class RecipeDetail extends Component {

	constructor(props) {
		super(props);
		this.recipeService = RecipeService.getInstance();
		this.state={recipe: false}
	}

	componentDidMount() {
		const id = parseInt(this.props.match.params.id);
		this.recipeService.getRecipeById(id).then((recipe) => {
			this.setState({recipe: recipe})
		})
	}

	getServingString(servings, hhServingSize, hhServingUom) {
		let quantity = servings * hhServingSize;
		return '' + quantity + ' ' + hhServingUom;
	}

	render() {
		return (
		<div>
			{this.state.recipe && 
			<div>
				<h2> {this.state.recipe.name} </h2>
				<h4> Description: </h4>
					<label>
					{this.state.recipe.descriptions}
					</label>
				<h4> Instructions: </h4>
					<label>
					{this.state.recipe.instructions}
					</label>
				<h4> Ingredients: </h4>
				<table>
					<tbody>
					{this.state.recipe.ingredients.map((ingredient) => (
							<tr key={ingredient.product.ndb}>
								<td> 
									{ingredient.product.longName}
								</td>
								<td>
									{this.getServingString(ingredient.servings, 
										ingredient.product.householdServingSize, ingredient.product.householdServingSizeUom)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
				{this.state.recipe.overallRating &&
					<h5> Rated {this.state.recipe.overallRating}/5 from {" "}
					{this.state.recipe.ratings} users </h5>
				}
			</div>
			}
		</div>
		)
	}
}


export default RecipeDetail;