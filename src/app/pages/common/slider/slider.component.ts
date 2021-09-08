import { Component, OnInit } from '@angular/core';
import { TopicsService } from 'src/app/services/topics.service';
import { environment } from 'src/environments/environment';
import { SliderService } from '../../../services/slider.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  sliders = [];
  baseUrl = environment.baseurl;

  constructor(
    private sliderSrv: SliderService
  ) { }

  ngOnInit(): void {
    this.sliderSrv.getAll().subscribe((resp: any) => {
      this.sliders = resp.data;
    })
  }
}
