import Joi from "joi";
import { Response,Request,NextFunction } from "express";
import bcrypt from "bcrypt";
import CustomErrorHandler from "../../services/CustomErrorHandler";
import JwtService from "../../services/JwtService"
import { REFRESH_SECRET } from  "../../config/Connection";
import appDataSource from "../../config/Conn";
import Admin from "../../entities/Admin";
import RefreshToken from "../../entities/refresh_token";

interface Data{
  email: string;
  password:string;
}

const adminRepo = appDataSource.getRepository(Admin)
const refreshRepo = appDataSource.getRepository(RefreshToken)




const loginController = {
  async login(req:Request, res:Response, next:NextFunction) {
    const loginSchema = Joi.object({
      email: Joi.string().min(5).max(30).required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
    });

    const { error } = loginSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    const {email, password}:Data = req.body
    try {
      const user = await adminRepo.findOne({
        where:{
          email:email
        }
      });
      if (!user) {
        return next(CustomErrorHandler.notFound());
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return next(CustomErrorHandler.wrongCredentials());
      }

      const access_token = JwtService.sign({ id: user.id, role: user.role});
      const refresh_token = JwtService.sign(
        { id: user.id, role: user.role },
        "1y",
        REFRESH_SECRET
      );
       await refreshRepo.create({ token: refresh_token });
      res.json({ access_token, refresh_token });
    } catch (error) {
      return next(error);
    }
  },

  async logout(req: Request, res: Response, next: NextFunction) {
    const refreshSchema = Joi.object({
      refresh_token: Joi.string().required(),
    });

    const { error } = refreshSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    try {
      const { refresh_token } = req.body;
      
      const decoded = JwtService.verify(refresh_token, REFRESH_SECRET);
      
      await refreshRepo.delete({ token: refresh_token });
      
      res.json({ message: "Logout success" });
    } catch (error) {
      return next(new Error("Something went wrong in the database"));
    }
  },
};
export default loginController;
