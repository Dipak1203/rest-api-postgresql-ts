import ProductController from '../controller/UserController';
import express, { Request, Response } from 'express';



const userRouter = express.Router();

userRouter.get("/", (req: Request, res: Response): Promise<any> => {
    return ProductController.show(req, res);
});

userRouter.post("/create", (req: Request, res: Response): Promise<any> => {
    return ProductController.store(req, res);
});

userRouter.put("/:id", (req: Request, res: Response): Promise<any> => {
    return ProductController.update(req, res);
});

userRouter.delete("/:id", (req: Request, res: Response): Promise<any> => {
    return ProductController.delete(req, res);
});


export default userRouter;
