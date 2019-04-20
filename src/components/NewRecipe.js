import React, { Component } from 'react';
import RecipeService from '../services/RecipeService';

class NewRecipe extends Component {

	constructor(props) {
		super(props);
		this.recipeService = RecipeService.getInstance();
		this.state = {newRecipe: 
						{
						name: false,
						instructions: false,
						descriptions: false,
						yield: false,
						ingredients: [],
						tags: []
						},
					nextIngredient: {},
					nextTag: false
					}
		this.handleChange.bind(this);
		this.handleNextIngredientChange.bind(this);
		this.addIngredient.bind(this);
	}

	handleChange(field) {
		return (e) => {
			let newRecipe = this.state.newRecipe;
			newRecipe[field] = e.target.value;
			this.setState({newRecipe: newRecipe});
		}
	}

	handleNextIngredientChange(e) {
		let nextIngredient = this.state.nextIngredient;
		nextIngredient.product= {ndb: e.target.value};
		this.setState({nextIngredient: nextIngredient});
	}

	handleNextIngredientServingChange(e) {
		let nextIngredient = this.state.nextIngredient;
		nextIngredient.servings = e.target.value;
		this.setState({nextIngredient: nextIngredient});
	}

	handleNextTagChange(e) {
		this.setState({nextTag: e.target.value});
	}

	addIngredient() {
		let newRecipe = this.state.newRecipe;
		newRecipe.ingredients.push(this.state.nextIngredient);
		this.setState({newRecipe: newRecipe, nextIngredient: {}});
	}

	addTag() {
		let newRecipe = this.state.newRecipe;
		newRecipe.tags.push(this.state.nextTag);
		this.setState({newRecipe: newRecipe});
	}

	removeIngredient(ingredient) {
		let newRecipe = this.state.newRecipe;
		let idx = newRecipe.ingredients.indexOf(ingredient);
		if(idx >= 0) {
			newRecipe.ingredients.splice(idx, 1);
		}
		this.setState({newRecipe: newRecipe});
	}

	removeTag(tag) {
		let newRecipe = this.state.newRecipe;
		let idx = newRecipe.tags.indexOf(tag);
		if(idx >= 0) {
			newRecipe.tags.splice(idx, 1);
		}
		this.setState({newRecipe: newRecipe});
	}

	handleSubmit() {
		//TODO field validation
		this.recipeService.addRecipe(this.state.newRecipe);
	}

	render() {
		return (
			<div>
			<table>
			<tbody>
				<tr>
					Name:
					<input type="text" value={this.state.newRecipe.name? this.state.newRecipe.name: ""} onChange={this.handleChange("name")} />
				</tr>
				<tr>
					Description:
					<input type="text" value={this.state.newRecipe.descriptions? this.state.newRecipe.descriptions: ""} onChange={this.handleChange("descriptions")} />
				</tr>
				<tr>
					Instructions:
					<textarea value={this.state.newRecipe.instructions? this.state.newRecipe.instructions: ""} onChange={this.handleChange("instructions")} />
				</tr>
				<tr>
					Yield:
					<input value={this.state.newRecipe.yield? this.state.newRecipe.yield: ""} onChange={this.handleChange("yield")} />
				</tr>
				<tr>
				<tl>
					{"Ingredients NDBs"}
				</tl>
				<tl>
				{" " + "Servings"}
				</tl>
				</tr>
					{this.state.newRecipe.ingredients.map((ingredient) => 
						<div>
						<tr key={ingredient.product.ndb}> 
						{ingredient.product.ndb + " " + ingredient.servings + " "}
						<button onClick={() => this.removeIngredient(ingredient)}>
							Remove
						</button>
						</tr>
						</div>
					)
					}
					<input type="text" value={this.state.nextIngredient.product? this.state.nextIngredient.product.ndb: ""} onChange={this.handleNextIngredientChange.bind(this)} />
					<input type="number" value={this.state.nextIngredient.servings? this.state.nextIngredient.servings : 0} onChange={this.handleNextIngredientServingChange.bind(this)} />
					<button onClick={this.addIngredient.bind(this)}>
							ADD INGREDIENT
					</button>
				<tr>
					Tags:
				</tr>
					{this.state.newRecipe.tags.map((tag) => 
						<tr key={tag}> {tag + " "} 
						<button onClick={() => this.removeTag(tag)}>
							Remove
						</button></tr>
					)
					}
					<input type="text" value={this.state.nextTag? this.state.nextTag: ""} onChange={this.handleNextTagChange.bind(this)} />
					<button onClick={this.addTag.bind(this)}>
							ADD TAG
					</button>
				
				<tr> 
					<button onClick={this.handleSubmit.bind(this)}>
						Submit
					</button>
				</tr>
				</tbody>
				</table>
			</div>
		);
	}
}


export default NewRecipe;

