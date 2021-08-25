import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  BooksComponent,
  BookDetailsComponent,
  BookAddComponent,
  BookEditComponent
} from "./books";

const routes: Routes = [
  {
    path: 'books',
    component: BooksComponent,
    data: {
      title: 'Books'
    }
  },
  {
    path: 'book-details/:id',
    component: BookDetailsComponent,
    data: {
      title: 'Book Details'
    }
  },
  {
    path: 'book-add',
    component: BookAddComponent,
    data: {
      title: 'Add Book'
    }
  },
  {
    path: 'book-edit/:id',
    component: BookEditComponent,
    data: {
      title: 'Edit Book'
    }
  },
  {
    path: '',
    redirectTo: '/books',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
