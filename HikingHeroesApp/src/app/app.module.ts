import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { MapPage } from '../pages/map/map';
import { SettingsPage } from '../pages/settings/settings';
import { SignInPage } from '../pages/sign-in/sign-in';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { EventCreationPage } from '../pages/event-creation/event-creation';
import { EventRegistrationPage } from '../pages/event-registration/event-registration';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpClientModule } from '@angular/common/http';
import { RestProvider } from '../providers/rest/rest';

@NgModule({
  declarations: [
    MyApp,
	TabsPage,
    HomePage,
	MapPage,
	SettingsPage,
	SignInPage,
	SignUpPage,
	EventCreationPage,
	EventRegistrationPage
  ],
  imports: [
    BrowserModule,
	HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
	TabsPage,
    HomePage,
	MapPage,
	SettingsPage,
	SignInPage,
	SignUpPage,
	EventCreationPage,
	EventRegistrationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider
  ]
})
export class AppModule {}
