import express, { NextFunction, Request, Response } from 'express';
import refreshController from '../controller/auth/registerController';
import admin from '../middleware/admin';
import auth from '../middleware/auth';
import loginController from '../controller/auth/loginController'

const adminRoute = express.Router();


adminRoute.post("/register",[admin,auth],(req:Request,res:Response,next:NextFunction) =>{
    refreshController.register(req,res,next)
});



adminRoute.post("/login",(req:Request,res:Response,next:NextFunction) =>{
    loginController.login(req,res,next)
});


export default adminRoute;