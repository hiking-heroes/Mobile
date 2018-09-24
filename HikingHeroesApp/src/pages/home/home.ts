import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { SignInPage } from '../sign-in/sign-in';
import { SignUpPage } from '../sign-up/sign-up';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	loggedIn : boolean = false;
	constructor(public navCtrl: NavController,
				public navParams: NavParams,
				public restProvider: RestProvider) {
					if (localStorage.getItem('token') === null) {
					//	localStorage.setItem('token', 'token');
					//	localStorage.removeItem('token');
					//	console.log(localStorage.getItem('token'));
					} else {
						console.log("Triggered");
						this.loggedIn = true;
					}
	}
	
	toSignIn() {
		this.navCtrl.push(SignInPage);
	}
	
	toSignUp() {
		this.navCtrl.push(SignUpPage);
	}

}
