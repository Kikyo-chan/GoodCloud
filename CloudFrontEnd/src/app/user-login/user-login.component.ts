import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../service/user.service";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {



  form = new FormGroup({
    name: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });


  user: {
    name: string,
    password: string,
    id: string
  };


  constructor(public userService : UserService , public cookieService : CookieService, private router: Router) { }

  ngOnInit() {

  }

  get username (){
    return this.form.get('name');
  }
  get password (){
    return this.form.get('password');
  }


  login(){

    // console.log(this.username.value);

    this.userService.userLogin({

      name: this.username.value,
      password: this.password.value

    }).subscribe(

      response => {

              this.user = response.json();
              // console.log(this.user);
              this.cookieService.set("username", this.user.name);
              this.cookieService.set("user_id", this.user.id);

              this.router.navigate(["/"]);
              // alert("登录成功！");

      },

      (error: Response) => {
              alert("请输入正确的用户名和密码！");
              console.log(error.json());
              this.router.navigate(["/user_login"]);
      }

    )}

}
