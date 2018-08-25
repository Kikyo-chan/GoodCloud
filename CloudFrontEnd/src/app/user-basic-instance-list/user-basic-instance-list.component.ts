import { Component, OnInit } from '@angular/core';
import {UserService} from "../service/user.service";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-basic-instance-list',
  templateUrl: './user-basic-instance-list.component.html',
  styleUrls: ['./user-basic-instance-list.component.css']
})
export class UserBasicInstanceListComponent implements OnInit {



  servers: any[];

  constructor(public userService : UserService,  public cookieService : CookieService, private router: Router) { }

  ngOnInit() {

    if (this.cookieService.get("user_id") === ""){
      this.router.navigate(["/user_login"]);
      window.location.reload();
    }else {
      this.userService.getUserServers(this.cookieService.get("user_id"))
        .subscribe(response => {
          console.log(response.json());
          this.servers = response.json();
                //delet all cookie
                // this.cookieService.deleteAll();
        })
    }
  }



}
