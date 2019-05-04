import { RouterModule, Routes } from "@angular/router";
import {LoginComponent} from "./UI/login/login.component";

import {ListComponent} from "./UI/list/list.component";
import {DetailComponent} from "./UI/detail/detail.component";
import {CreateComponent} from "./UI/create/create.component";

import { AuthService } from "./services/auth/auth.service";


const APP_ROUTES: Routes = [
    {
        'path': 'list/:entity',
        component: ListComponent,
        canActivate: [ AuthService ]
    },
    {
        'path': 'create/:entity',
        component: CreateComponent,
        canActivate: [ AuthService ]
    },
    {
        'path': 'detail/:entity/:uuid',
        component: DetailComponent,
        canActivate: [ AuthService ]
    },
    {
        'path': 'login',
        component: LoginComponent
    },
    {
        'path': '**', pathMatch: 'full', redirectTo: 'list/user'
    }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {onSameUrlNavigation: 'reload'});