import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import {MenuController} from '@ionic/angular';
import {FirebaseService} from '../../../services/firebase.service';
import {ToastService} from '../../../services/toast.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    loginForm: FormGroup;

    constructor(private fb: FormBuilder,
                private authService: AuthService,
                private router: Router,
                private storage: Storage,
                private menuCtrl: MenuController,
                private fireService: FirebaseService,
                private toastService: ToastService
    ) {
    }

    ngOnInit() {
        this.menuCtrl.enable(false, 'menu');
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    get loginFormControls() {
        return this.loginForm.value;
    }

    login() {
        this.authService.SignIn(this.loginFormControls.email, this.loginFormControls.password).then(() => {
                this.getUser().then(() => {
                    this.storage.set('loggedInUser', this.authService.getloggedUser().key);
                    this.menuCtrl.enable(true, 'menu');
                    this.router.navigate(['/home'], {replaceUrl: true});
                    this.toastService.presentToast('Successfully Logged In');
                });
            },
            err => {
                this.toastService.presentToast(err);
            });
    }

    getUser(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.fireService.getUsersList().subscribe(users => {
                this.authService.setLoggedUser(users.find(user => user.email === this.loginFormControls.email));
                resolve(true);
            }, error => {
                reject(true);
            });
        });
    }

}
