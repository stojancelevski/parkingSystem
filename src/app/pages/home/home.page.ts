import {Component, OnInit} from '@angular/core';
import {Reservation} from '../../models/reservation';
import {AuthService} from '../../services/auth.service';
import {FirebaseService} from '../../services/firebase.service';
import {DatePipe} from '@angular/common';
import {Marker} from '../../models/Marker';
import {User} from '../../models/user';
import {Storage} from '@ionic/storage';
import {AlertController} from '@ionic/angular';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
    parkingPlaces: Marker[];
    date: Date;
    reservations: Reservation[];
    allReservations: Reservation[];
    makeReservationButton: boolean;

    constructor(private authService: AuthService,
                private datePipe: DatePipe,
                private fireService: FirebaseService,
                private storage: Storage,
                private alertController: AlertController
    ) {
    }

    ngOnInit(): void {
        this.getUser().then(() => {
            this.getParkings();
            this.getAllReservations();
            this.getReservations();
        });
    }

    getParkings() {
        this.fireService.getParkingList().subscribe(markers => {
            this.parkingPlaces = markers;
        });
    }

    makeReservation(key: string) {
        this.date = new Date();
        this.fireService.createReservation({
            userId: this.authService.$loggedInUser.key,
            parkingId: key,
            startTime: this.datePipe.transform(this.date, 'HH:mm:ss'),
            endTime: this.datePipe.transform(this.date.setMinutes(this.date.getMinutes() + 2), 'HH:mm:ss'),
            parked: false,
        });
    }

    getReservations() {
        this.fireService.getReservationsList().subscribe(reservations => {
            this.reservations = reservations.filter(reservation =>
                reservation.userId === this.authService.$loggedInUser.key
            );
        });
    }

    getAllReservations() {
        this.fireService.getReservationsList().subscribe(reservations => {
            this.allReservations = reservations;
        });
    }

    filterReservations(parkingKey) {
        if (this.allReservations !== undefined) {
            const reservations = this.allReservations.filter(reservation => reservation.parkingId === parkingKey);
            return reservations.length;
        }
    }

    checkIfParked() {
        if (this.allReservations !== undefined) {

            const userReservation = this.allReservations.filter(reservation => reservation.userId === this.authService.$loggedInUser.key)
                .find(r => r.parked === true);
            if (userReservation === undefined) {
                return false;
            } else if (userReservation !== undefined) {
                return true;
            }
        }
    }

    checkReservation(parkingKey): boolean {
        if (this.reservations !== undefined) {
            const match = this.reservations.find(reservation => reservation.parkingId === parkingKey);
            if (match !== undefined) {
                return false;
            } else {
                return true;
            }
        }
    }

    deleteReservation(parkingKey) {
        const match = this.reservations.find(reservation => reservation.parkingId === parkingKey);
        if (match !== undefined) {
            this.fireService.deleteReservation(match.key);
        }
    }

    async presentAlertConfirm() {

    }

    async deleteParking(parkingKey) {
        const alert = await this.alertController.create({
            header: 'You are about to delete parking!',
            message: ' <strong>Do you want to delete the parking?</strong>',
            buttons: [
                {
                    text: 'NO',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                    }
                }, {
                    text: 'YES',
                    handler: () => {
                        this.fireService.deleteParking(parkingKey);
                    }
                }
            ]
        });

        await alert.present();

    }

    getUser(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.storage.get('loggedInUser').then((val) => {
                if (val !== 0 && val !== null) {
                    this.fireService.getUsersList().subscribe(users => {
                        this.authService.setLoggedUser(users.find(user => user.key === val));
                        resolve(true);
                    }, error => {
                        reject(false);
                    });
                }
            });
        });
    }
}
