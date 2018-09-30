import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { SignInPage } from '../sign-in/sign-in';
import { SignUpPage } from '../sign-up/sign-up';
import { DetailsEventPage } from '../details-event/details-event';

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
			this.items = JSON.parse(localStorage.getItem('events'));
		}
	}
	
	eventDetails(item){
		this.navCtrl.push(DetailsEventPage, {item: item});
	}
	
	
	
	toSignIn() {
		this.navCtrl.push(SignInPage);
	}
	
	toSignUp() {
		this.navCtrl.push(SignUpPage);
	}
	
	update() {
		this.showLoader();
			this.restProvider.update().then((result) => {
				this.loading.dismiss();
				this.data = result;
				this.items = this.data.events;
				localStorage.setItem('events', JSON.stringify(this.items));
				this.clear();
			}, (err) => {
				this.loading.dismiss();
				this.presentToast(err);
		});
	}
	
	updateTimes() {
		this.showLoader();
			this.restProvider.update().then((result) => {
				this.loading.dismiss();
				this.data = result;
				this.chooseEvents();
			}, (err) => {
				this.loading.dismiss();
				this.presentToast(err);
		});
	}
	
	chooseEvents() {
		this.items = [];
		let k = 0;
		for (let j = 0; j < this.data.events.length; j++) {
			if (this.historyTimeout.dateFrom <= this.data.events[j].start && (this.historyTimeout.dateTo >= this.data.events[j].end || this.historyTimeout.dateTo == '')) {
				this.items[k] = this.data.events[j];
				k++;
			}
		}
		localStorage.setItem('events', JSON.stringify(this.items));
	}
	
	clear() {
		this.historyTimeout.dateFrom = '';
		this.historyTimeout.dateTo = '';
	}
	
	signOut() {
	/*	this.showLoader();	
		this.restProvider.signOut().then((result) => {
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
		this.guest = true;
		this.navCtrl.setRoot(this.navCtrl.getActive().component);
	}
	
	
	showLoader(){
		this.loading = this.loadingCtrl.create({
			content: 'Updating...'
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
