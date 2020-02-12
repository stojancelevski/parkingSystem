import {Component, OnInit} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {Marker} from '../../models/Marker';
import {FirebaseService} from '../../services/firebase.service';
import {mark} from '@angular/compiler-cli/src/ngtsc/perf/src/clock';
import {AuthService} from '../../services/auth.service';
import {Reservation} from '../../models/reservation';

@Component({
    selector: 'app-map',
    templateUrl: './map.page.html',
    styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
// @Input() $cinemas: any[];
    zoom = 15;

    lat: number;
    lng: number;
    markers: Marker[];
    reservations: Reservation[];

    constructor(private geolocation: Geolocation, private authService: AuthService, private fireService: FirebaseService) {
    }

    ngOnInit() {
        this.getMarkers();
        this.getLocation();
        this.getReservations();
    }

    getLocation() {
        this.geolocation.getCurrentPosition().then(location => {
            this.lat = location.coords.latitude;
            this.lng = location.coords.longitude;
        });
    }

    getMarkers() {
        this.fireService.getParkingList().subscribe(markers => {
            this.markers = markers;
        });
    }

    filterReservations(reservationKey) {
        if (this.reservations !== undefined) {
            const match = this.reservations.filter(reservation => reservation.parkingId === reservationKey).length;
            if (match !== undefined) {
                return match;
            }
        }
    }

    getReservations() {
        this.fireService.getReservationsList().subscribe(reservations => {
            this.reservations = reservations;
        });
    }


}
