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
	constructor(public navCtrl: NavController,
				public navParams: NavParams,
				public restProvider: RestProvider, 
				public loadingCtrl: LoadingController, 
				private toastCtrl: ToastController) {
	}

	ionViewDidEnter() {
		console.log(this.map);
		if (this.map == undefined) {
			this.loadmap();
		}
	}
	
	loadmap() {
		this.map = leaflet.map("map").fitWorld();
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
			alert(err.message);
		})	 
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
			    this.presentToast(err);
			});
		} else {
			this.presentToast("Field required!");
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
