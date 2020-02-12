import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from '../models/user';
import {Marker} from '../models/Marker';
import {FirebaseService} from './firebase.service';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    $loggedInUser: User;
    markers: Marker[];

    constructor(private auth: AngularFireAuth, private firebaseService: FirebaseService) {

    }

    getMarkers() {
        return this.markers;
    }

    setMarkers(marker: Marker[]) {
        this.markers = marker;
    }

    getloggedUser() {
        return this.$loggedInUser;
    }

    setLoggedUser(user: User) {
        this.$loggedInUser = user;
    }

    SignIn(email, password) {
        return new Promise<any>((resolve, reject) => {
            this.auth.auth.signInWithEmailAndPassword(email, password)
                .then((result) => {
                    resolve(result);
                }).catch((error) => {
                reject(error);
            });
        });
    }

    SignUp(email, password) {
        return new Promise<any>((resolve, reject) => {
            this.auth.auth.createUserWithEmailAndPassword(email, password)
                .then((result) => {
                    resolve(result);
                }).catch((error) => {
                reject(error);
            });
        });
    }

}
