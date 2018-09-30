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
	guest : boolean = true;
	signInData = { email:'', password:'' };
	
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
	
	signIn() {
		if(this.signInData.email && this.signInData.password){
			this.showLoader();
			this.restProvider.signIn(this.signInData).then((result) => {
				this.loading.dismiss();
				this.data = result;
				if (this.data.guest == false) {
					localStorage.setItem('token', this.data.token);
					localStorage.setItem('events', JSON.stringify(this.data.events));
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
		console.log('ionViewDidLoad SignInPage');
	}

}