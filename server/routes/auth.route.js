import express from "express";
import { changePassword, checkAuth, forgotPassword, getProfile, login, logout, signup } from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post('/signup' , signup);
router.post('/login' , login);
router.post('/logout' , logout);
router.post('/forgot', forgotPassword);

router.get('/check',isAuthenticated,checkAuth);
router.get('/profile',isAuthenticated,getProfile);

router.put('/update-password/:id', isAuthenticated ,  changePassword );

export default router;