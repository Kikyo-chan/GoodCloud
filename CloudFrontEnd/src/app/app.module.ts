import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { RouterModule } from "@angular/router";
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import {CookieService} from "ngx-cookie-service";
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { InstanceListComponent } from './instance-list/instance-list.component';
import {CommonService} from "./service/common.service";
import {HttpModule} from "@angular/http";
import { UserLoginComponent } from './user-login/user-login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { UserBasicInstanceListComponent } from './user-basic-instance-list/user-basic-instance-list.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminHomeComponent,
    HomeComponent,
    NavComponent,
    FooterComponent,
    AdminNavComponent,
    InstanceListComponent,
    UserLoginComponent,
    UserBasicInstanceListComponent

  ],

  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'dashboard',
        component: AdminHomeComponent,
      },
      {
        path: 'dashboard_instances',
        component: InstanceListComponent,
      },
      {
        path: 'user_login',
        component: UserLoginComponent,
      },
      {
        path: 'user_basic_instance_list',
        component: UserBasicInstanceListComponent,
      },
      {
        path: '**',
        component: HomeComponent
      },

    ])
  ],
  providers: [CookieService, CommonService],

  bootstrap: [AppComponent]
})

export class AppModule { }
