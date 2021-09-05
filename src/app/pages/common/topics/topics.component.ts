import { Component, OnInit } from '@angular/core';
import { TopicsService } from 'src/app/services/topics.service';
import { environment } from 'src/environments/environment';
import { ProductService } from '../../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnInit {


  topics = [];
  products = [];
  baseUrl = environment.baseurl;
  loader = false;
  single_Topic: any;
  localToken = localStorage.getItem('token');

  constructor(
    private topicSrv: TopicsService,
    private prodSrv: ProductService,
    private toastSrv: ToastrService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.loader = true;
    this.topicSrv.getAll().subscribe((resp: any) => {
      this.topics = resp.data;

      this.prodSrv.getAll().subscribe((resp: any) => {
        this.products = resp.data;
      })

      this.loader = false;
    })
  }

  singleTopic(item: any) {
    this.single_Topic = item;
    document.getElementById('openModel')?.click()
  }


  goforVote(id: any) {
    if (this.localToken == null) {
      // this.toastSrv.error('Please first Login', '', {
      //   timeOut: 2000,
      //   positionClass: 'toast-top-right',
      //   progressBar: true,
      //   progressAnimation: 'increasing'
      // });

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
      this._router.navigate(['/survey/survey-form'])
      document.getElementById('closeModal')?.click()
    }
  }

}
