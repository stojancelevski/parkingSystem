import {Component, OnInit} from '@angular/core';

import {MenuController, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Storage} from '@ionic/storage';
import {Router} from '@angular/router';
import {FirebaseService} from './services/firebase.service';
import {AuthService} from './services/auth.service';
import {ToastService} from './services/toast.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
    public appPages = [
                {
            title: 'Home',
            url: '/home',
            icon: 'home'
        },
        {
            title: 'Parking Spots',
            url: '/map',
            icon: 'map'
        },
        {
            title: 'LogOut',
            icon: 'log-out'
        },
    ];

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private storage: Storage,
        private router: Router,
        private authService: AuthService,
        private fireService: FirebaseService,
        private menuCtrl: MenuController,
        private toastService: ToastService
    ) {
        this.initializeApp();

    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.storage.get('loggedInUser').then((val) => {
                if (val !== 0 && val !== null) {
                    this.statusBar.styleDefault();
                    this.splashScreen.hide();
                    this.router.navigate(['/']);
                } else {
                    this.router.navigate(['/login']);
                }
            });

        });
    }

    ngOnInit(): void {

    }

    openPage(page: string) {
        if (page === 'LogOut') {
            this.storage.set('loggedInUser', 0);
            this.toastService.presentToast('You are Logged Out!');
            this.menuCtrl.enable(false, 'menu');
            this.router.navigate(['/login'], {replaceUrl: true});
        }
    }


}
