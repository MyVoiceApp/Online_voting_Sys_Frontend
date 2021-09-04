import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SliderService {

  baseUrl = environment.baseurl + '/slider/';

  constructor(private http: HttpClient) { }


  getAll() {
    return this.http.get(this.baseUrl + 'getAll');
  }

}
