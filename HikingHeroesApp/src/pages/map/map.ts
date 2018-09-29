import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { EventCreationPage } from '../event-creation/event-creation';
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
	address : String = '7/0022';
	historyTimeout = { dateFrom:'', dateTo:'' };
	
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
	}
	
	ionViewDidLoad() {
		console.log(this.map);
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
	//	console.log(this.map);
		if (localStorage.getItem('token') === null) {
			this.guest = true;
		} else {
			this.guest = false;
		}
		if (this.map == undefined) {
			this.map = leaflet.map("map").fitWorld();
		}
	}
/*
	ionViewWillEnter() {
		console.log(this.map);
		if (localStorage.getItem('token') === null) {
			this.guest = true;
		} else {
			this.guest = false;
		}
		if (this.map == undefined) {
			this.map = leaflet.map("map").fitWorld();
		}
	}
	
	ionViewDidEnter() {
		this.loadmap();
	}
	*/
	loadmap() {
		let events = [];
		let mapEvents = [];
		let map = this.map;
		let popup = leaflet.popup();
		let restProvider = this.restProvider;
		let navCtrl = this.navCtrl;
		let getEvents = this.getEvents;
		let addMarker;
		let BCLIcon = leaflet.icon({
			iconUrl: 'assets/icon/BCLIcon.png',
			iconSize: [26, 29]
		});
	//	console.log(addMarker);
		
	//	this.getEvents();
	//	let map = leaflet.map("map").fitWorld();
		leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
			maxZoom: 18
		}).addTo(this.map);
		
		this.map.locate({
			setView: true,
			maxZoom: 10
		}).on('locationfound', (e) => {
			console.log('found you');
			let markerGroup = leaflet.featureGroup();
		//	let marker: any = leaflet.marker([e.latitude, e.longitude]).on('click', () => {
		//		alert('Marker clicked');
		//	})
		//	markerGroup.addLayer(marker);
			this.map.addLayer(markerGroup);
		//	this.map.zoomIn(5);
		}).on('locationerror', (err) => {
			let markerGroup = leaflet.featureGroup();
			this.map.addLayer(markerGroup);
			// alert(err.message);
		})
		
		//this.map = map;

		this.map.on('moveend', function(e){
			this.map = map;
			this.restProvider = restProvider;
			let bounds = map.getBounds();
		//	let mapBounds = { lt_lat : this.map.getBounds().getSouthWest().lat, lt_lng : this.map.getBounds().getSouthWest().lng, rb_lat : this.map.getBounds().getNorthEast().lat, rb_lng : this.map.getBounds().getNorthEast().lng };
			let mapBounds = "?lt_lat=" + bounds.getSouthWest().lat + "&lt_lng=" + bounds.getSouthWest().lng + "&rb_lat=" + bounds.getNorthEast().lat + "&rb_lng=" + bounds.getNorthEast().lng;
		/*	if (this.mapBounds != undefined) {
				console.log(this.mapBounds);
				this.mapBounds.lt_lat = map.getBounds().getSouthWest().lat;
				this.mapBounds.lt_lng = map.getBounds().getSouthWest().lng;
				this.mapBounds.rb_lat = map.getBounds().getNorthEast().lat;
				this.mapBounds.rb_lng = map.getBounds().getNorthEast().lng;
			//	getEvents();
				console.log(this.mapBounds);
			*/	
				restProvider.getEvents(mapBounds).then((result) => {
					this.data = result;
					console.log(this.data);
					if (true) {
						events = this.data.events;
					} else {
						
					}
				}, (err) => {
					console.log(err);
				});
				
			//	events[0] = {id : 1, latitude : 60.222, longitude: 29.333, container: 786, naviaddress: 67866, seats: {free: 5, total: 10}};
				console.log(events);
				for (var k = 0; k < events.length; k++) {
					var j : any = 0;
					for (j = 0; j < mapEvents.length; j++) {
						if (events[k].id == mapEvents[j].id) {
							break;
						}
					}
					if (j == mapEvents.length) {
						console.log(events[k]);
						mapEvents[j] = events[k];
						leaflet.marker([events[k].latitude, events[k].longitude], {icon: BCLIcon}).addTo(map).bindPopup(events[k].name + "<br>" + "[" + events[k].container + "]" + events[k].naviaddress + "<br>" + "Seats: " + events[k].seats.free + "/" + events[k].seats.total);
					}
				} // Надо удаление - и поменять структуру.
			/*	
			} else {
				console.log("Undefined");
				this.mapBounds = mapBounds;
			}
			*/
		//	this.mapBounds = mapBounds;
		//	console.log("here");
				/*
				this.restProvider.getEvents(mapBounds).then((result) => {
					this.data = result;
					if (true) {
						events = this.data.events;
					} else {
						
					}
				}, (err) => {
					console.log(err);
				});
				
				console.log(events);
				for (event in events) {
					console.log(event);
					leaflet.marker([event.latitude, event.longitude]).addTo(map).bindPopup(event.latitude + "<br>" + event.longitude);
				}
*/				
		});
		
		this.map.on('click', function(e) {
			console.log(localStorage.getItem('mode'));
			if(localStorage.getItem('mode') == 'true') {
			//	console.log(e);
			//	console.log(this.data.tags);
				let lat = e.latlng.lat;
				let lng = e.latlng.lng;
				
			//	let addMarker = function(lat, lng) {
			//		console.log(lat);
			//		console.log(lng);
			//	};
			//	this.addMarker = addMarker;
				
				let marker = leaflet.marker([lat, lng], {icon: BCLIcon}).on('click', function(ee) {
					navCtrl.push(EventCreationPage, {latitude : lat, longitude : lng});
					map.removeLayer(marker);
				});
				marker.addTo(map).bindPopup("Tap this marker" + "<br>" + "to attach an event").openPopup();
				
			//	addMarker('+lat+','+lng+')
				
			//	let msg = "Latitude: " + lat + " <br> " + "Longitude: " + lng + '<br><button onclick="console.log(5)">Add event</button>';
			//	popup.setLatLng(e.latlng).setContent(msg).openOn(map);
			}
		});
		
	}
	
	getEvents() {
		console.log("fired");
		console.log(this);
		if (this.map != undefined) {
			this.restProvider.getEvents(this.mapBounds).then((result) => {
				this.data = result;
				if (true) {
					this.events = this.data.events;
					return this.events;
				} else {
					//this.presentToast(this.data.guest);
				}
			}, (err) => {
			    this.presentToast(err);
			});
		}
	}
	
	getAddress() {
		console.log(this.address);
		if(this.address){
			console.log(this.address);
			this.showLoader();	
			this.restProvider.getAddress(this.address).then((result) => {
				this.loading.dismiss();
				this.data = result;
				console.log(this.data.result.point.lat);
				console.log(this.data.result.point.lng);
				
				leaflet.marker([this.data.result.point.lat, this.data.result.point.lng]).addTo(this.map).bindPopup(this.data.result.point.lat + "<br>" + this.data.result.point.lng);
				
			}, (err) => {
				this.loading.dismiss();
	//		    this.presentToast(err);
			});
		} else {
	//		this.presentToast("Field required!");
		}
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
