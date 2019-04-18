import React, { Component } from 'react';
import IntakeService from '../services/IntakeService';
import StockService from '../services/StockService';
import RecipeService from '../services/RecipeService';


class IntakeDetail extends Component {
//TODO: Link
	constructor(props) {
		super(props);
		this.getServingString.bind(this);
	}
	
	getServingString(servings, hhServingSize, hhServingUom) {
		let quantity = servings * hhServingSize;
		return '' + quantity + ' ' + hhServingUom;
	}

	render() {
		return (
			<div>
			{this.props.intake.type === "RCP" &&
			<div>
				<h2> {this.props.source.name} </h2>
				<table>
					<tbody>
						<tr>
							<td> Ingredients </td>
							<td> Quantity </td>
						</tr>
						{this.props.source.ingredients.map((ingredient) => (
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
				</div>
			}
			{this.props.intake.type === "STK" &&
			<div>
				<h2> {this.props.source.product.longName} </h2>
				{this.getServingString(this.props.source.quantity, this.props.source.product.householdServingSize,
					this.props.source.product.householdServingSizeUom)}
			</div>
			}
			</div>
			
		)
	}
}

// <IntakeDetail intake={this.state.selectedIntake} source={this.state.source}>
export default IntakeDetail;
