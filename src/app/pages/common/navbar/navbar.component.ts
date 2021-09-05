import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user: any;
  baseUrl = environment.baseurl;
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || 'null');

    console.log(this.user)
  }

  logout() {
    localStorage.clear();
    this.user = JSON.parse(localStorage.getItem('user') || 'null');
    console.log(this.user)

  }

}
