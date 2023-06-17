import { Router } from "express";
import * as MessageController from './controller/Message.controller.js';
import {userMiddleware} from '../../middleware/user.middleware.js'
const router = Router();
router.get('/',userMiddleware,MessageController.getMessage);
router.post('/:receiverId',MessageController.sendMessage);
router.delete('/:messageId',userMiddleware,MessageController.deleteMessage);
 export default router;