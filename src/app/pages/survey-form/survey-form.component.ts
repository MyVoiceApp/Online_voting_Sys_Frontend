import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContactUsService } from 'src/app/services/contact-us.service';
import { TopicsService } from '../../services/topics.service';
import { ProductService } from '../../services/product.service';
import { StarRatingComponent } from 'ng-starrating';
import { UserService } from '../../services/user.service';
import { Location } from '@angular/common';
import { environment } from '../../../environments/environment.prod';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.scss']
})
export class SurveyFormComponent implements OnInit {

  checkedcolor = "gold";
  uncheckedcolor = "gray";
  size = "24px";
  value = 0;
  readonly = false;
  totalstars = 5;
  warning = false;
  product_data: any;
  baseUrl = environment.baseurl;

  formObj = {
    fullname: '',
    workName: '',
    workingplace: '',
    rating: 0,
    productId: '',
    comment: '',
    user: ''
  }
  user: any;

  constructor(
    private userSrv: UserService,
    private topicSrv: TopicsService,
    private productSrv: ProductService,
    private toastSrv: ToastrService,
    private _route: ActivatedRoute,
    private _router: Router,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || 'null')
    let route = this._route.snapshot.params['id'];
    this.formObj.productId = route;
    this.formObj.user = this.user._id;

    if (this.user == null) {
      this.backToBack();
    } else {
      this.productSrv.getById(route).subscribe((presp: any) => {
        this.product_data = presp.data;
      })
    }

  }

  create() {
    if (
      this.formObj.comment == '' ||
      this.formObj.fullname == '' ||
      this.formObj.workingplace == '' ||
      this.formObj.workName == '' ||
      this.formObj.rating == 0
    ) {
      this.toastSrv.error('Please fill required fields', '', {
        timeOut: 2000,
        positionClass: 'toast-top-right',
        progressBar: true,
        progressAnimation: 'increasing'
      });
    } else {
      this.userSrv.surveyByproduct(this.formObj).subscribe((resp: any) => {
        if (resp.message == 'success') {
          this.toastSrv.success('Survey Submitted successfully', '', {
            timeOut: 2000,
            positionClass: 'toast-top-right',
            progressBar: true,
            progressAnimation: 'increasing'
          });
          Swal.fire(
            'Thnaks',
            'Your Vote is sumitted successfully',
            'success'
          )
          this.backToBack()
        } else if (resp.message == 'already three time survey submitted') {
          this.warning = true;
          this.toastSrv.error('You already submit three time survey against this Product.', '', {
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

  onRate($event: { oldValue: number, newValue: number, starRating: StarRatingComponent }) {
    this.formObj.rating = $event.newValue;
  }

  backToBack() {
    this.location.back();
  }

}
