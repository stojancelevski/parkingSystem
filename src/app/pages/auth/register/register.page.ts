import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {FirebaseService} from '../../../services/firebase.service';
import {Router} from '@angular/router';
import {MenuController} from '@ionic/angular';
import {ToastService} from '../../../services/toast.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
    registerForm: FormGroup;

    constructor(private fb: FormBuilder,
                private authService: AuthService,
                private fireService: FirebaseService,
                private route: Router,
                private toastService: ToastService,
                private menuCtrl: MenuController) {
    }

    ngOnInit() {
        this.menuCtrl.enable(false, 'menu');

        this.registerForm = this.fb.group({
            name: ['', [Validators.required]],
            surname: ['', [Validators.required]],
            admin: [false],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
        });
    }

    get registerFormControls() {
        return this.registerForm.value;
    }

    register() {
        this.authService.SignUp(this.registerFormControls.email, this.registerFormControls.password).then(() => {
            this.fireService.createUser(this.registerFormControls);
            this.toastService.presentToast('Thanks for Registering, Sign In Now');
            this.route.navigate(['login']);
        }).catch(val => {
            this.toastService.presentToast(val);
        });
    }

}
