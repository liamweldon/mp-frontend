import React, { Component } from 'react';
import RecipeService from '../services/RecipeService';
import {Link} from 'react-router-dom';

class RecipeList extends Component {

	constructor(props) {
		super(props);
		this.state = {recipes: []}
		this.recipeService = RecipeService.getInstance();
		this.consume = this.consume.bind(this)
	}

	componentDidMount() {
		this.recipeService.getRecipes().then((recipesJson) => {this.setState(
				//TODO: link
				{recipes: recipesJson.recipes}
			)});
	}

	consume(recipe) {
		// TODO: dont consume entire quantity
		this.intakeService.addIntake(recipe.recipeId, recipe.yield, Date.now(), "RCP");
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
						</tr>
						{this.state.recipes.map((recipe) => (
							<tr key={recipe.recipeId}>
								<td> 
									<Link to={`/recipes/${recipe.recipeId}`}> {recipe.name} </Link>
								</td>
								<td>
									{recipe.description}
								</td>
								<td>
									<button onClick={() => this.consume(recipe)}>
										CONSUME
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		)
	}
}


export default RecipeList;