import { Request, Response, NextFunction } from "express";
import { ZodError, ZodSchema } from "zod";

export const validate =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        params: req.params,
        query: req.query,
        body: req.body,
      });

      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          status: "fail",
          error: err.errors,
        });
      }
      next(err);
    }
  };
