import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { SignInPage } from '../sign-in/sign-in';
import { SignUpPage } from '../sign-up/sign-up';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	loading: any;
	data: any;
	items = [];
	historyTimeout = { dateFrom:'', dateTo:'' };
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
	
	ionViewWillEnter(){
		if (localStorage.getItem('token') === null) {
				this.guest = true;
		} else {
			this.guest = false;
		}
		console.log(this.guest + " enter");
	}
	
	toSignIn() {
		this.navCtrl.push(SignInPage);
	}
	
	toSignUp() {
		this.navCtrl.push(SignUpPage);
	}
	
	signOut() {
		this.showLoader();	
	/*	this.restProvider.signOut().then((result) => {
			this.loading.dismiss();
			this.data = result;
			this.loggedIn = false;
		}, (err) => {
			this.loading.dismiss();
		    this.presentToast(err);
			this.loggedIn = false;
		});
	*/
		localStorage.removeItem('token');
		this.loading.dismiss();
		this.guest = true;
		this.navCtrl.setRoot(this.navCtrl.getActive().component);
	}
	
	
	showLoader(){
		this.loading = this.loadingCtrl.create({
			content: 'Authenticating...'
		});
		this.loading.present();
	}

	presentToast(msg) {
		let toast = this.toastCtrl.create({
			message: msg,
			duration: 3000,
			position: 'bottom',
			dismissOnPageChange: true
		});
		toast.onDidDismiss(() => {
			console.log('Dismissed toast');
		});
		toast.present();
	}

}
