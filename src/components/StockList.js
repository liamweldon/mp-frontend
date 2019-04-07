import React, { Component } from 'react';
import StockService from '../services/StockService';
import IntakeService from '../services/IntakeService';


class StockList extends Component {
	constructor(props) {
		super(props);
		this.stockService = StockService.getInstance();
		this.intakeService = IntakeService.getInstance();
		this.state = {
			stocks : []
		}
		this.consume = this.consume.bind(this);
	}
	componentDidMount() {
		this.stockService.getStocks().then((stocks) => {
			this.setState({stocks: stocks});
		} )
	}

	consume(stock) {
		// TODO: dont consume entire quantity
		this.intakeService.addIntake(stock.stockId, stock.quantity, Date.now(), "STK");
	}

	render() {
		return (
		<div>
		<h3>Stock</h3>
			<table>
				<tbody>
					<tr className="header-row">
						<td> Product Name </td>
						<td> Quantity </td>
						<td> Expiration Date </td>
						<td />
					</tr>
				{this.state.stocks.map((stock) => (
					<tr key={stock.stockId}>
						<td> 
							{stock.product.longName}
						</td>
						<td>
							{"" + stock.quantity + " " + stock.product.householdServingSizeUom}
						</td>
						<td>
							{stock.product.exprRate}
						</td>
						<td>
						<button onClick={() => this.consume(stock)}>
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


export default StockList;