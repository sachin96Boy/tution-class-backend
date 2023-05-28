import { Request, Response, NextFunction } from "express";
import firebase from '../firebase/firebase';

export default function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).send("Unauthorized");
    }
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
        return res.status(401).send("Unauthorized");
    }
    firebase.firebaseAdmin
        .auth()
        .verifyIdToken(token)
        .then((decodedToken) => {
            req.user = decodedToken;
            next();
        })
        .catch((error) => {
            console.log(error);
            return res.status(401).send("Unauthorized");
        });
}
