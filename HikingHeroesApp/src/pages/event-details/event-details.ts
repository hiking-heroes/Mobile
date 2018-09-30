import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-event-details',
  templateUrl: 'event-details.html',
})
export class EventDetailsPage {
	item: any;

	constructor(public navCtrl: NavController,
				public navParams: NavParams,
				public restProvider: RestProvider,
				public loadingCtrl: LoadingController,
				private toastCtrl: ToastController) {
		this.item = navParams.get('item');
	}
  
  	exitEvent() {
		this.showLoader();
		this.restProvider.exitEvent(this.item.id).then((result) => {
			this.loading.dismiss();
			this.data = result;
			if (this.data.answer == 200) {
				console.log("event created");
				this.navCtrl.pop();
			} else {
				console.log(this.data.answer);
			}
		}, (err) => {
			this.loading.dismiss();
			console.log(err);
		});	
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad EventDetailsPage');
	}
	
	showLoader(){
		this.loading = this.loadingCtrl.create({
			content: 'Creating event...'
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
