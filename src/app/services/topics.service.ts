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

  getById(id: any) {
    return this.http.get(this.baseUrl + '/getById/' + id);
  }



}
