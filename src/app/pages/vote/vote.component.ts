import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { TopicsService } from 'src/app/services/topics.service';
import { environment } from 'src/environments/environment';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {

  products = [];
  categories = [];
  baseUrl = environment.baseurl;
  loader = false;
  p = 1;

  constructor(
    private topicSrv: TopicsService,
    private prodSrv: ProductService,
    private cateSrv: CategoryService,
    private router: Router
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

  voteByproduct(id: any) {
    this.router.navigate(['/survey-form/' + id])
  }

}
