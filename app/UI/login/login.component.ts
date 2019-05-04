import {Component, Injectable, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';

import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({

    selector: 'app-login',
    templateUrl: 'login.component.html'

})

@Injectable()
export class LoginComponent implements OnInit {

    loginError:boolean = false;
    loading:boolean = false;

    data:any = {
        email: null,
        password: null
    };

    constructor(
        private auth: AuthService,
        private router: Router
    )
    {
    }

    ngOnInit(): void {
        if(this.auth.isLogged()) {
            this.router.navigate(['list/user']);
        }
    }

    async postLogin(form:NgForm) {
        this.loginError = false;
        this.loading = true;
        if(await this.auth.login(this.data.email, this.data.password)) {
            window.location.href = 'list/user';
        } else {
            //TODO: display error message
            this.loginError = true;
            this.loading = false;
        }
    }
}