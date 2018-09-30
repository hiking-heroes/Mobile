import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailsEventPage } from './details-event';

@NgModule({
  declarations: [
    DetailsEventPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailsEventPage),
  ],
})
export class DetailsEventPageModule {}
