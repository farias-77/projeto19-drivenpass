import { Request, Response, NextFunction } from "express";

export default function errorHandlingMiddleware(error: any, req: Request, res: Response, next: NextFunction){
    return res.sendStatus(500);
}