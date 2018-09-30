import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { EventCreationPage } from '../event-creation/event-creation';
import { EventRegistrationPage } from '../event-registration/event-registration';
import { SignInPage } from '../sign-in/sign-in';
import { SignUpPage } from '../sign-up/sign-up';
import leaflet from 'leaflet';

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
	@ViewChild('map') mapContainer: ElementRef;
	
	tagsData = { tags:'' };
	mode = 'false';
	
	loading : any;
	guest: boolean = true;
	map : any;
	data : any;
	
	starts = '';
	ends = '';
	tags = '';
	
	mapBounds = { lt_lat : 0, lt_lng : 0, rb_lat : 0, rb_lng : 0 };
	events = [];
	
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
					this.updateTimes();
	}
	
	ionViewDidLoad() {
		if (localStorage.getItem('token') === null) {
			this.guest = true;
		} else {
			this.guest = false;
		}
		if (this.map == undefined) {
			this.map = leaflet.map("map").fitWorld();
			this.loadmap();
		}
	}
	
	ionViewWillEnter() {
		if (localStorage.getItem('token') === null) {
			this.guest = true;
		} else {
			this.guest = false;
		}
		if (this.map == undefined) {
			this.map = leaflet.map("map").fitWorld();
		}
	}

	loadmap() {
		let events = [];
		let mapEvents = [];
		let map = this.map;
		let restProvider = this.restProvider;
		let loadingCtrl = this.loadingCtrl;
		let navCtrl = this.navCtrl;
		let BCLIcon = leaflet.icon({
			iconUrl: 'assets/icon/BCLIcon.png',
			iconSize: [26, 29]
		});
		
		leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
			maxZoom: 18
		}).addTo(this.map);
		
		let markerGroup = leaflet.featureGroup();
		
		this.map.locate({
			setView: true,
			maxZoom: 10
		}).on('locationfound', (e) => {
			console.log('found you');
			this.map.setView(e.latlng, 9);
			this.map.addLayer(markerGroup);
		}).on('locationerror', (err) => {
			this.map.addLayer(markerGroup);
			// alert(err.message);
		})
		

		this.map.on('moveend', function(e){
			this.map = map;
			let bounds = map.getBounds();
		//	let mapBounds = { lt_lat : this.map.getBounds().getSouthWest().lat, lt_lng : this.map.getBounds().getSouthWest().lng, rb_lat : this.map.getBounds().getNorthEast().lat, rb_lng : this.map.getBounds().getNorthEast().lng };
			let mapBounds = "?lt_lat=" + bounds.getSouthWest().lat + "&lt_lng=" + bounds.getSouthWest().lng + "&rb_lat=" + bounds.getNorthEast().lat + "&rb_lng=" + bounds.getNorthEast().lng;
			if (localStorage.getItem('tags') != '') {
				mapBounds = mapBounds + "&tags=" + localStorage.getItem('tags');
			}
			if (localStorage.getItem('starts') != '') {
				mapBounds = mapBounds + "&start=" + localStorage.getItem('starts');
			}
			if (localStorage.getItem('ends') != '') {
				mapBounds = mapBounds + "&end=" + localStorage.getItem('ends');
			}
			restProvider.getEvents(mapBounds).then((result) => {
				this.data = result;
				events = this.data.events;
			}, (err) => {
				console.log(err);
			});
			
			for (var k = 0; k < mapEvents.length; k++) {
				markerGroup.removeLayer(mapEvents[k]);
			}
				
			mapEvents = [];
			var k = 0
			for (k = 0; k < events.length; k++) {
				// + "<br>" + "[" + events[k].container + "]" + events[k].naviaddress + "<br>" + "Seats: " + events[k].seats.free + "/" + events[k].seats.total
				let marker = leaflet.marker([events[k].latitude, events[k].longitude], {icon: BCLIcon}).on('click', function(ee) {
					if(localStorage.getItem('mode') == 'false' && localStorage.getItem('token') != null) {
						if(marker._popup.isOpen()) {
							this.loading = loadingCtrl.create({
								content: 'Uploading event...'
							});
							this.loading.present();
							restProvider.getEvent(marker._leaflet_id).then((result) => {
								this.loading.dismiss();
								navCtrl.push(EventRegistrationPage, {item: result});
							}, (err) => {
								this.loading.dismiss();
								console.log(err);
							});	
						} else {
							marker._popup.openPopup();
						}
					}
				}).bindPopup("<center>" + "Tap this marker" + "<br>" + "to sign up for " + "<br>" + events[k].name + "</center>");	
				mapEvents[k] = marker;
				marker.addTo(map);
				marker._leaflet_id = events[k].id;
				markerGroup.addLayer(marker);
			};
				
		});
		
		this.map.on('click', function(e) {
			if(localStorage.getItem('mode') == 'true' && localStorage.getItem('token') != null) {
				let lat = e.latlng.lat;
				let lng = e.latlng.lng;
				
				let marker = leaflet.marker([lat, lng], {icon: BCLIcon}).on('click', function(ee) {
					navCtrl.push(EventCreationPage, {latitude : lat, longitude : lng});
					map.removeLayer(marker);
				});
				marker.addTo(map).bindPopup("Tap this marker to" + "<br>" + "attach an event").openPopup();

			}
		});
		
	}
	
	updateTimes() {
		localStorage.setItem('starts', this.starts);
		localStorage.setItem('ends', this.ends);
		localStorage.setItem('tags', this.tags);
	}
	
	toSignIn() {
		this.navCtrl.push(SignInPage);
	}
	
	toSignUp() {
		this.navCtrl.push(SignUpPage);
	}
	
	signOut() {	
		localStorage.removeItem('token');
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
