import React, { Component } from 'react';
import IntakeService from '../services/IntakeService';
import {Link} from 'react-router-dom';

class IntakeList extends Component {

	constructor(props) {
		super(props);
		this.state = {intakes: []}
		this.intakeService = IntakeService.getInstance();
	}

	componentDidMount() {
		this.intakeService.getIntakes().then((intakes) => {this.setState(
				{intakes: intakes}
			)});
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
								<td> 
									<Link to={`/intakes/${intake.intakeId}`}> {new Date(intake.intakeDate).toDateString()} </Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		)
	}
}


export default IntakeList;