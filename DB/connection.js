import mongoose from "mongoose";
 const connectDB = async(req,res)=>{
 const db = await mongoose.connect(process.env.DB_LOCAL).then(()=>{
    console.log("Connect to database");
 }).catch((err)=>{
    console.log(`Error connecting to database ${err}`);
 })
 }
  export default connectDB;