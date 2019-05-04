import { Component } from '@angular/core';

import { AuthService } from "../../../services/auth/auth.service";

import domain_structure from '../../../../assets/config/domain_structure.json';

@Component({

    selector: 'app-navbar',
    templateUrl: 'navbar.component.html'

})

export class NavbarComponent {

    entities:any;

    user:any = null;

    constructor(
        private auth: AuthService
    ) {
        this.entities = domain_structure.entities;
        this.user = this.auth.getSession().getData();

    }
}
