import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import leaflet from 'leaflet';

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
	@ViewChild('map') mapContainer: ElementRef;
	loading : any;
	map : any;
	data : any;
	address : String = '7/0022';
	
//	lt_lat : number;
//	lt_lng : number;
//	rb_lat : number;
//	rb_lng : number;
	mapBounds = { lt_lat : 0, lt_lng : 0, rb_lat : 0, rb_lng : 0 };
	events = [];
	
	constructor(public navCtrl: NavController,
				public navParams: NavParams,
				public restProvider: RestProvider, 
				public loadingCtrl: LoadingController, 
				private toastCtrl: ToastController) {
	}

	ionViewWillEnter() {
		console.log(this.map);
		if (this.map == undefined) {
			this.map = leaflet.map("map").fitWorld();
		}
	}
	
	ionViewDidEnter() {
		this.loadmap();
	}
	
	loadmap() {
		let events = [];
		let mapEvents = [];
		let map = this.map;
		let popup = leaflet.popup();
		let restProvider = this.restProvider;
		let getEvents = this.getEvents;
		
		console.log("this");
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
			let marker: any = leaflet.marker([e.latitude, e.longitude]).on('click', () => {
				alert('Marker clicked');
			})
			markerGroup.addLayer(marker);
			this.map.addLayer(markerGroup);
		}).on('locationerror', (err) => {
			// alert(err.message);
		})
		
		//this.map = map;

		this.map.on('moveend', function(e){

			this.map = map;
			this.restProvider = restProvider;
			let bounds = map.getBounds();
		//	let mapBounds = { lt_lat : this.map.getBounds().getSouthWest().lat, lt_lng : this.map.getBounds().getSouthWest().lng, rb_lat : this.map.getBounds().getNorthEast().lat, rb_lng : this.map.getBounds().getNorthEast().lng };
			let mapBounds = "? lt_lat=" + bounds.getSouthWest().lat + " & lt_lng=" + bounds.getSouthWest().lng + " & rb_lat=" + bounds.getNorthEast().lat + " & rb_lng=" + bounds.getNorthEast().lng;
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
					if (true) {
						events = this.data.events;
					} else {
						
					}
				}, (err) => {
					console.log(err);
				});
				
				events[0] = {id : 1, latitude : 56.222, longitude: 38.333};
				console.log(events);
				for (var k in events) {
					var j : any = 0;
					for (j in mapEvents) {
						if (events[k].id == mapEvents[j].id) {
							break;
						}
					}
					if (j == mapEvents.length) {
						console.log(events[k]);
						mapEvents[length] = events[k];
						leaflet.marker([events[k].latitude, events[k].longitude]).addTo(map).bindPopup(events[k].latitude + "<br>" + events[k].longitude);
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
			console.log(e);
			let lat = e.latlng.lat;
			let lng = e.latlng.lng;
			
			let addMarker = function(lat, lng) {
				console.log(lat);
				console.log(lng);
			};
			this.addMarker = addMarker;
			
			
			let msg = "Latitude: " + lat + " <br> " + "Longitude: " + lng + '<br><button onclick="addMarker('+lat+','+lng+')">Add event</button>';
			popup.setLatLng(e.latlng).setContent(msg).openOn(map);
		});
		
	}
	
	
	getCoordinates() {
		console.log(this.map);
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
	
/*	ionViewDidLoad() {
		this.platform.ready().then(() => {
			console.log('ionViewDidLoad MapPage');
			this.loadMap();
		});
	}
	
	onButtonClick() {

		// Get the location of you
		this.map.getMyLocation().then((location: MyLocation) => {
			console.log(JSON.stringify(location, null ,2));

			// Move the map camera to the location with animation
			this.map.animateCamera({
				target: location.latLng,
				zoom: 17,
				tilt: 30
			});

			// add a marker
			let marker: Marker = this.map.addMarkerSync({
				title: '@ionic-native/google-maps plugin!',
				snippet: 'This plugin is awesome!',
				position: location.latLng,
				animation: GoogleMapsAnimation.BOUNCE
			});

			// show the infoWindow
			marker.showInfoWindow();
			
			// If clicked it, bounce it
			marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
				marker.setAnimation(GoogleMapsAnimation.BOUNCE);
			});
		});
	}
*/

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
