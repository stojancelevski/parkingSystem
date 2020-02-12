import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {AgmCoreModule} from '@agm/core';
import {TimerComponent} from '../components/timer/timer.component';


@NgModule({
    declarations: [
        TimerComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AgmCoreModule.forRoot({
            // please get your own API key here:
            // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
            apiKey: 'AIzaSyCXJ8cbvJGdhOQYOjHk8eCEkHgr57m0GPA'
        }),
    ],
    exports: [
        TimerComponent,
        CommonModule,
        FormsModule,
        IonicModule,
    ]
})
export class SharedModule {
}
