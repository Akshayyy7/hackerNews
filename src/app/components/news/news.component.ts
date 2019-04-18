import { Component, OnInit } from '@angular/core';
import { newsService } from '../../services/news.service';
import { Item } from '../../models/item';




@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class newsComponent implements OnInit {
  news: Item[];
  editState: boolean = false;
  itemToEdit: Item;

  constructor(private newsService: newsService) { }

  ngOnInit() {
    // console.log('ngOnInit ran');
    this.newsService.getnews().subscribe(news => {
      //console.log(news);
      this.news = news;
    })
  }
  deleteItem(item: Item){
    this.clearState();
    this.newsService.deleteItem(item);
  }
  editItem(event, item: Item){
    this.editState = true;
    this.itemToEdit = item;
  }
  updateItem(item: Item){
    this.newsService.updateItem(item);
    this.clearState();
  }

  clearState(){
    this.editState = false;
    this.itemToEdit = null;
  }


}
