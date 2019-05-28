import { Injectable } from "@angular/core";

@Injectable()
export class SessionService
{

    private logged:boolean;

    private data:any;

    private authToken:any;

    constructor(
    )
    {
        this.load();
    }

    load()
    {
        let session_data = JSON.parse(localStorage.getItem('session'));
        if(session_data != null) {
            this.logged = session_data.logged;
            this.data = session_data.data;
            this.authToken = session_data.authToken;
        }

    }

    login(data)
    {
        this.logged = true;
        this.data = data.user;
        this.authToken = data.authToken;
        this.save();
    }

    logout()
    {
        this.logged = false;
        this.data = null;
        this.authToken = null;
        this.save();
    }

    save()
    {
        let session_data:object = {
            'logged': this.logged,
            'data': this.data,
            'authToken': this.authToken
        };
        localStorage.setItem('session', JSON.stringify(session_data));
    }


    isLogged()
    {
        return this.logged == true;
    }

    getData()
    {
        return this.data;
    }

    getAuthToken()
    {
        return this.authToken;
    }
}