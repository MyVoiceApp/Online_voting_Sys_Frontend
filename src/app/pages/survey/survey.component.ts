import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  topics = [];
  products = [];
  categories = [];
  baseUrl = environment.baseurl;
  loader = false;
  single_Topic: any;
  localToken = localStorage.getItem('token');
  p = 1;

  constructor(
    private topicSrv: TopicsService,
    private prodSrv: ProductService,
    private toastSrv: ToastrService,
    private cateSrv: CategoryService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.loader = true;
    this.topicSrv.getAll_withsurvey().subscribe((resp: any) => {
      this.topics = resp.data;
      this.prodSrv.getAll().subscribe((resp: any) => {
        this.products = resp.data;
        this.cateSrv.getAll().subscribe((resp: any) => {
          this.categories = resp.data;
          this.loader = false;
        })
      })
    })
  }

  singleTopic(item: any) {
    this.single_Topic = item;
    document.getElementById('openModel')?.click()
  }


  goforVote(id: any) {
    if (this.localToken == null) {
      Swal.fire({
        title: 'You are not Logged In',
        text: "You want to register before survey",
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
      var topicObj = {
        topicId: this.single_Topic._id,
        productId: id,
      }
      localStorage.setItem('topic', JSON.stringify(topicObj));
      this._router.navigate(['/survey-form'])
      document.getElementById('closeModal')?.click()
    }
  }

}
