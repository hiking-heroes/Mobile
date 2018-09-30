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
import { StartEventPage } from '../pages/start-event/start-event';
import { EventRegistrationPage } from '../pages/event-registration/event-registration';
import { DetailsEventPage } from '../pages/details-event/details-event';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpClientModule } from '@angular/common/http';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { RestProvider } from '../providers/rest/rest';

@NgModule({
  declarations: [
    MyApp,
	TabsPage, // To make apk delete below
    HomePage,
	MapPage,
	SettingsPage,
	SignInPage,
	SignUpPage,
	StartEventPage,
	EventRegistrationPage,
	DetailsEventPage
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
	StartEventPage,
	EventRegistrationPage,
	DetailsEventPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
	Push,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider
  ]
})
export class AppModule {}
