import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-event-creation',
  templateUrl: 'event-creation.html',
})
export class EventCreationPage {
		
	loading: any;
	data: any;
	guest : boolean = true;
	// eventData = { lat:'', lng:'', name:'', event_start:'', event_end:'', description:'', web:'', type:'', default_lang:'', lang:'', map_visibility:true, seats:0, tags:[] };
	eventData = { lat:'', lng:'', name:'', event_start:'', event_end:'', seats:'', tags:[] };

	constructor(public navCtrl: NavController,
				public navParams: NavParams,
				public restProvider: RestProvider,
				public loadingCtrl: LoadingController,
				private toastCtrl: ToastController) {
					if (localStorage.getItem('token') === null) {
						this.guest = true;
					} else {
						this.guest = false;
						this.eventData.lat = navParams.get('latitude');
						this.eventData.lng = navParams.get('longitude');
					}
				}

	ionViewDidLoad() {
		console.log('ionViewDidLoad EventCreationPage');
	}
	
	createEvent() {
		if(this.eventData.name && this.eventData.event_start && this.eventData.event_end){
			this.eventData.tags[0] = this.eventData.name; // sdsd
			this.showLoader();
			console.log(this.eventData);
			this.restProvider.createEvent(this.eventData).then((result) => {
				this.loading.dismiss();
				this.data = result;
				console.log(this.data);
				if (this.data.Answer == 201) {
					console.log("event created");
					this.navCtrl.pop();
				} else {
					this.presentToast(this.data.Answer);
				}
			}, (err) => {
				this.loading.dismiss();
			    this.presentToast(err);
			});
		} else {
			console.log(this.eventData);
			this.presentToast("Fields required!");
		}		
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
