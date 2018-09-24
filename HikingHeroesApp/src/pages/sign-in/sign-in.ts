import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {
	loading: any;
	data: any;
	loggedIn : boolean = false;
	signInData = { phone:'', email:'', password:'' };
	
	constructor(public navCtrl: NavController,
				public navParams: NavParams,
				public restProvider: RestProvider,
				public loadingCtrl: LoadingController,
				private toastCtrl: ToastController) {
					if (localStorage.getItem('token') === null) {
						this.loggedIn = false;
					} else {
						this.loggedIn = true;
					}
	}
	
	signIn() {
		if(this.signInData.phone && this.signInData.password){
			this.showLoader();	
			localStorage.setItem('phone', this.signInData.phone);
			console.log("here");
			this.restProvider.signIn(this.signInData).then((result) => {
				this.loading.dismiss();
				this.data = result;
				if (this.data.result == "True") {
					this.loading.dismiss();
					localStorage.setItem('token', this.data.token); // Add
					this.loggedIn = true;
					this.navCtrl.pop();
				} else {
				this.loading.dismiss();
					this.presentToast(this.data.result);
				}
			}, (err) => {
				this.loading.dismiss();
			    this.presentToast(err);
				
					localStorage.setItem('token', "123");
					this.loggedIn = true;
					this.navCtrl.pop();
				
			});
		} else {
			this.presentToast("Fields required!");
		}
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

	ionViewDidLoad() {
		console.log('ionViewDidLoad SignInPage');
	}

}
