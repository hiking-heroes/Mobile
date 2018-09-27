import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import { HomePage } from '../home/home';
import { MapPage } from '../map/map';
import { SettingsPage } from '../settings/settings';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
//	@ViewChild('appTabs') appTabs: Tabs;
	
	tab1Root = HomePage;
	tab2Root = MapPage;
	tab3Root = SettingsPage;
	guest: boolean = true;
	selectedTab = '';

	constructor(public navCtrl: NavController,
				public navParams: NavParams) {
					if (localStorage.getItem('token') === null) {
						this.guest = true;
					} else {
						this.guest = false;
					}
	}
	
}
