import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

	apiUrl = 'https://jsonplaceholder.typicode.com/';

	constructor(public http: HttpClient) {
		console.log('Hello RestProvider Provider');
	}
	
	signIn(credentials) {
		return new Promise((resolve, reject) => {
			let headers = new HttpHeaders();
			headers.append('Content-Type', 'application/json');
			this.http.post(this.apiUrl+'signIn', JSON.stringify(credentials), {headers: headers})
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
			headers.append('Content-Type', 'application/json');
			this.http.post(this.apiUrl+'signUp', JSON.stringify(userData), {headers: headers})
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
			this.http.post(this.apiUrl+'signOut', {token:localStorage.getItem('token')}, {headers: headers})
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

}
