import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuth, AngularFireAuthModule} from '@angular/fire/auth';
import {environment} from '../environments/environment';
import {AngularFireDatabase, AngularFireDatabaseModule} from '@angular/fire/database';
import {FirebaseService} from './services/firebase.service';
import {NativeGeocoder} from '@ionic-native/native-geocoder/ngx';
import {IonicStorageModule, Storage} from '@ionic/storage';
import {FormBuilder} from '@angular/forms';
import {DatePipe} from '@angular/common';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        IonicStorageModule.forRoot()

    ],
    providers: [
        StatusBar,
        SplashScreen,
        Geolocation,
        NativeGeocoder,
        FormBuilder,
        DatePipe,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        AngularFireDatabase,
        FirebaseService,
        AngularFireAuth,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}


