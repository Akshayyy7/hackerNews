import { Component, OnInit } from '@angular/core';
import { newsService } from '../../services/news.service';

import { Subscriber } from '../../models/subscriber';


@Component({
  selector: 'app-view-subscribers',
  templateUrl: './view-subscribers.component.html',
  styleUrls: ['./view-subscribers.component.css']
})
export class ViewSubscribersComponent implements OnInit {
  subscribers: Subscriber[];
  constructor(private newsService: newsService) { }

  ngOnInit() {
    this.newsService.getSubscribes().subscribe(subscribers => {
      console.log(subscribers);
      this.subscribers = subscribers;
  });

}
}
