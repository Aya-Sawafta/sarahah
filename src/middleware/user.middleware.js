import userModel from "../../DB/model/User.model.js";
import { verifyToken } from "../Services/generateAndVerifyToken.js";

export const userMiddleware = async (req, res, next) => {

    const { authorization } = req.headers;
    if (!authorization?.startsWith(process.env.BEARER_KEY)) {
        return res.json({ message: "invalid bearer token" });

    }
    const token = authorization.split(process.env.BEARER_KEY)[1];
    if (!token) {
        return res.json({ message: "invalid token" });
    }
    
    const decoded = verifyToken(token);
    const authUser = await userModel.findById(decoded.id).select("username email");
    if(!authUser){
        return res.status(401).json({ message: "This account is not registered" });
    }
   // return res.json(authUser);
    req.id = decoded.id;
    next();

}