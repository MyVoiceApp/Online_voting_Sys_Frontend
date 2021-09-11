import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import Swal from 'sweetalert2'
import { environment } from '../../../environments/environment.prod';
import { TopicsService } from '../../services/topics.service';

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

  formObj = {
    text: ''
  }

  constructor(
    private route: ActivatedRoute,
    private prodSrv: ProductService,
    private topicSrv: TopicsService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.type = this.route.snapshot.params['type'];
    if (this.type == 'search') {
      this.formObj.text = this.route.snapshot.params['id'];
      if (this.formObj.text != '') {
        var search = this.formObj.text.trim();
        this.topicSrv.search(search).subscribe((resp: any) => {
          this.topics = resp.data
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
      this._router.navigate(['/survey-form/new'])
      document.getElementById('closeModal')?.click()
    }
  }

}
