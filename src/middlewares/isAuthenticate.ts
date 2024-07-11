import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const { verify } = jwt;

interface TokenPayload {
    userName: string;
    email: string;
    sub: string;
}

export function isAuthenticate(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(401).json({ message: "Token is missing." });
        }

        const [_, token] = authorization.split(" ");

        const { sub } = verify(
            token,
            process.env.SECRET_KEY as string
        ) as TokenPayload;

        req.userId = sub;

        return next();
    } catch (error) {
        res.status(401).json({ message: "User unauthorized." });
    }
}
