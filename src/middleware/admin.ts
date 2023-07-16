import { NextFunction, Request, Response } from "express";
import appDataSource from "../config/Conn";
import Admin from "../entities/Admin";
import CustomErrorHandler from '../services/CustomErrorHandler'

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

const admin = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const User = appDataSource.getRepository(Admin);
    const user = await User.findOne({ where: { id: req.user?.id } });

    if (user?.role === 'admin') {
      next();
    } else {
      return next(CustomErrorHandler.unAuthorized);
    }
  } catch (error) {
    return next(CustomErrorHandler.serverError());
  }
}

export default admin;
