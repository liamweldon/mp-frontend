import React, { Component } from 'react';
import ProductService from '../services/ProductService';
import {Link} from 'react-router-dom';

//TODO: Formatting, for the love of god
//TODO: can't search w spaces
class ProductList extends Component {
	constructor(props) {
		super(props);
		this.productService = ProductService.getInstance();
		this.state = {searchString: false, products: false};
		this.search.bind(this);
	}

	search(){
		if(this.state.searchString) {
			this.productService.getProductsByName(this.state.searchString).then((products) => {
				this.setState({products: products});
			})
		}
	}

	handleSearchStringChange(e) {
		this.setState({searchString: e.target.value});
	}

	render() {
		return(
		<div>
			<h2> Products </h2>
				<button onClick={this.search.bind(this)}>
							SEARCH
				</button>
				<input type="text" onChange={this.handleSearchStringChange.bind(this)} value={this.state.searchString? this.state.searchString : ""} />
			{this.state.products &&
				<table>
					<tbody>
						<tr className="header-row">
							<td> NDB ID </td>
							<td> Product Name </td>
							<td> Expiration Rate (days) </td>
							<td> Manufacturer </td>
						</tr>
				{this.state.products.map((product) => (
					<tr key={product.ndb}>
						<td>
							{product.ndb}
						</td>
						<td>
							{product.longName}
						</td>
						<td>
							{product.exprRate}
						</td>
						<td>
							{product.manufacturer}
						</td>
					</tr>
					))}
				</tbody>
			</table>
			}
		</div>
		)
	}
}

export default ProductList;