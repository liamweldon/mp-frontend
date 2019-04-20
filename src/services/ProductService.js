import {API_ROOT} from '../constants';

export default class ProductService {
	static instance = null;
	static getInstance() {
		if (ProductService.instance === null) {
			ProductService.instance = new ProductService();
		}
	return this.instance;
 	}

	getProductsByName = (name) => 
		fetch(`${API_ROOT}/products/search/${name}/200`, {
		method: 'GET',
		headers: {
			'Content-Type' : 'application/json'
		}
	}).then((response) => response.json());
	
	getProductByNDB = (ndb) => 
		fetch(`${API_ROOT}/products/${ndb}`, {
		method: 'GET',
		headers: {
			'Content-Type' : 'application/json'
		}
	}).then((response) => response.json());
}