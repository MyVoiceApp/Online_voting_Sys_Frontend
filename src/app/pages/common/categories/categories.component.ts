import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { TopicsService } from 'src/app/services/topics.service';
import { environment } from 'src/environments/environment';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories = [];
  baseUrl = environment.baseurl;

  constructor(
    private categorySrv: CategoryService,
  ) { }

  ngOnInit(): void {
    this.categorySrv.getAll().subscribe((resp: any) => {
      this.categories = resp.data;
    })
  }


}
