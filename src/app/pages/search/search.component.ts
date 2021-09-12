import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import Swal from 'sweetalert2'
import { environment } from '../../../environments/environment.prod';
import { TopicsService } from '../../services/topics.service';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  type: any;
  topics: any;
  products: any;
  single_Topic: any;
  localToken = localStorage.getItem('token');
  baseUrl = environment.baseurl;
  searchText = '';

  formObj = {
    text: ''
  }

  constructor(
    private route: ActivatedRoute,
    private prodSrv: ProductService,
    private topicSrv: TopicsService,
    private userSrv: UserService,
    private toastSrv: ToastrService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.type = this.route.snapshot.params['type'];
    if (this.type == 'search') {
      this.formObj.text = this.route.snapshot.params['id'];
      if (this.formObj.text != '') {
        this.searchText = this.formObj.text.trim();
        this.topicSrv.search(this.searchText).subscribe((resp: any) => {
          this.topics = resp.data
          console.log(this.topics)
        })
      }
    } else if (this.type == 'category') {
      let cat = this.route.snapshot.params['id'];
      this.topicSrv.Bycategory(cat).subscribe((resp: any) => {
        this.topics = resp.data
      })
    }
    this.prodSrv.getAll().subscribe((resp: any) => {
      this.products = resp.data;
    })
  }

  search() {
    if (this.formObj.text != '') {
      var search = this.formObj.text.trim();
      this.topicSrv.search(search).subscribe((resp: any) => {
        this.topics = resp.data
      })
    }
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
        this.search()
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
