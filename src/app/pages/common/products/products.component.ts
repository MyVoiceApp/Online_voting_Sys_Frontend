import { Component, OnInit } from '@angular/core';
import { TopicsService } from 'src/app/services/topics.service';
import { environment } from 'src/environments/environment';
import { ProductService } from '../../../services/product.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products = [];
  baseUrl = environment.baseurl;
  loader = false;
  localToken = localStorage.getItem('token');

  constructor(
    private prodSrv: ProductService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.loader = true;
    this.prodSrv.getAll_withsurvey().subscribe((resp: any) => {
      this.products = resp.data;
      this.loader = false;
    })
  }

  surveyByproduct(id: any) {
    if (this.localToken == null) {
      Swal.fire({
        title: 'Login User is required for survey',
        text: "You are not Logged In",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Login'
      }).then((result) => {
        if (result.isConfirmed) {
          document.getElementById('closeModal')?.click()
          this._router.navigate(['/login'])
        }
      })

    } else {
      this._router.navigate(['/survey-form/' + id])
    }
  }

}
