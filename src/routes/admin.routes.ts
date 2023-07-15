import express, { NextFunction, Request, Response } from 'express';
import refreshController from '../controller/auth/registerController';

const adminRoute = express.Router();


adminRoute.post("/register",(req:Request,res:Response,next:NextFunction) =>{
    refreshController.register(req,res,next)
})

export default adminRoute;