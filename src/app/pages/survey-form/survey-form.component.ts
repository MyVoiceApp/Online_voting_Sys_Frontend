import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ContactUsService } from 'src/app/services/contact-us.service';

@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.scss']
})
export class SurveyFormComponent implements OnInit {

  formObj = {
    email: '',
    subject: '',
    website: '',
    description: ''
  }
  constructor(
    private contactSrv: ContactUsService,
    private toastSrv: ToastrService,
  ) { }

  ngOnInit(): void {
  }

  create() {
    if (
      this.formObj.email == '' ||
      this.formObj.subject == '' ||
      this.formObj.description == ''
    ) {
      this.toastSrv.error('Please fill all fields', '', {
        timeOut: 2000,
        positionClass: 'toast-top-right',
        progressBar: true,
        progressAnimation: 'increasing'
      });
    } else {
      this.contactSrv.create(this.formObj).subscribe((resp: any) => {
        console.log(resp);
        if (resp.message == 'success') {
          this.toastSrv.success('Form Submitted successfully', '', {
            timeOut: 2000,
            positionClass: 'toast-top-right',
            progressBar: true,
            progressAnimation: 'increasing'
          });
          this.formObj.email = '';
          this.formObj.subject = '';
          this.formObj.description = '';
        } else {
          console.log('something went wrong')
        }
      })
    }
  }

}
