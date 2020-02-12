import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FirebaseService} from '../../services/firebase.service';
import {Storage} from '@ionic/storage';
import {Reservation} from '../../models/reservation';
import {DatePipe} from '@angular/common';
import {TimerService} from '../../services/timer.service';
import {AlertController} from '@ionic/angular';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})


export class ProfilePage implements OnInit {
    reservations: Reservation[];
    date: string;

    constructor(private authService: AuthService,
                private fireService: FirebaseService,
                private storage: Storage,
                private datePipe: DatePipe,
                private timer: TimerService,
                private alertController: AlertController
    ) {
    }

    ngOnInit() {

        if (this.timer.timerStarted) {
        } else {
            this.timer.timer();
        }
        this.getUser().then(() => {
            // this.getParkings();
            this.getReservations();

        });
        // Make method for subtract
    }

    getReservations() {
        this.fireService.getReservationsList().subscribe(reservations => {
            this.reservations = reservations.filter(reservation =>
                reservation.userId === this.authService.$loggedInUser.key
            );
        });
    }

    sliceTime(endTime: string, parkingKey, parking) {
        this.date = this.timer.getTime();
        const subtraction = Number(endTime.slice(3, 5)) - Number(this.date.slice(3, 5));
        if (parking === true) {
            return 'Already Parked';
        } else {
            if (subtraction === 0) {
                this.fireService.deleteReservation(parkingKey);

            } else if (subtraction < 0) {
                this.fireService.deleteReservation(parkingKey);
            } else if (subtraction > 0) {
                return subtraction;
            }
        }
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

    confirmParking(reservationKey) {
        this.fireService.updateReservation(reservationKey, {parked: true});
    }

    async deleteParking(reservationKey) {
        const alert = await this.alertController.create({
            header: 'You are about to delete parking reservation!',
            message: ' <strong>Do you want to delete the reservation?</strong>',
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
                        this.fireService.deleteReservation(reservationKey);
                    }
                }
            ]
        });

        await alert.present();


    }


}
