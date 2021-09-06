import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {

  user: any;
  singleUser_db: any;
  baseUrl = environment.baseurl;
  formObj = {
    name: '',
    lang: '',
    bio: '',
    birthdate: '',
    profession: '',
    image: '',
    id: '',
  }
  constructor(
    private userSrv: UserService,
    private router: Router,
    private toast: ToastrService,
  ) {
    this.user = JSON.parse(localStorage.getItem('user') || 'null')
  }

  ngOnInit(): void {
    this.userSrv.userById(this.user._id).subscribe((resp: any) => {
      console.log(resp);
      this.singleUser_db = resp.data;
      this.formObj.name = this.singleUser_db.name;
      this.formObj.birthdate = this.singleUser_db.birthdate;
      this.formObj.id = this.user._id;
      this.formObj.lang = this.singleUser_db.lang;
      this.formObj.bio = this.singleUser_db.bio;
      this.formObj.image = this.singleUser_db.image;
    })
  }

  update() {
    if (
      this.formObj.name == '' ||
      this.formObj.lang == '' ||
      this.formObj.birthdate == '' ||
      this.formObj.bio == ''
    ) {
      this.toast.error('Please fill required fields', '', {
        timeOut: 2000,
        positionClass: 'toast-top-right',
        progressBar: true,
        progressAnimation: 'increasing',
      })
    } else {
      this.userSrv.update(this.formObj).subscribe((resp: any) => {
        this.userSrv.userById(this.user._id).subscribe((resp: any) => {
          localStorage.setItem('user', JSON.stringify(resp.data));
        })
        if (resp.message == 'success') {
          this.toast.success('Profile Updated', '', {
            timeOut: 2000,
            positionClass: 'toast-top-right',
            progressBar: true,
            progressAnimation: 'increasing',
          })
          this.router.navigate(['/profile']);
        } else {
          console.log('something went wrong');
        }
      })
    }
  }

}
