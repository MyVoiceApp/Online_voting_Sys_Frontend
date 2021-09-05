import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SliderService } from 'src/app/services/slider.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {



  formObj = {
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

  login() {
    if (
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
      this.userSrv.login(this.formObj).subscribe((resp: any) => {
        if (resp.message == 'Un Authorized') {
          this.toastSrv.error('Your credentials is not correct', '', {
            timeOut: 2000,
            positionClass: 'toast-top-right',
            progressBar: true,
            progressAnimation: 'increasing'
          });
        } else if (resp.message == 'success') {
          this.toastSrv.success('Login successfully', '', {
            timeOut: 2000,
            positionClass: 'toast-top-right',
            progressBar: true,
            progressAnimation: 'increasing'
          });
          localStorage.setItem('token', resp.token);
          localStorage.setItem('user', JSON.stringify(resp.data));
          this.router.navigate(['/home'])
        }
      })
    }

  }

}
