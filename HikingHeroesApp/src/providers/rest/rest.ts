import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

	apiUrl = 'https://bigcitylife.pythonanywhere.com/api/v1';
//	apiUrl = 'http://localhost:8100';
	naviApiUrl = 'https://staging-api.naviaddress.com/api/v1.5/';

	constructor(public http: HttpClient) {
		console.log('Hello RestProvider Provider');
	}
	
	signIn(credentials) {
		return new Promise((resolve, reject) => {
			let headers = new HttpHeaders();
			headers.append('content-type', 'application/json');
			this.http.post(this.apiUrl+'/users/signin', credentials, {headers: headers})
				.subscribe(res => {
					console.log(res); // log
					resolve(res);
				}, (err) => {
					console.log(err); // log
					reject(err);
				});
		});
	}
	
	signUp(userData) {
		return new Promise((resolve, reject) => {
			let headers = new HttpHeaders();
			headers.append('content-type', 'application/json');
			this.http.post(this.apiUrl+'/users/signup', userData, {headers: headers})
				.subscribe(res => {
					console.log(res); // log
					resolve(res);
				}, (err) => {
					console.log(err); // log
					reject(err);
				});
		});	  
	}
	
	signOut(){
		return new Promise((resolve, reject) => {
			let headers = new HttpHeaders();
			headers.append('X-Auth-Token', localStorage.getItem('token')); // Change below
			this.http.post(this.apiUrl+'/users/signout', {token:localStorage.getItem('token')}, {headers: headers})
				.subscribe(res => { // Change below
					var phoneNumber = localStorage.getItem('phoneNumber');
					localStorage.clear();
					localStorage.setItem('phoneNumber', phoneNumber); // Till this
					console.log(res); // log
					resolve(res);
				}, (err) => {
					console.log(err); // log
					// Change below
					var phoneNumber = localStorage.getItem('phoneNumber');
					localStorage.clear();
					localStorage.setItem('phoneNumber', phoneNumber); // Till this
					reject(err);
				});
		});
	}
	
	update(){
		return new Promise((resolve, reject) => {
			let headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
			this.http.get(this.apiUrl+'/events/my', {headers})
				.subscribe(res => { // Change below
					console.log(res); // log
					resolve(res);
				}, (err) => {
					console.log(err); // log
					reject(err);
				});
		});
	}
	
	getEvents(bounds) {
		return new Promise((resolve, reject) => {
		//	let headers = new HttpHeaders();
		//	headers.append('content-type', 'application/json');
			this.http.get(this.apiUrl+"/events"+bounds)
				.subscribe(res => {
					console.log(res); // log
					resolve(res);
				}, (err) => {
					console.log(err); // log
					reject(err);
				});
		});	  
	}
	
	getEvent(id) {
		return new Promise((resolve, reject) => {
			this.http.get(this.apiUrl+"/events/"+id)
				.subscribe(res => {					
					console.log(res); // log
					resolve(res);
				}, (err) => {
					console.log(err); // log
					reject(err);
				});
		});
	}
	
	joinEvent(id) {
		return new Promise((resolve, reject) => {
		//	this.http.post(this.apiUrl+'/events', eventData, {headers: {'Authorization': 'token'}})
	//	let headers = new HttpHeaders({"Authorization", "Bearer " + localStorage.getItem('token')});
		this.http.put(this.apiUrl+'/events/'+id+'/join', id, {headers: {'Authorization': "Bearer " + localStorage.getItem('token')}})
			.subscribe(res => {
				console.log(res); // log
				resolve(res);
			}, (err) => {
				console.log(err); // log
				reject(err);
			});
		});	  
	}
	
	exitEvent(id) {
		return new Promise((resolve, reject) => {
		//	this.http.post(this.apiUrl+'/events', eventData, {headers: {'Authorization': 'token'}})
		let headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
		this.http.put(this.apiUrl+'/events/'+id+'/exit', id, {headers})
			.subscribe(res => {
				console.log(res); // log
				resolve(res);
			}, (err) => {
				console.log(err); // log
				reject(err);
			});
		});	  
	}
	
	createEvent(eventData) {
		return new Promise((resolve, reject) => {
		//	this.http.post(this.apiUrl+'/events', eventData, {headers: {'Authorization': 'token'}})
		let headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
			this.http.post(this.apiUrl+'/events', eventData, {headers})
				.subscribe(res => {
					console.log(res); // log
					resolve(res);
				}, (err) => {
					console.log(err); // log
					reject(err);
				});
		});	  
	}
	
	updateAddress(addressData) {
		return new Promise((resolve, reject) => {
			let headers = new HttpHeaders();
			headers.append('content-type', 'application/json');
			this.http.post(this.apiUrl+'updateAddress', addressData, {headers: headers})
				.subscribe(res => {
					
					console.log(res); // log
					resolve(res);
				}, (err) => {
					console.log(err); // log
					reject(err);
				});
		});	  
	}
	
	deleteAddress(addressData) {
		return new Promise((resolve, reject) => {
			let headers = new HttpHeaders();
			headers.append('content-type', 'application/json');
			this.http.post(this.apiUrl+'deleteAddress', addressData, {headers: headers})
				.subscribe(res => {
					
					console.log(res); // log
					resolve(res);
				}, (err) => {
					console.log(err); // log
					reject(err);
				});
		});	  
	}
	
	notifications(device) {
		return new Promise((resolve, reject) => {
		//	this.http.post(this.apiUrl+'/events', eventData, {headers: {'Authorization': 'token'}})
		let headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
			this.http.post(this.apiUrl+'/notifications/devices', device, {headers})
				.subscribe(res => {
					console.log(res); // log
					resolve(res);
				}, (err) => {
					console.log(err); // log
					reject(err);
				});
		});	  
	}

}
