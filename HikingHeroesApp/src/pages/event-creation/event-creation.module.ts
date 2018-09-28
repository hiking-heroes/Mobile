import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventCreationPage } from './event-creation';

@NgModule({
  declarations: [
    EventCreationPage,
  ],
  imports: [
    IonicPageModule.forChild(EventCreationPage),
  ],
})
export class EventCreationPageModule {}
