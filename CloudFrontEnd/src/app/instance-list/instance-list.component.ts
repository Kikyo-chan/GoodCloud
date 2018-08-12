import { Component, OnInit } from '@angular/core';
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-instance-list',
  templateUrl: './instance-list.component.html',
  styleUrls: ['./instance-list.component.css']
})
export class InstanceListComponent implements OnInit {

  constructor(public userService : UserService) { }

  ngOnInit() {



  }



}
