import React, { Component } from 'react';
import RecipeService from '../services/RecipeService';
import IntakeService from '../services/IntakeService';
import {Link} from 'react-router-dom';

class RecipeList extends Component {

	constructor(props) {
		super(props);
		this.state = {recipes: [], num:0}
		this.recipeService = RecipeService.getInstance();
		this.intakeService = IntakeService.getInstance();
		this.consume = this.consume.bind(this)
	}

	componentDidMount() {
		this.recipeService.getRecipes().then((recipes) => {
			this.setState(
				{recipes: recipes}
			)});
	}

	consume(recipe) {
		//TODO: validate ingredients available
		let numToConsume = this.state.num;
		if(numToConsume > 0) {
			this.intakeService.addIntake(recipe.recipeId, numToConsume, Date.now(), "RCP");
		}
		
	}

	handleNumChange(e) {
		this.setState({num: e.target.value})
	}
	render() {
		return (
			<div>
				<h3>Recipes</h3>
				<table>
					<tbody>
						<tr className="header-row">
							<td> Recipe Name </td>
							<td> Description </td>
							<td />
							<td />
						</tr>
						{this.state.recipes.map((recipe) => (
							<tr key={recipe.recipeId}>
								<td> 
									<Link to={`/recipes/${recipe.recipeId}`}> {recipe.name} </Link>
								</td>
								<td>
									{recipe.descriptions}
								</td>
								<td>
									<button onClick={() => this.consume(recipe)}>
										CONSUME
									</button>
								</td>
								<td>
									<input type="text" pattern="[0-9]*" onChange={this.handleNumChange.bind(this)} defaultValue="0" />
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<Link to={`/recipe/new`}> Create Recipe </Link>
			</div>
		)
	}
}


export default RecipeList;