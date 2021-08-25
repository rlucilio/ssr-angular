import { Request, Response, NextFunction, Express, response } from "express";
import book from "../models/book";

export class BookRoute {

  public bookRoute(app: Express): void {

    app.route('/api/book/').get((req: Request, res: Response, next: NextFunction) => {

      book.find((err, books) => {
        if (err) return next(err);

        res.json(books);
      })
    });

    app.route('/api/book/:id').get((req: Request, res: Response, next: NextFunction) => {
      book.findById(req.params.id, (err: any, book: any) => {
        if (err) return next(err);

        res.json(book)
      })
    });

    app.route('/api/book/').post((req: Request, res: Response, next: NextFunction) => {
      console.log(req.body);
      book.create(req.body, (err, book) => {
        if (err) return next(err);

        res.json(book)
      })
    });

    app.route('/api/book/:id').put((req, res, next) => {
      book.findByIdAndUpdate(req.params.id, req.body, (err, book) => {
        if(err) return next(err);

        res.json(book)
      })
    })

    app.route('/api/book/:id').delete((req, res, next) => {
      book.findByIdAndRemove(req.params.id, req.body, (err, book) => {
        if (err) return next(err);

        res.json(book);
      })
    })
  }
}
