import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Item } from '../models/item';
import { Subscriber } from '../models/subscriber';
import { Author } from '../models/author';


import { map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, merge } from 'rxjs';
import { snapshotChanges } from 'angularfire2/database';
import { identifierModuleUrl } from '@angular/compiler';







@Injectable({
  providedIn: 'root'
})
export class newsService {
  private newsCollection: AngularFirestoreCollection<Item>;
  private subscriberCollection: AngularFirestoreCollection<Subscriber>;
  private authorCollection: AngularFirestoreCollection<Author>;

  private document: AngularFirestoreDocument<Item>;
  news: Observable<Item[]>;
  authors: Observable<Author[]>;
  subscribers: Observable<Subscriber[]>;
  itema: Observable<any>;
  itemDoc: AngularFirestoreDocument<Item>;

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) {

    this.newsCollection = this.afs.collection('test');
    this.subscriberCollection = this.afs.collection('subscribers');
    this.authorCollection = this.afs.collection('author');

    // this.newsCollection = this.afs.collection('news',ref => ref.orderBy('title','asc'));

  }
///////////////////////////////////////changed here

  getnews() {
    this.news = this.afs.collection('test', ref => ref.orderBy('datetime', 'desc')).snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Item;
          data.id = a.payload.doc.id;
          return data;
        })
      })
    )
    return this.news;
  }
  getSubscribes() {
    this.subscribers = this.afs.collection('subscribers').snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Subscriber;
          // data.id = a.payload.doc.id;
          return data;
        })
      })
    )
    return this.subscribers;
  }
  getAuthors() {
    this.authors = this.afs.collection('author').snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Author;
          //data.id = a.payload.doc.id;
          return data;
        })
      })
    )
    return this.authors;
  }
///////////////////////////////////////changed here
  getItemDesc(id) {
    // this.newsCollection = this.afs.collection('news', ref => {
    //   console.log(idd);
    //   return ref.where('id','==','itmczE2Fe811No1sM8Aie');
    // });
    // this.itema = this.newsCollection.valueChanges();
    // return this.itema;
    this.itemDoc = this.afs.doc('news/' + id);
    this.itema = this.itemDoc.valueChanges()
    return this.itema;
  }

  addImage(item: Item) {
    // const file = event.target.files[0];
    // const filePath = file[0];
    // const task = this.storage.upload(filePath, file);
    for (const selectedfile of [(<HTMLInputElement>document.getElementById('image')).files[0]]) {
      const path = `${selectedfile.name}`;
      this.storage.upload(path, selectedfile)
      // .then((_snapshot) => {
      //   item.image = selectedfile.name;
      //   // item.title = item.title;
      //   // item.description = item.description;
      //   console.log('uploadind data')
      //   return this.newsCollection.add(item);

      // })

      const data: Item = {
        title: item.title,
        category: item.category,
        region: item.region,
        stream: item.stream,
        description: item.description,
        language: item.language,
        image: path,
        author: item.author,
        datetime: item.datetime
      }
      this.newsCollection.add(data)

    }

    // this.newsCollection.add(item);
  }
  addItem(item: Item) {
    this.newsCollection.add(item);
  }

  addSubscriber(subscriber: Subscriber) {
    this.subscriberCollection.add(subscriber);
  }

  deleteItem(item: Item) {
    this.itemDoc = this.afs.doc(`test/${item.id}`);
    console.log(`test/${item.id}`);
    // console.log(this.itemDoc);
    this.itemDoc.delete().then(function () {
      console.log("Successfully deleted");

    });
    // this.itemDoc = this.afs.doc("news/${item.id}");
    // this.itemDoc.set({

    // })


  }
  updateItem(item: Item) {
    this.itemDoc = this.afs.doc(`news/${item.id}`);
    // console.log(this.itemDoc);
    this.itemDoc.update(item);
  }
}

