import {Component, Input, OnInit} from '@angular/core';
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {


  constructor(public cookie: CookieService) {

  }

  ngOnInit() {

  }
}
