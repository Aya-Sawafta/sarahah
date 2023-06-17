import userModel from '../../../../DB/model/User.model.js';
import messageModel from '../../../../DB/model/Message.model.js';
import { asyncHandler } from '../../../Services/errorHandling.js';
export const getMessage = async(req,res)=>{
   
   
    const messageList = await messageModel.find({receiverId:req.id});
    return res.json({message:"success",messageList})
}

export const sendMessage = asyncHandler(async(req,res)=>{

   const {receiverId} = req.params;
   const {message} = req.body;
   const user = await userModel.findById(receiverId);
   if(!user){
    return res.status(404).json({message:"invalid account id"});
   }
   const createMessage = await messageModel.create({message,receiverId});
   return res.json({message:"createMessage successfully",createMessage});
})

export const deleteMessage= async(req,res)=>{
    const id = req.id;
    const {messageId} = req.params;
    const message = await messageModel.deleteOne({_id:messageId , receiverId:id});
    if(message.deletedCount==0){
        return res.status(400).json({message:"invalid message is or user id"});
    }
    return res.json({message:"message deleted successfully"});
}