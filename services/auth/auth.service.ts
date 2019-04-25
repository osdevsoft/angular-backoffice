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
        user = await this.getUserByEmail(user);
        if(user == null) {
            return false;
        }
        //todo: check password
        this.session.login(user);
        return true;


    }

    logout()
    {
        this.session.logout();
    }

    canActivate()
    {
        if(!this.isLogged()) {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }

    async getUserByEmail(email)
    {
        // TODO: make sync
        let user= await this.repository.fetch('user?search_fields[email]=' + email).toPromise()
            .then(
            (data:any) => {
                    if(data.total_items == 0) {
                        this.data = null;
                    } else {
                        this.data = data.items[0];
                        //todo: mock
                        this.session.login(this.data);
                    }
                }
            );

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