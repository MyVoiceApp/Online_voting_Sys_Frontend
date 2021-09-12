import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';
import { TopicsService } from 'src/app/services/topics.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2'
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {


  products = [];
  categories = [];
  baseUrl = environment.baseurl;
  loader = false;
  localToken = localStorage.getItem('token');

  p = 1;

  constructor(
    private topicSrv: TopicsService,
    private prodSrv: ProductService,
    private cateSrv: CategoryService,
    private _router: Router
  ) { }
  ngOnInit(): void {
    this.loader = true;
    this.prodSrv.getAll_withsurvey().subscribe((resp: any) => {
      this.products = resp.data;
      this.cateSrv.getAll().subscribe((resp: any) => {
        this.categories = resp.data;
        this.loader = false;
      })
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
