import { Component, OnInit } from '@angular/core';
import { TopicsService } from 'src/app/services/topics.service';
import { environment } from 'src/environments/environment';
import { ProductService } from '../../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products = [];
  baseUrl = environment.baseurl;
  loader = false;

  constructor(
    private topicSrv: TopicsService,
    private prodSrv: ProductService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loader = true;
    this.prodSrv.getAll_withsurvey().subscribe((resp: any) => {
      this.products = resp.data;
      this.loader = false;
    })
  }

  voteByproduct(id: any) {
    this.router.navigate(['/survey-form/' + id])
  }

}
