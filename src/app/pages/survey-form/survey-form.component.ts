import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContactUsService } from 'src/app/services/contact-us.service';
import { TopicsService } from '../../services/topics.service';
import { ProductService } from '../../services/product.service';
import { StarRatingComponent } from 'ng-starrating';
import { UserService } from '../../services/user.service';
import { Location } from '@angular/common';

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
  action = false;

  topic: any;
  topic_data: any;
  product_data: any;

  formObj = {
    rating: 0,
    topicId: '',
    productId: '',
    comment: '',
    ip: '',
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
    this.topic = JSON.parse(localStorage.getItem('topic') || 'null');
    let route = this._route.snapshot.params['id'];

    if (route == 'new') {
      if (this.user == null) {
        // this._router.navigate(['/home'])
        this.backToBack()
      } else {
        this.action = false;
        this.formObj.user = this.user._id;
        this.topicSrv.getById(this.topic.topicId).subscribe((tresp: any) => {
          this.topic_data = tresp.data;
          this.productSrv.getById(this.topic.productId).subscribe((presp: any) => {
            this.product_data = presp.data;
          })
        })
      }
    } else {
      this.action = true;
      this.formObj.productId = route;
      this.productSrv.getById(route).subscribe((presp: any) => {
        this.product_data = presp.data;
      })
    }

  }

  create() {
    this.formObj.productId = this.topic.productId;
    this.formObj.topicId = this.topic.topicId;
    this.formObj.user = this.user._id;
    if (
      this.formObj.comment == '' ||
      this.formObj.rating == 0
    ) {
      this.toastSrv.error('Please fill required fields', '', {
        timeOut: 2000,
        positionClass: 'toast-top-right',
        progressBar: true,
        progressAnimation: 'increasing'
      });
    } else {
      this.userSrv.submitSurvey(this.formObj).subscribe((resp: any) => {
        if (resp.message == 'success') {
          this.toastSrv.success('Survey Submitted successfully', '', {
            timeOut: 2000,
            positionClass: 'toast-top-right',
            progressBar: true,
            progressAnimation: 'increasing'
          });
          // this._router.navigate(['/home'])
          this.backToBack()
        } else if (resp.message == 'already three time survey submitted') {
          this.warning = true;
          this.toastSrv.error('You already submit three time survey against this topic.', '', {
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

  AddedVote() {
    if (
      this.formObj.comment == '' ||
      this.formObj.rating == 0
    ) {
      this.toastSrv.error('Please fill required fields', '', {
        timeOut: 2000,
        positionClass: 'toast-top-right',
        progressBar: true,
        progressAnimation: 'increasing'
      });
    } else {
      this.productSrv.voteByproduct(this.formObj).subscribe((resp: any) => {
        if (resp.message == 'success') {
          this.toastSrv.success('Vote Added', '', {
            timeOut: 2000,
            positionClass: 'toast-top-right',
            progressBar: true,
            progressAnimation: 'increasing'
          });
          // this._router.navigate(['/home'])
          this.backToBack()
        } else if (resp.message == 'already three time vote submitted') {
          this.warning = true;
          this.toastSrv.error('You already submit three time vote against this product.', '', {
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

  backToBack() {
    this.location.back();
  }

}
