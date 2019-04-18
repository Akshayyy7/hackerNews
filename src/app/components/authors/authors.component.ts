import { Component, OnInit } from '@angular/core';
import { newsService } from '../../services/news.service';
import { Author } from '../../models/author';
import { auth } from 'firebase';


@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {
  authors: Author[];

  constructor(private newsService: newsService) { }

  ngOnInit() {
    this.newsService.getAuthors().subscribe(authors => {
      // console.log(authors);
      this.authors = authors;
    })

  }
}