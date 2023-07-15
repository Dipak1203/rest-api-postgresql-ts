import { Request, Response, NextFunction } from "express";
import Joi, { Schema } from "joi";
import { getRepository, Repository } from "typeorm";
import bcrypt from "bcrypt";
import Admin from "../../entities/Admin";
import RefreshToken from "../../entities/refresh_token";
import CustomErrorHandler from "../../services/CustomErrorHandler";
import JwtService from "../../services/JwtService";
import { REFRESH_SECRET } from "../../config/Connection";
import appDataSource from "../../config/Conn";

interface IData {
  id?: string;
  name: string;
  email: string;
  password: string;
  role?: string;
}

const registerController = {
  async register(req: Request, res: Response, next: NextFunction) {
    const registerSchema: Schema<IData> = Joi.object<IData>({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().min(5).max(30).required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
    });

    const { error } = registerSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    const { name, email, password, role }: IData = req.body;
    const adminRepo: Repository<Admin> = appDataSource.getRepository(Admin);
    const refreshRepo: Repository<RefreshToken> =
      appDataSource.getRepository(RefreshToken);

    try {
      // Check if the admin already exists
      const existingAdmin = await adminRepo.findOne({ where:{
        email:email
      } });
      if (existingAdmin) {
       
        const message = CustomErrorHandler.alreadyExist("user already exists");
        res.json({message});
        return next();
      }

      // Hash Password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new admin
      const admin: Admin = adminRepo.create({
        name,
        email,
        password: hashedPassword,
        role,
      });

      await adminRepo.save(admin);

      const access_token = JwtService.sign(
        { _id: admin.id, role: admin.role },
        '1h' // Example: Expires in 1 hour
      );
      const refresh_token = JwtService.sign(
        { _id: admin.id, role: admin.role },
        '1y' // Example: Expires in 1 year
      );

      // Save refresh token to the database
      const refreshToken: RefreshToken = refreshRepo.create({
        token: refresh_token,
      });
      await refreshRepo.save(refreshToken);

      res.json({ access_token, refresh_token });
    } catch (err) {
      console.log(err);
      return next("err" + err);
    }
  },
};

export default registerController;
