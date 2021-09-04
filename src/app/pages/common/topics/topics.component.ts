import { Component, OnInit } from '@angular/core';
import { TopicsService } from 'src/app/services/topics.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnInit {


  topics = [];
  baseUrl = environment.baseurl;

  constructor(
    private topicSrv: TopicsService
  ) { }

  ngOnInit(): void {
    this.topicSrv.getAll().subscribe((resp: any) => {
      this.topics = resp.data;
    })
  }

}
