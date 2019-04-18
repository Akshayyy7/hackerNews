import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Item } from '../../models/item';
import { newsService } from '../../services/news.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';


@Component({
  selector: 'app-item-desc',
  templateUrl: './item-desc.component.html',
  styleUrls: ['./item-desc.component.css']
})
export class ItemDescComponent implements OnInit {
  id: any;
  news: Item[];
  profileUrl: Observable<string | null>

  
  constructor(
    private  newsService: newsService,
    private router: Router,
    private route: ActivatedRoute,
    private storage: AngularFireStorage


  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
     console.log(this.id);

     this.newsService.getItemDesc(this.id).subscribe(news => {
      console.log(news);
      this.news = news;
      // console.log("item-desc-component")
      const ref = this.storage.ref(news.image);
      this.profileUrl = ref.getDownloadURL();
      
    })

    // this.newsService.getItemDesc(this.id).subscribe(listing => {
    //    this.listing = listing}) 
    // this.newsService.getItemDesc(this.id);



     
    
    
  }

}
