import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';
import { TopicsService } from 'src/app/services/topics.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { CategoryService } from '../../services/category.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {

  topics = [];
  mastertopics = [];
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
    private _route: ActivatedRoute,
    private userSrv: UserService
  ) { }

  ngOnInit(): void {
    this.loader = true;
    this.cateSrv.getAll().subscribe((resp: any) => {
      this.categories = resp.data;
    })
    this.get();
  }

  get() {
    this.topicSrv.getAll_withvote().subscribe((resp: any) => {
      this.topics = resp.data;
      this.mastertopics = resp.data;
      this.prodSrv.getAll().subscribe((resp: any) => {
        this.products = resp.data;
      })
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
        this.get();
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

  selectCategory(item: any) {
    if (item == 'all') {
      this.get();
    } else {
      this.topics = [];
      for (let i = 0; i < this.mastertopics.length; i++) {
        if (this.mastertopics[i]['topic']['category']['_id'] == item['_id']) {
          this.topics.push(this.mastertopics[i])
        }
      }
    }
  }

}
