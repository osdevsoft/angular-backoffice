import {  NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import { APP_ROUTING } from "./app.routes";

import {RepositoryService} from "./Infrastructure/Repository/repository.service";
import { AuthService } from "./services/auth/auth.service";
import { SessionService } from "./services/session.service";
import { ListService } from "./services/list.service";
import { ElementService } from "./services/element.service";

import {KanicasePipe} from "./pipes/kanicase.pipe";
import {LogPipe} from "./pipes/log.pipe";
import {KeysPipe} from "./pipes/keys.pipe";

import {AppComponent} from './app.component';
import {LoginComponent} from "./UI/login/login.component";
import {HeaderComponent} from "./components/shared/header/header.component";
import {NavbarComponent} from "./components/shared/navbar/navbar.component";
import {LoadingComponent} from "./components/shared/loading/loading.component";
import {SearchComponent} from "./UI/search/search.component";
import {ListComponent} from "./UI/list/list.component";
import {CreateComponent} from "./UI/create/create.component";
import {DetailComponent} from "./UI/detail/detail.component";
import {FormContainerComponent} from "./UI/form/formContainer.component";
import {FormElementComponent} from "./UI/form/formElement.component";
import {PaginationComponent} from "./components/shared/pagination/pagination.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    LoadingComponent,
    LoginComponent,
    PaginationComponent,
    SearchComponent,
    ListComponent,
    CreateComponent,
    DetailComponent,
    FormContainerComponent,
    FormElementComponent,
    LogPipe,
    KanicasePipe,
    KeysPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    APP_ROUTING
  ],
  providers: [
      RepositoryService,
      AuthService,
      SessionService,
      ListService,
      ElementService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
