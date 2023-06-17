
import userModel from "../../../../DB/model/User.model.js";
import { generateToken, verifyToken } from "../../../Services/generateAndVerifyToken.js";
import { compare, hash } from "../../../Services/hashAndCompare.js";
import { sendEmail } from "../../../Services/sendEmail.js";
import { loginSchema, signupSchema } from "../Auth.validation.js";

export const signup = async (req, res) => {
          

        const { username, email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (user) {
            return res.status(409).json({ message: "email already exists" })
        }

        const hashPassword = hash(password);
        const token = generateToken({email}, process.env.EMAIL_SIGNATURE);
        const link = `http://localhost:3000/auth/confirmEmail/${token}`;
       await sendEmail(email ,'confirm email', `<a href="${link}">Plz verify your email</a>`);

        const createUser = await userModel.create({ username, email, password: hashPassword });
        return res.status(201).json({ message: "Done", user: createUser._id });


}

export const confirmEmail = async (req, res) => {

    const {token} = req.params;

     const decoded= verifyToken(token , process.env.EMAIL_SIGNATURE);
    const user = await userModel.updateOne({email:decoded.email},{confirmEmail:true});
    return res.redirect('http://www.facebook.com');
}

export const login = async (req, res) => {
   
        const {email , password} = req.body;
        
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
           }
           else{
            if(!user.confirmEmail){
                return res.json({ message:"plz confirm your email"});
            }
           }
        const match = compare(password, user.password);

        if (!match) {
            return res.json({ message: "Password mismatch" });
        }
        else {

            const token = generateToken({ id: user._id });
            return res.status(404).json({ message: "Done!", token });
        }



}