import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { TopicsService } from 'src/app/services/topics.service';
import { environment } from 'src/environments/environment';
import { CategoryService } from '../../../services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories = [];
  baseUrl = environment.baseurl;
  loader = false;

  constructor(
    private categorySrv: CategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loader = true;
    this.categorySrv.getAll().subscribe((resp: any) => {
      this.categories = resp.data.splice(0, 4);
      this.loader = false;
    })
  }

  search(id: any) {
    this.router.navigate(['/search-result/' + id + '/category'])
  }


}
