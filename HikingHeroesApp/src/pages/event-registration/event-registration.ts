import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-event-registration',
  templateUrl: 'event-registration.html',
})
export class EventRegistrationPage {

	loading: any;
	data: any;
	guest : boolean = true;
	id = '';
	item: any;

	constructor(public navCtrl: NavController,
				public navParams: NavParams,
				public restProvider: RestProvider,
				public loadingCtrl: LoadingController,
				private toastCtrl: ToastController) {
					if (localStorage.getItem('token') === null) {
						this.guest = true;
					} else {
						this.guest = false;
						this.item = navParams.get('item');
					}
	}
	
	joinEvent() {
		this.showLoader();
		this.restProvider.joinEvent(this.item.id).then((result) => {
			this.loading.dismiss();
			this.data = result;
			console.log("event created");
			this.navCtrl.pop();
		}, (err) => {
			this.loading.dismiss();
			console.log(err);
		});	
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad EventRegistrationPage');
	}
	
	showLoader(){
		this.loading = this.loadingCtrl.create({
			content: 'Joining event...'
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
