import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Marker} from '../models/Marker';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../models/user';
import {Reservation} from '../models/reservation';

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {
    markerRef: AngularFireList<Marker> = null;
    markerUrl = '/markers';

    usersRef: AngularFireList<User> = null;
    usersUrl = '/users';

    reservationsRef: AngularFireList<Reservation> = null;
    reservationsUrl = '/reservations';

    constructor(private database: AngularFireDatabase) {
        this.markerRef = database.list(this.markerUrl);
        this.usersRef = database.list(this.usersUrl);
        this.reservationsRef = database.list(this.reservationsUrl);
    }

    createParking(value) {
        this.markerRef.push(value);
    }

    getParkingLocation() {
        return this.markerRef;
    }

    getParkingList(): Observable<Marker[]> {
        return this.getParkingLocation().snapshotChanges().pipe(
            map(changes =>
                changes.map(c =>
                    ({key: c.payload.key, ...c.payload.val()})
                )
            )
        );
    }

    updateParking(key: string, value: any) {
        return this.markerRef.update(key, value);
    }

    deleteParking(key: string): Promise<any> {
        return this.markerRef.remove(key);
    }


    createUser(value) {
        this.usersRef.push(value);
    }

    getUsers() {
        return this.usersRef;
    }

    getUsersList(): Observable<User[]> {
        return this.getUsers().snapshotChanges().pipe(
            map(changes =>
                changes.map(c =>
                    ({key: c.payload.key, ...c.payload.val()})
                )
            )
        );
    }

    updateUser(key: string, value: any) {
        return this.usersRef.update(key, value);
    }

    deleteUser(key: string): Promise<any> {
        return this.usersRef.remove(key);
    }

    createReservation(value) {
        this.reservationsRef.push(value);
    }

    getReservatons() {
        return this.reservationsRef;
    }

    getReservationsList(): Observable<Reservation[]> {
        return this.getReservatons().snapshotChanges().pipe(
            map(changes =>
                changes.map(c =>
                    ({key: c.payload.key, ...c.payload.val()})
                )
            )
        );
    }

    updateReservation(key: string, value: any) {
        return this.reservationsRef.update(key, value);
    }

    deleteReservation(key: string): Promise<any> {
        return this.reservationsRef.remove(key);
    }
}
