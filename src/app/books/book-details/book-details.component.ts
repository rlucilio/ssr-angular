import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { Book,ApiService } from "../index";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  book: Book =  {
    _id: '',
    author: '',
    description: '',
    isbn: '',
    publishYear: '',
    publisher: '',
    title: '',
    updatedAt: null
  }
  isLoadingResult = true;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getBookDetails(this.route.snapshot.paramMap.get('id') || '')
  }

  getBookDetails(id: string) {
    this.api.getBook(id)
      .subscribe(res => {
        this.book = res;
        console.log(this.book);
        this.isLoadingResult = false;
      })
  }

  deleteBook(id: string) {
    this.api.deleteBook(id)
      .subscribe(() => {
        this.isLoadingResult = false;
        this.router.navigate(['/books']);
      }, (err) => {
        console.log(err);
        this.isLoadingResult = false;
      })
  }
}
