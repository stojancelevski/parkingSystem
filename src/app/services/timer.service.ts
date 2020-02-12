import {Injectable} from '@angular/core';
import {FirebaseService} from './firebase.service';
import {DatePipe} from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class TimerService {
    interval;
    seconds = 0o0;
    minutes = 0o0;
    hour = 0o0;
    date: string;
    timerStarted = false;

    constructor(private fireService: FirebaseService, private datePipe: DatePipe,
    ) {
    }

    getTime() {
        return this.datePipe.transform(new Date(), 'HH:mm:ss');
    }

    timer() {
        this.timerStarted = true;
        this.date = this.getTime();
        this.seconds = Number(this.date.slice(6, 8));
        this.minutes = Number(this.date.slice(3, 5));
        this.hour = Number(this.date.slice(0, 2));
        this.interval = setInterval(() => {
            this.seconds++;
            if (this.seconds === 60) {
                this.minutes++;
                this.seconds = 0;
            }
            if (this.minutes === 60) {
                this.hour++;
                this.minutes = 0;
            }
        }, 1000);


    }

}
