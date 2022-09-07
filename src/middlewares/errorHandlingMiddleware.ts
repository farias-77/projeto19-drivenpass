import { Request, Response, NextFunction } from "express";

export default function errorHandlingMiddleware(error: any, req: Request, res: Response, next: NextFunction){
    
    if(error.code === "conflict") return res.status(409).send(error.message);
    
    return res.sendStatus(500);
}