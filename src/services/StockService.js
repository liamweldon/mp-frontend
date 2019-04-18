import {API_ROOT} from '../api-config';

export default class StockService {
	static instance = null;
	static getInstance() {
		if (StockService.instance === null) {
			StockService.instance = new StockService();
		}
	return this.instance;
 	}
	getStocks = () =>
	fetch(`${API_ROOT}/stocks`, {
		method: 'GET',
		headers: {
			'Content-Type' : 'application/json'
		}
	}).then((response) => response.json());

	getStockById = (id) => 
		fetch(`${API_ROOT}/stocks/one/${id}`, {
		method: 'GET',
		headers: {
			'Content-Type' : 'application/json'
		}
	}).then((response) => response.json());

	addStock = (ndb, quantity) => 
		fetch(`${API_ROOT}/stocks`, {
		method: 'POST',
		headers: {
			'Content-Type' : 'application/json'
		},
		body : JSON.stringify({
			ndb_number: ndb,
			quantity: quantity
		})
	}).then((response) => response.json());
	
	getStockItemsFromStockId = (id) =>
		fetch(`${API_ROOT}/stock/all/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type' : 'application/json'
			}
		}).then((response) => response.json());
	

}