import {Component, Input, OnInit} from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {TimerService} from '../../services/timer.service';

@Component({
    selector: 'app-timer',
    templateUrl: './timer.component.html',
    styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {
    minutes: number;
    seconds: number;
    @Input() counter: number;

    @Input() reservationKey: string;

    constructor(private fireService: FirebaseService, private timer: TimerService) {
    }

    ngOnInit() {
        this.countDown(this.counter, this.reservationKey);
    }

    countDown(counter, parkingKey) {
        this.minutes = counter;
        this.seconds = 60;
        let intervalId = setInterval(() => {
            this.seconds--;
            if (this.seconds === 0) {
                this.minutes--;
                if (this.minutes === 0 && this.seconds === 0) {
                    clearInterval(intervalId);
                    intervalId = 0;
                    this.fireService.deleteReservation(parkingKey);
                }
                this.seconds = 61;
            }
        }, 1000);
    }
}
