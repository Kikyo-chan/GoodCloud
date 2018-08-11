import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {CommonService} from "./common.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url;

  constructor(private http: Http ,public commonService: CommonService){
    this.url = commonService.baseURL + 'users';
  }


  public getUsers(){
    return this.http.get(this.url);
  }

  public deleteUser(id){
    return this.http.delete(this.url + '/' + id);
  }

}
