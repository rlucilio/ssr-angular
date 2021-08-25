import { Component, OnInit } from '@angular/core';
import { Book, ApiService } from "../index";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  displayedColumns: string[] = ['title', 'author'];
  books: Book[] = [];
  isLoadingResults = true;

  constructor(
    private apiBook: ApiService
  ) { }

  ngOnInit(): void {

    this.apiBook.getBooks()
      .subscribe(res => {
        this.books = res;
        console.log(this.books);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      })
  }

}
