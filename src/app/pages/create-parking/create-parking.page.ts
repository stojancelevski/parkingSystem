import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FirebaseService} from '../../services/firebase.service';
import {NativeGeocoder} from '@ionic-native/native-geocoder/ngx';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {Router} from '@angular/router';
import {ToastService} from '../../services/toast.service';

@Component({
    selector: 'app-create-parking',
    templateUrl: './create-parking.page.html',
    styleUrls: ['./create-parking.page.scss'],
})
export class CreateParkingPage implements OnInit {
    createParkingForm: FormGroup;
    lat: number;
    lng: number;

    constructor(private fb: FormBuilder,
                private geolocation: Geolocation,
                private nativeGeocoder: NativeGeocoder,
                private fireService: FirebaseService,
                private toastService: ToastService,
                private router: Router) {
    }

    ngOnInit() {
        this.getLocation();
        this.createParkingForm = this.fb.group({
            latitude: ['', Validators.required],
            longitude: ['', Validators.required],
            label: ['', Validators.required],
            maxPlaces: ['', Validators.required],
            draggable: [false],
            street: [''],
            number: [''],
            postalCode: ['']
        });
    }

    getLocation() {
        this.geolocation.getCurrentPosition().then(location => {
            this.lat = location.coords.latitude;
            this.lng = location.coords.longitude;
        });
    }

    get formControls() {
        return this.createParkingForm.controls;
    }

    createParking() {
        this.nativeGeocoder.reverseGeocode(this.formControls.latitude.value, this.formControls.longitude.value)
            .then((result: any) => {
                this.createParkingForm.patchValue({
                    street: result[0].thoroughfare,
                    number: result[0].subThoroughfare,
                    postalCode: result[0].postalCode
                });
                this.fireService.createParking(this.createParkingForm.value);
                this.createParkingForm.reset();
                this.router.navigate(['/home'], {replaceUrl: true});
                this.toastService.presentToast('Successfully created!');
            })
            .catch((error: any) => this.toastService.presentToast(error));

    }

}
