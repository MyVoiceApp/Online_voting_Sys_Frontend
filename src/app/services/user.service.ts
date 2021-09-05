import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.baseurl + '/user';
  constructor(private http: HttpClient) { }

  login(data: any) {
    return this.http.post(this.baseUrl + '/signinUser', data);
  }

  signup(data: any) {
    return this.http.post(this.baseUrl + '/createUser', data);
  }

  userById(id: any) {
    return this.http.get(this.baseUrl + '/' + id);
  }

}
