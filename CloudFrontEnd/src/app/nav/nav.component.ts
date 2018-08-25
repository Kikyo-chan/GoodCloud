import {Component, Input, OnInit} from '@angular/core';
import { CookieService } from "ngx-cookie-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {


  name: any;
  id: any;

  constructor(public cookie: CookieService, public cookieService : CookieService, private router: Router) {

    //判断cookie内容确定用户是否登录

    if (cookieService.get("user_id") === "")
    {
      // this.users.id = null;
      // alert("id is null");
    }else {

      this.id = cookieService.get("user_id");
      console.log("user_id" + this.id);

    }

    if (cookieService.get("username") === "")
    {
      // alert("id is null");
    }else {
      // users.name = cookieService.get("username");
      this.name = cookieService.get("username");
      console.log("username" + this.name);
    }

  }


  public login_out(){
    console.log("delete cookie");
    this.cookieService.delete("user_id");
    this.cookieService.delete("username");
    // this.router.navigate(["/"]);
    window.location.reload();
  }

  ngOnInit() {

  }
}
