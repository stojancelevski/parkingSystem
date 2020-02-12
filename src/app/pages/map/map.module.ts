import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {MapPageRoutingModule} from './map-routing.module';

import {MapPage} from './map.page';
import {AgmCoreModule} from '@agm/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AgmCoreModule.forRoot({
            // please get your own API key here:
            // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
            apiKey: 'AIzaSyCXJ8cbvJGdhOQYOjHk8eCEkHgr57m0GPA'
        }),
        MapPageRoutingModule
    ],
    declarations: [MapPage]
})
export class MapPageModule {
}
