import React, { Component } from 'react';
import IntakeService from '../services/IntakeService';

class StockItemDetail extends Component {

	constructor(props) {
		super(props);
		this.intakeService = IntakeService.getInstance();
		this.consume = this.consume.bind(this);

		this.state = {num: 0}
	}

	componentDidMount() {
		const stockId= this.props.stock.stockId
		
	}

	handleNumChange(e) {
		this.setState({num: e.target.value})
	}

	consume(stockItem) {
		var numToConsume = this.state.num;
		if(numToConsume > stockItem.quantity) {
			numToConsume = stockItem.quantity;
		}
		if (numToConsume > 0) {
			this.intakeService.addIntake(stockItem.stockItemId, numToConsume, Date.now(), "STK");
		}
			
	}


	render() {
		return (
		<div>
			<h3> {this.props.stock.product.longName} </h3> 
		<table>
				<tbody>
					<tr className="header-row">
						
						<td> Quantity </td>
						<td> Expiration Date </td>
						<td />
						<td />
					</tr>
					{this.props.stockItems.map((stockItem) => (
					<tr key={stockItem.stockItemId}>
						<td>
							{"" + stockItem.quantity + " " + this.props.stock.product.householdServingSizeUom}
						</td>
						<td>
							{stockItem.expirationDate}
						</td>
						<td>
						<button onClick={() => this.consume(stockItem)}>
							CONSUME
						</button>
						</td>
						<td>
						<input type="text" pattern="[0-9]*" onChange={this.handleNumChange.bind(this)} value={this.state.num} />
						</td>
					</tr>
					))}
				</tbody>
		</table>
		</div>
		)
	}
}


export default StockItemDetail;