import { Component, OnInit } from '@angular/core';
import { TopicsService } from 'src/app/services/topics.service';
import { environment } from 'src/environments/environment';
import { ProductService } from '../../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { UserService } from '../../../services/user.service';

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
    private userSrv: UserService
  ) { }

  ngOnInit(): void {
    this.loader = true;
    this.getAll();
  }

  getAll() {
    this.topicSrv.getSix_withvote().subscribe((resp: any) => {
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
    var voteObj = {
      topicId: this.single_Topic._id,
      productId: id,
    }

    this.userSrv.submitVote(voteObj).subscribe((resp: any) => {
      if (resp.message == 'success') {
        this.toastSrv.success('Vote Submitted successfully', '', {
          timeOut: 2000,
          positionClass: 'toast-top-right',
          progressBar: true,
          progressAnimation: 'increasing'
        });
        this.getAll();
        document.getElementById('closeModal')?.click();
        Swal.fire(
          'Thnaks',
          'Your Vote is sumitted successfully',
          'success'
        )
      } else if (resp.message == 'Already_three_time_submitted') {
        this.toastSrv.error('You Already Submit Three Time Vote By Same Topic.', '', {
          timeOut: 5000,
          positionClass: 'toast-top-right',
          progressBar: true,
          progressAnimation: 'increasing'
        });
      } else {
        console.log('something went wrong')
      }
    })
  }

}
