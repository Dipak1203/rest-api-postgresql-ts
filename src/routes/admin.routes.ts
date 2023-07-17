import express, { NextFunction, Request, Response } from 'express';
import refreshController from '../controller/auth/registerController';
import admin from '../middleware/admin';
import auth from '../middleware/auth';
import loginController from '../controller/auth/loginController'

const adminRoute = express.Router();


adminRoute.post("/register",(req:Request,res:Response,next:NextFunction) =>{
    refreshController.register(req,res,next)
});



adminRoute.post("/login",(req:Request,res:Response,next:NextFunction) =>{
    loginController.login(req,res,next)
});
adminRoute.post("/logout",(req:Request,res:Response,next:NextFunction) =>{
    loginController.logout(req,res,next)
});


export default adminRoute;