import { Router } from "express";
import validation from "../../middleware/validation.js";
import { asyncHandler } from "../../Services/errorHandling.js";
import * as AuthController from "./controller/Auth.controller.js"
import * as validators from './Auth.validation.js';
const router =Router();
router.post('/signup',validation(validators.signupSchema),asyncHandler(AuthController.signup));
router.post('/login',validation(validators.loginSchema),asyncHandler(AuthController.login));
router.get('/confirmEmail/:token',AuthController.confirmEmail);
export default router; // export default i can rename it but normal export i cant rename it when importing
