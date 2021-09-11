import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  formObj = {
    text: ''
  }

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    // search - result
  }

  search() {
    if (this.formObj.text != '') {
      var search = this.formObj.text.trim();
      this.router.navigate(['/search-result/' + search + '/search'])
    }
  }

}
