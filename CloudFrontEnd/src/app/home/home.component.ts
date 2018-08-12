import { Component, OnInit } from '@angular/core';
import {CommonService} from "../service/common.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {



  constructor(public commonService : CommonService ) {

  }

  ngOnInit() {

  }

}
