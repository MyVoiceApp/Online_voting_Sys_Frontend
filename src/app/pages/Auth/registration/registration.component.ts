import { Component, OnInit } from '@angular/core';
import { SliderService } from 'src/app/services/slider.service';
import { environment } from 'src/environments/environment';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  formObj = {
    name: '',
    email: '',
    password: '',
    role: 'User'
  }
  sliders = [];
  baseUrl = environment.baseurl;

  constructor(
    private userSrv: UserService,
    private toastSrv: ToastrService,
    private router: Router,
    private sliderSrv: SliderService
  ) { }

  ngOnInit(): void {
    this.sliderSrv.getAll().subscribe((resp: any) => {
      this.sliders = resp.data;
      console.log(this.sliders)
    })
  }

  create() {
    if (
      this.formObj.name == '' ||
      this.formObj.email == '' ||
      this.formObj.password == ''
    ) {
      this.toastSrv.error('Please fill all fields', '', {
        timeOut: 2000,
        positionClass: 'toast-top-right',
        progressBar: true,
        progressAnimation: 'increasing'
      });
    } else {
      console.log(this.formObj);
      if (this.formObj.password.length <= 7) {
        this.toastSrv.error('Password minimum eight characted long ', '', {
          timeOut: 2000,
          positionClass: 'toast-top-right',
          progressBar: true,
          progressAnimation: 'increasing'
        });
      } else {
        this.userSrv.signup(this.formObj).subscribe((resp: any) => {
          if (resp.message == 'Already Exist') {
            this.toastSrv.error('Email is already exist', '', {
              timeOut: 2000,
              positionClass: 'toast-top-right',
              progressBar: true,
              progressAnimation: 'increasing'
            });
          } else if (resp.message == 'success') {
            this.toastSrv.success('Registerd successfully', '', {
              timeOut: 2000,
              positionClass: 'toast-top-right',
              progressBar: true,
              progressAnimation: 'increasing'
            });
            this.router.navigate(['/login'])
          }
        })
      }
    }
  }

}
