import { NextFunction, Request, Response } from "express";
import CustomErrorHandler from "../services/CustomErrorHandler";
import JwtService from "../services/JwtService";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  let authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(CustomErrorHandler.unAuthorized());
  }

  const token = authHeader.split(" ")[1];

  try {
    const { id, role } = await JwtService.verify(token);
    const user = {
      id,
      role,
    };
    (req as any).user = user; // Type cast 'req' to 'any' and assign the 'user' property
    next();
  } catch (error) {
    return next(CustomErrorHandler.unAuthorized());
  }
};

export default auth;
