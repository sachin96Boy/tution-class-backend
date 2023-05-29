import { Request, Response, NextFunction } from "express";
import firebaseAcc from "../firebase/importFirebase";

export default async function authMiddleware(
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
    const {firebaseAdmin} = await firebaseAcc();
    firebaseAdmin
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
