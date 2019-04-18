import React, { Component } from 'react';
import StockService from '../services/StockService';
import IntakeService from '../services/IntakeService';
import {Link} from 'react-router-dom';
import StockItemDetail from './StockItemDetail';
import {Modal, Button} from 'react-bootstrap';



class StockList extends Component {
	constructor(props) {
		super(props);
		this.stockService = StockService.getInstance();
		this.intakeService = IntakeService.getInstance();
		this.state = {
			stocks : [],
			selectedStockItems: [],
			selectedStock: false,
			modalVisible: false
		}
		this.stockClicked.bind(this);
	}
	componentDidMount() {
		this.stockService.getStocks().then((stocks) => {
			console.log('reeeeeee');
			this.setState({stocks: stocks});
		} )
	}

	stockClicked(stock) {
		this.stockService.getStockItemsFromStockId(stock.stockId).then((stockItems) => {
			this.setState({selectedStockItems: stockItems,
			modalVisible: true,
			selectedStock: stock});
		})
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
					</tr>
				{this.state.stocks.map((stock) => (
					<tr key={stock.stockId}>
						<td onClick={() => this.stockClicked(stock)}> 
							 {stock.product.longName}
						</td>
						<td>
							{"" + stock.quantity + " " + stock.product.householdServingSizeUom}
						</td>
					</tr>
					))}

				</tbody>
			</table>
			{ this.state.selectedStock &&
		<Modal
          show={this.state.modalVisible}>
              <Modal.Body> <StockItemDetail stock={this.state.selectedStock} stockItems={this.state.selectedStockItems}>  </StockItemDetail> </Modal.Body>
          <Modal.Footer>
          	<Button variant="primary" onClick={() => this.setState({modalVisible: false, selectedStock: false})} >
          	Close
          	</Button>
          	</Modal.Footer>
          	</Modal> 
          }
		</div>
	
		)
	}
}


export default StockList;