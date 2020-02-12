import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateParkingPageRoutingModule } from './create-parking-routing.module';

import { CreateParkingPage } from './create-parking.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CreateParkingPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [CreateParkingPage]
})
export class CreateParkingPageModule {}
