import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import { RestProvider } from '../../providers/rest/rest';

import { HomePage } from '../home/home';
import { MapPage } from '../map/map';
import { SettingsPage } from '../settings/settings';
import { SignInPage } from '../sign-in/sign-in';
import { SignUpPage } from '../sign-up/sign-up';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
	@ViewChild('appTabs') appTabs: Tabs;
	
	tab1Root = HomePage;
	tab2Root = MapPage;
	tab3Root = SettingsPage;
	loggedIn : boolean = false;
	selectedTab = '';

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
	
	ionViewWillEnter(){
		if (localStorage.getItem('token') === null) {
				this.loggedIn = false;
		} else {
			this.loggedIn = true;
		}
	//	this.selectedTab = this.appTabs.getSelected().tabTitle;
	//	console.log(this.appTabs.getSelected());
	}
	
	toSignIn() {
		this.navCtrl.push(SignInPage);
	}
	
	toSignUp() {
		this.navCtrl.push(SignUpPage);
	}
	
	signOut() {
		this.showLoader();	
		this.restProvider.signOut().then((result) => {
			this.loading.dismiss();
			this.data = result;
			this.loggedIn = false;
		}, (err) => {
			this.loading.dismiss();
		    this.presentToast(err);
			this.loggedIn = false;
		});
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
