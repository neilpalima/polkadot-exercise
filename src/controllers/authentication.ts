import { NextFunction, Request, Response } from 'express';

const { SECRET_PASSWORD } = process.env;

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { password } = req.body;

    if (password !== SECRET_PASSWORD) {
      res.status(401).send({
        message: 'Invalid password.'
      });
      return;
    }

    res.status(200).send({
      message: 'Access granted.'
    });
  } catch (error) {
    next(error);
  }
};
