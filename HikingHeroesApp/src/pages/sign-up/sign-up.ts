import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { TabsPage } from '../tabs/tabs';
import { SignInPage } from '../sign-in/sign-in';

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
	loading: any;
	data: any;
	loggedIn : boolean = false;
	guest: boolean = true;
	signUpData = { first_name:'', last_name:'', email:'', password:'' };
	
constructor(public navCtrl: NavController,
				public navParams: NavParams,
				public restProvider: RestProvider,
				public loadingCtrl: LoadingController,
				private toastCtrl: ToastController) {
					if (localStorage.getItem('token') === null) {
						this.loggedIn = false;
						this.guest = true;
					} else {
						this.loggedIn = true;
						this.guest = false;
					}
	}
	
	signUp() {
		if(this.signUpData.first_name && this.signUpData.last_name && this.signUpData.email && this.signUpData.password){
			this.showLoader();
			this.restProvider.signUp(this.signUpData).then((result) => {
				this.loading.dismiss();
				this.data = result;
				console.log(this.data);
				if (this.data.guest == false) {
					localStorage.setItem('token', this.data.token); // Add
					localStorage.setItem('events', this.data.events);
					this.loggedIn = true;
					this.guest = false;
					this.navCtrl.pop();
				} else {
					this.presentToast(this.data.guest);
				}
			}, (err) => {
				this.loading.dismiss();
			    this.presentToast(err);
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
		console.log('ionViewDidLoad SignUpPage');
	}

}
