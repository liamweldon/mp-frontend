import {API_ROOT} from '../api-config';

export default class ProductService {
	static instance = null;
	static getInstance() {
		if (ProductService.instance === null) {
			ProductService.instance = new ProductService();
		}
	return this.instance;
 	}
	// getProducts = () =>
	// fetch(`${API_ROOT}/products`, {
	// 	method: 'GET',
	// 	headers: {
	// 		'Content-Type' : 'application/json'
	// 	}
	// }).then((response) => response.json());

	getProductByName = (name) => 
		fetch(`${API_ROOT}/products/${name}/50`, {
		method: 'GET',
		headers: {
			'Content-Type' : 'application/json'
		}
	}).then((response) => response.json());
	
	getProductByNDB = (ndb) => 
		fetch(`${API_ROOT}/product/${ndb}`, {
		method: 'GET',
		headers: {
			'Content-Type' : 'application/json'
		}
	}).then((response) => response.json());
}