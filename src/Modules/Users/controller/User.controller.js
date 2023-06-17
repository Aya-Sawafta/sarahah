import userModel from "../../../../DB/model/User.model.js";
import cloudinary from "../../../Services/cloudinary.js";

export const profile = (req,res) =>{
    
    return res.json({message:req.id});
}

export const profilePic = async(req,res) =>{
   
    if(!req.file){
      return res.json({message:"file is required"});
    }
     
    const {secure_url} = await cloudinary.uploader.upload(req.file.path , {folder:`Sarahah/user/${req.id}`});
    //const imgURL = req.file.destination + '/' + req.file.filename;
    const user = await userModel.updateOne({_id:req.id},{profilePic:secure_url});
    return res.status(200).json({message:"profile picture updated successfully"});
    
}