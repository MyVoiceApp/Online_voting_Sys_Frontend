import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: any;
  singleUser: any;
  baseUrl = environment.baseurl;
  constructor(
    private userSrv: UserService,
    private router: Router,
    private toast: ToastrService,
  ) {
    this.user = JSON.parse(localStorage.getItem('user') || 'null')
  }


  ngOnInit(): void {
    this.userSrv.userById(this.user._id).subscribe((resp: any) => {
      this.singleUser = resp.data;
    })
  }

  updateProfile(event: any) {

    var data = {
      id: this.user._id,
      image: ''
    }

    if (event.target.files[0].type == 'image/jpeg' || event.target.files[0].type == 'image/png' || event.target.files[0].type == 'image/gif') {
      let file = event.target.files[0];
      this.userSrv.saveimage(file).subscribe((name: any) => {
        data.image = name;
        this.userSrv.updateProfileImage(data).subscribe((resp: any) => {
          this.singleUser = resp.data;
          this.userSrv.userById(this.user._id).subscribe((res: any) => {
            this.singleUser = res.data;
            this.toast.success('Profile Photo updated', '', {
              timeOut: 3000,
              positionClass: 'toast-top-right',
              progressBar: true,
              progressAnimation: 'increasing'
            });
          })
        })

      });
    } else {
      var str = event.target.files[0].type;
      var splitted = str.split("/", 2);
      var BadUrlMsg = splitted[0];
      this.toast.error(BadUrlMsg + ' is not allowed', '', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
        progressBar: true,
        progressAnimation: 'increasing'
      });
    }
  }

  socialShare(media: any, url: any) {
    url = '';
    // window.open(`https://www.facebook.com/sharer/sharer.php?u=https://www.youtube.com/watch?v=IdByOJh71Ik`);
    switch (media) {
      case 'fb':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
        break;
      case 'tw':
        window.open(`https://twitter.com/home?status=${url}`);
        break;
      case 'pn':
        window.open(`https://www.pinterest.com/pin/find/?url=${url}`);
        break;
      case 'in':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`);
        break;
      case 'tr':
        window.open(`https://www.tumblr.com/widgets/share/tool?canonicalUrl=${url}`);
        break;
      case 'dg':
        window.open(`http://digg.com/submit?url=${url}`);
        break;
      case 'rd':
        window.open(`https://reddit.com/submit?url=${url}`);
        break;
      default:
        break;
    }
  }

  // updateProfileImage

  // copyMessage() {
  //   const selBox = document.createElement('textarea')
  //   selBox.style.position = 'fixed'
  //   selBox.style.left = '0'
  //   selBox.style.top = '0'
  //   selBox.style.opacity = '0'
  //   selBox.value = 'http://' + this.shopData.shortLink + '.cartium.io'
  //   document.body.appendChild(selBox)
  //   selBox.focus()
  //   selBox.select()
  //   document.execCommand('copy')
  //   document.body.removeChild(selBox)
  //   this.toast.success('COPIED', '', {
  //     timeOut: 1000,
  //     positionClass: 'toast-bottom-left',
  //     progressBar: true,
  //     progressAnimation: 'increasing',
  //   })
  // }


}
