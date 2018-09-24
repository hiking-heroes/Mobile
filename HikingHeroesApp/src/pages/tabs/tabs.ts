import { Component } from '@angular/core';
import { MyApp } from '../../app/app.component';

import { HomePage } from '../home/home';
import { MapPage } from '../map/map';
import { SettingsPage } from '../settings/settings';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

	tab1Root = HomePage;
	tab2Root = MapPage;
	tab3Root = SettingsPage;

	constructor() {
	}
	
}
