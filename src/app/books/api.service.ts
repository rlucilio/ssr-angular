import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Book } from './models/book';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly BASE_URL = 'http://localhost:4200/api/book/';

  constructor(
    private http: HttpClient
  ) { }

  private handleError(error: HttpErrorResponse) {
    console.error(
      `Backend returned code ${error.status},
      body: was ${error.message}
      `
    );

    return throwError(
      'Something bad happened: please try again later.'
    )
  }

  getBooks(): Observable<Book[]>{
    return this.http
      .get<Book[]>(this.BASE_URL)
      .pipe(
        catchError(this.handleError)
      )
  }

  getBook(id: string): Observable<Book> {
    return this.http
      .get<Book>(`${this.BASE_URL}/${id}`)
      .pipe(
        catchError(this.handleError)
      )
  }

  addBook(book: Book): Observable<Book> {
    return this.http
      .post<Book>(this.BASE_URL, book)
      .pipe(
        catchError(this.handleError)
      )
  }

  updateBook(id: string, book: Book): Observable<Book> {
    return this.http
      .put<Book>(`${this.BASE_URL}/${id}`, book)
      .pipe(
        catchError(this.handleError)
      )
  }

  deleteBook(id: string): Observable<Book> {
    return this.http
      .delete<Book>(`${this.BASE_URL}/${id}`)
      .pipe(
        catchError(this.handleError)
      )
  }
}
