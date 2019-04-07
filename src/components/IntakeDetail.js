import React, { Component } from 'react';
import IntakeService from '../services/IntakeService';
import StockService from '../services/StockService';
import RecipeService from '../services/RecipeService';


class IntakeDetail extends Component {
//TODO: Link
	constructor(props) {
		super(props);
		this.intakeService = IntakeService.getInstance();
		this.stockService = StockService.getInstance();
		this.recipeService = RecipeService.getInstance();
		this.state = {
			type: false
		}
	}
	componentDidMount() {
		const id = parseInt(this.props.match.params.id);
		this.intakeService.getIntakeById(id).then((intakeJson) => {
			this.setState({intake: intakeJson.intake})
			return { id: intakeJson.intake.sourceId,
					type: intakeJson.intake.tyoe};
		}).then(({id, type}) => {
			if(type === "STK") {
				src = await this.stockService.getStockById(id);
				this.setState({type: type, src: src});

			}
			else if(type === "RCP") {
				src = await this.recipeService.getRecipeById(id);
				this.setState({type: type, src: src})
			}
		})
	}
	render() {
		return (
			<Label> Recipe Detail Here </Label>
		)
	}
}


export default IntakeDetail;