import { Injectable } from "@angular/core";

@Injectable()
export class SessionService
{

    private logged:boolean;

    private data:any;

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
        }

    }

    login(data)
    {
        this.logged = true;
        this.data = data;
        this.save();
    }

    logout()
    {
        this.logged = false;
        this.data = null;
        this.save();
    }

    save()
    {
        let session_data:object = {
            'logged': this.logged,
            'data': this.data
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
}