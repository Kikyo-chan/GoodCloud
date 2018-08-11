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


@NgModule({
  declarations: [
    AppComponent,
    AdminHomeComponent,
    HomeComponent,
    NavComponent,
    FooterComponent,
    AdminNavComponent,
    InstanceListComponent

  ],

  imports: [
    BrowserModule,
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
      }

    ])
  ],
  providers: [CookieService, CommonService],

  bootstrap: [AppComponent]
})

export class AppModule { }
