import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = environment.baseurl + '/product';
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(this.baseUrl + '/getAll');
  }

  getAll_withsurvey() {
    return this.http.get(this.baseUrl + '/getAll_withsurvey');
  }

  getSix_withsurvey() {
    return this.http.get(this.baseUrl + '/getSix_withsurvey');
  }

  getById(id: any) {
    return this.http.get(this.baseUrl + '/getById/' + id);
  }

}
