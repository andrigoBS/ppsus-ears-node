import jwt from 'jsonwebtoken'
import {NextFunction, Request, Response} from 'express'
import {isArray} from "class-validator";

export class JwtAuth {
    public static readonly SECRET : string = process.env.JWT_SECRET || 'ppsus..!'

    public verifyJWTMiddleware = (req: Request, res: Response, next: NextFunction) => {
        let token: string | string[] | undefined = req.headers["authorization"]

        if (!token) {
            return res.status(403).send("A token is required for authentication")
        }

        if(isArray(token) && token.length > 0){
            token = token[0]
        }

        try {
            req.body.jwtObject = jwt.verify(String(token), JwtAuth.SECRET)
        } catch (err) {
            return res.status(401).send("Invalid Token")
        }

        return next()
    }
}
