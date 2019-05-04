import { Component } from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html'
})

export class HeaderComponent {

    constructor(
        protected auth:AuthService
    )
    {
    }



    logout()
    {
        this.auth.logout();
    }


}
