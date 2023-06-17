import * as dotenv from 'dotenv';
dotenv.config();
import express from "express";
import connectDB from './DB/connection.js';
import initApp from "./src/Modules/app.router.js";
const app = express();
const port = 3000;
initApp(app,express);

connectDB().then(()=>{
   app.listen(process.env.PORT || port, () => {
    console.log(`server listening on port ${port}`);
});
}
)

