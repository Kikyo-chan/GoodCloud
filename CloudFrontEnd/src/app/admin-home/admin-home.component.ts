import { Component, OnInit } from '@angular/core';
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})

export class AdminHomeComponent implements OnInit {

  users: any[];

  constructor(public userService : UserService) {

  }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe(response => {
        console.log(response.json());
        this.users = response.json();
      })
  }

  /**
   * delete a user
   * @param user
   *
   */

  deleteUser(user){
    console.log(user.id);
    this.userService.deleteUser(user.id).subscribe(response => {
      console.log(response);
      window.location.reload();

    })
  }


}
