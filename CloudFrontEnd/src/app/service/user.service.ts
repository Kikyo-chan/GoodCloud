import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {CommonService} from "./common.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url;

  constructor(private http: Http ,public commonService: CommonService){
    this.url = commonService.baseURL;
  }


  public getUsers(){
    return this.http.get(this.url  + 'users');
  }

  public deleteUser(id){
    return this.http.delete(this.url + 'users/' + id);
  }

  public userLogin(user){
    return this.http.post(this.url + 'user_login/', user)
  }

  public getUserServers(id){
    return this.http.get(this.url + 'user_servers/' + id);
  }

}
