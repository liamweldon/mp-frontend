import React, { Component } from 'react';

class IntakeList extends Component {

	constructor(props) {
		super(props);
		this.state = {intakes: []}
		this.intakeService = IntakeService.getInstance();
	}

	componentDidMount() {
		this.intakeService.getIntakes().then((intakesJson) => {this.setState(
				//TODO: link
				{intakes: intakesJson.intakes}
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
									<Link to=`/intakes/${intake.intakeId}`> {Date.toDateString(intake.intakeDate)} </Link>
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