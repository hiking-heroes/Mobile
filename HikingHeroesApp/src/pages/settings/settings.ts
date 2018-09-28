import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { SignInPage } from '../sign-in/sign-in';
import { SignUpPage } from '../sign-up/sign-up';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
	
	loading: any;
	data: any;
	guest: boolean = true;

	constructor(public navCtrl: NavController,
				public navParams: NavParams,
				public restProvider: RestProvider,
				public loadingCtrl: LoadingController, 
				private toastCtrl: ToastController) {
					if (localStorage.getItem('token') === null) {
						this.guest = true;
					} else {
						this.guest = false;
					}
	}
	
	toSignIn() {
		this.navCtrl.push(SignInPage);
	}
	
	toSignUp() {
		this.navCtrl.push(SignUpPage);
	}
	
	signOut() {
		localStorage.removeItem('token');
		this.guest = true;
		this.navCtrl.setRoot(this.navCtrl.getActive().component);
	}

}