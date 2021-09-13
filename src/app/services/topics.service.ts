import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TopicsService {

  baseUrl = environment.baseurl + '/topic';
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(this.baseUrl + '/getAll');
  }

  getAll_withvote() {
    return this.http.get(this.baseUrl + '/getAll_withvote');
  }

  getSix_withvote() {
    return this.http.get(this.baseUrl + '/getSix_withvote');
  }

  getById(id: any) {
    return this.http.get(this.baseUrl + '/getById/' + id);
  }

  search(text: any) {
    return this.http.get(this.baseUrl + '/search/' + text);
  }

  Bycategory(text: any) {
    return this.http.get(this.baseUrl + '/bycategory/' + text);
  }

}
