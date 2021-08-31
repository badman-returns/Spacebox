import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

class ValidationResponder {
  constructor() {
  }

  static fieldValidationResponder() {
    return (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send(errors.array({ onlyFirstError: true }))
      } else {
        return next();
      }
    };
  }

  static unauthorizedValidationResponder() {
    return (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);      
      if (!errors.isEmpty()) {
        return res.status(401).send(errors.array({ onlyFirstError: true }));
      } else {
        return next();
      }
    };
  }
}

export { ValidationResponder };
