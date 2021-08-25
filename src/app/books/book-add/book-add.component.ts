import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ApiService } from "../index";
import {
  FormControl,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
  FormGroupDirective
} from "@angular/forms";
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErroStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched) || isSubmitted)
  }
}

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.scss']
})
export class BookAddComponent implements OnInit {
  bookForm?: FormGroup;
  isbn = '';
  book = '';
  author = '';
  description = '';
  publisher = '';
  publishedYear = '';
  isLoadingResults = false;
  matcher = new MyErroStateMatcher();

  constructor(
    private router: Router,
    private api: ApiService,
    private formBuilder: FormBuilder
  ) { }


  ngOnInit(): void {
    this.bookForm = this.formBuilder.group({
      isbn: [null, Validators.required],
      title: [null, Validators.required],
      author: [null, Validators.required],
      description: [null, Validators.required],
      publisher: [null, Validators.required],
      publishedYear: [null, Validators.required],
    })
  }

  onFormSubmit(): void {
    this.isLoadingResults = true;
    if (this.bookForm) {
      this.api.addBook(this.bookForm.value)
        .subscribe(res => {
          const id = res._id;
          this.isLoadingResults = false;
          this.router.navigate(['/book-details', id]);
        }, err => {
          console.log(err);
          this.isLoadingResults = false;
        });
    }
  }

}
