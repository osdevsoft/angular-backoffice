import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { SessionService } from "../session.service";
import {RepositoryService} from "../../Infrastructure/Repository/repository.service";

@Injectable()
export class AuthService
{
    data:any;

    constructor(
        private session: SessionService,
        private router: Router,
        private repository: RepositoryService
    )
    {
    }

    async login(user, password)
    {
        user = await this.checkUser(user, password);
        if(user == null) {
            return false;
        }
        //todo: check password
        this.session.login(user);
        return true;


    }

    logout(message = null)
    {
        this.session.logout();

        let location = '/#';
        if(message != null) {
            location += '?alert_message=' + message;
        }
        window.location.href = location;
    }

    canActivate()
    {
        if(!this.isLogged()) {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }

    async checkUser(user, password)
    {
        // TODO: make sync
        let data = {
            'username': user,
            'password': password
        };
        let result:any = await this.repository.post('auth/login', data, false)
        if(typeof result.authToken == "undefined") {
            this.data = null;
        } else {
            this.data = result;
            this.session.login(this.data);
        }

        return this.data;

    }

    getSession()
    {
        return this.session;
    }

    isLogged()
    {
        return this.session.isLogged();
    }
}