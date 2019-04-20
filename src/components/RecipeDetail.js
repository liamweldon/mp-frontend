import React, { Component } from 'react';
import RecipeService from '../services/RecipeService';
import IntakeService from '../services/IntakeService';

class RecipeDetail extends Component {

	constructor(props) {
		super(props);
		this.recipeService = RecipeService.getInstance();
		this.intakeService = IntakeService.getInstance();
		this.state={recipe: false, ingredientsAvailable: false, num: 0}
		this.checkAvailable.bind(this);
		this.consume.bind(this);
	}

	componentDidMount() {
		const id = parseInt(this.props.match.params.id);
		this.recipeService.getRecipeById(id).then((recipe) => {
			this.setState({recipe: recipe})
			return;
		}).then(() => {
			this.checkAvailable();
		})
	}

	checkAvailable() {
		this.recipeService.getAvailableRecipes()
			.then((availableRecipes) => {
				if (availableRecipes && availableRecipes.length > 0) {
					for(let available of availableRecipes) {
						if(this.state.recipe.recipeId === available.recipeId) {
							this.setState({ingredientsAvailable: true});
							return;
						}
					}
				}
			})
	}

	handleNumChange(e) {
		this.setState({num: e.target.value});
	}

	consume() {
		var numToConsume = this.state.num;

		if (numToConsume > 0) {
			this.intakeService.addIntake(this.state.recipe.recipeId, numToConsume, Date.now(), "RCP");
		}
	
	}

	getServingString(servings, hhServingSize, hhServingUom) {
		let quantity = servings * hhServingSize;
		return '' + quantity + ' ' + hhServingUom;
	}
	//TODO: column showing if Ingredients are  in stock
	render() {
		return (
		<div>


			{this.state.recipe && 
			<div>
				{this.state.ingredientsAvailable &&
					<div>
					<button onClick={this.consume.bind(this)}>
							CONSUME
						</button>
					<input type="text" pattern="[0-9]*" onChange={this.handleNumChange.bind(this)} value={this.state.num} />
					</div>
				}
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
				{this.state.recipe.ratings > 0 &&
					<h5> Rated {this.state.recipe.overallRating}/5 from {" "}
					{this.state.recipe.ratings} users </h5>
				}
				{this.state.recipe.yield &&
					<h5> Makes {" " + this.state.recipe.yield + " "} servings </h5>}
				{this.state.recipe.dateCreated &&
					<label> Created {this.state.recipe.dateCreated} </label>}
			</div>
			}
		</div>
		)
	}
}


export default RecipeDetail;