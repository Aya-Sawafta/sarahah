import { Router } from "express";
import { userMiddleware } from "../../middleware/user.middleware.js";
import { asyncHandler } from "../../Services/errorHandling.js";
import fileUpload, { HME } from "../../Services/multer.js";
import * as UserController from './controller/User.controller.js';
const router = Router();
router.get('/profile',userMiddleware,asyncHandler(UserController.profile));
router.patch('/profilePic',userMiddleware,fileUpload().single('image'),HME,UserController.profilePic);
 export default router;