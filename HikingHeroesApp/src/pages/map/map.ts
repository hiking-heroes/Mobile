import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import leaflet from 'leaflet';

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
	@ViewChild('map') mapContainer: ElementRef;
	map: any;
	constructor(public navCtrl: NavController, public navParams: NavParams) {
	
	}

	ionViewDidEnter() {
		this.loadmap();
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

}
