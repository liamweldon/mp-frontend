import React, { Component } from 'react';
import IntakeService from '../services/IntakeService';
import RecipeService from '../services/RecipeService';
import StockService from '../services/StockService';
import IntakeDetail from './IntakeDetail';
import {Link} from 'react-router-dom';
import {Modal, Button} from 'react-bootstrap';

class IntakeList extends Component {

	constructor(props) {
		super(props);
		this.state = {intakes: [], 
			selectedIntake: false,
			modalVisible: false}
		this.intakeService = IntakeService.getInstance();
		this.recipeService = RecipeService.getInstance();
		this.stockService = StockService.getInstance();
		this.intakeClicked.bind(this);
	}

	componentDidMount() {
		this.intakeService.getIntakes().then((intakes) => {this.setState(
				{intakes: intakes}
			)});
	}

	intakeClicked(intake) {
		if(intake.type === "STK") {
			//sourceId is stock, not stockItem
			this.stockService.getStockById(intake.sourceId).then((stock) => {
				this.setState({modalVisible: true, selectedIntake : intake, source: stock});
			});
		}
		else if (intake.type === "RCP") {
			this.recipeService.getRecipeById(intake.sourceId).then((recipe) => {
				this.setState({modalVisible: true, selectedIntake : intake, source: recipe});
			})
		}
		
	}

	render() {
		return (
			<div>
				<h3>Intakes</h3>
				<table>
					<tbody>
						<tr className="header-row">
							<td> Intake Date </td>
						</tr>
						{this.state.intakes.map((intake) => (
							<tr key={intake.intakeId}>
								<td onClick = {() => this.intakeClicked(intake)}> 
									{new Date(intake.intakeDate).toDateString()}
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<div>
				</div>
				{ this.state.selectedIntake &&
		<Modal
          show={this.state.modalVisible}>
          <Modal.Header>
            <Modal.Title><h4>{new Date(this.state.selectedIntake.intakeDate).toDateString()}</h4></Modal.Title>
          </Modal.Header>
              <Modal.Body> <IntakeDetail intake={this.state.selectedIntake} source={this.state.source}>  </IntakeDetail> </Modal.Body>
          <Modal.Footer>
          	<Button variant="primary" onClick={() => this.setState({modalVisible: false, selectedIntake: false})} >
          	Close
          	</Button>
          	</Modal.Footer>
          	</Modal> } 
			</div>
		)
	}
}


export default IntakeList;