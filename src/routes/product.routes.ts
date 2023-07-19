import auth from '../middleware/auth';
import ProductController from '../controller/ProductController';
import express,{Request,Response} from 'express'
import admin from '../middleware/admin';

const productRouter = express.Router();


productRouter.post("/",[auth,admin],(req:Request,res:Response) =>{
    ProductController.store(req,res);
});

productRouter.get("/",[auth,admin],(req:Request,res:Response) =>{
    ProductController.gets(req,res);
});

productRouter.get("/:id",[auth,admin],(req:Request,res:Response) =>{
    ProductController.get(req,res)
})

productRouter.delete("/:id",[auth,admin],(req:Request,res:Response) =>{
    ProductController.delete(req,res);
});

productRouter.patch("/:id",[admin,auth],(req:Request,res:Response) =>{
    ProductController.update(req,res);
})

export default productRouter