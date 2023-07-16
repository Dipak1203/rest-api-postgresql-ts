import { DEBUG_MODE } from "../config/Connection";
import pkg  from "joi";
import CustomErrorHandler from "../services/CustomErrorHandler.js";
import { Request,Response,NextFunction } from "express";

const {ValidationError} = pkg

const errorHandler = (err:any, req:Request, res:Response, next:NextFunction) => {
  let statusCode = 500;
  let data = {
    message: "Internal server error",
    ...(DEBUG_MODE === "true" && { originalError: err.message }),
  };



  if (err instanceof ValidationError) {
    statusCode = 422;
    data = {
      message: err.message,
    };
  }

  if (err instanceof CustomErrorHandler) {
    statusCode = err.status;
    data = {
      message: err.message,
    };
  }

  return res.status(statusCode).json(data);
};

export default errorHandler;
