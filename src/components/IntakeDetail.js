import React, { Component } from 'react';
import IntakeService from '../services/IntakeService';

class IntakeDetail extends Component {
//TODO: Link
	constructor(props) {
		super(props);
		this.intakeService = IntakeService.getInstance();
	}
	componentDidMount() {
		const id = parseInt(this.props.match.params.id);
		this.intakeService.getIntakeById(id).then((intakeJson) => {
			this.setState({intake: intakeJson.intake})
		})
	}
	render() {
		return (
		<label>
			Intake Detail Here
		</label>
		)
	}
}


export default IntakeDetail;