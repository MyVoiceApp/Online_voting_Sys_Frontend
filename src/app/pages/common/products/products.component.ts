import { Component, OnInit } from '@angular/core';
import { TopicsService } from 'src/app/services/topics.service';
import { environment } from 'src/environments/environment';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products = [];
  baseUrl = environment.baseurl;

  constructor(
    private topicSrv: TopicsService,
    private prodSrv: ProductService,
  ) { }

  ngOnInit(): void {
    this.prodSrv.getAll().subscribe((resp: any) => {
      this.products = resp.data;
    })
  }


}
