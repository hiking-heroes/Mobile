import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { RestProvider } from '../providers/rest/rest';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	rootPage:any;
	registrationData = { registrationId:'', registrationType:'' };
	device = { device_token:'' };
	data: any;

	constructor(platform: Platform, 
				statusBar: StatusBar, 
				splashScreen: SplashScreen,
				public restProvider: RestProvider, 
				private push: Push) {
		platform.ready().then(() => {
			this.rootPage = TabsPage;
			statusBar.styleDefault();
			splashScreen.hide();
			this.pushSetup();
		});
	}
	
		pushSetup () {
		const options: PushOptions = {
		   android: {
			   senderID: '8768659321',
			   forceShow: true
		   },
		   ios: {
			   alert: 'true',
			   badge: true,
			   sound: 'false'
		   }
		};

		const pushObject: PushObject = this.push.init(options);

		pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));

		pushObject.on('registration').subscribe((registration: any) => {
			this.registrationData.registrationId = registration.registrationId;
			this.registrationData.registrationType = registration.registrationType;
			this.device.device_token = registration.registrationId;
			console.log('Device registered', registration);
			this.restProvider.notifications(this.device).then((result) => {
				this.data = result;
				console.log(this.data);
			}, (err) => {
				console.log(err);
			});
		});
		
		pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
	}
	
}
