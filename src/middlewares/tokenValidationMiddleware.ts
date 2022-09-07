import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export default function tokenMiddleware(req: Request, res: Response, next: NextFunction) {
    const authorization: string = req.headers.authorization || "";
    const token: string = authorization?.replace("Bearer ", "").trim();
    const secretKey: string = process.env.JWT_SECRET || "";
    
    if(!authorization){
        throw {code: "unauthorized", message: "Token inválido."};
    }
    
    const retornoJWT = jwt.verify(token, secretKey);
    res.locals.retornoJwtVerify = retornoJWT;
    
    next();
  }