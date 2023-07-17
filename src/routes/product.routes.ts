import auth from '../middleware/auth';
import ProductController from '../controller/ProductController';
import express,{Request,Response} from 'express'
import admin from '../middleware/admin';

const productRouter = express.Router();


productRouter.post("/",(req:Request,res:Response) =>{
    ProductController.store(req,res);
});

productRouter.get("/",[auth,admin],(req:Request,res:Response) =>{
    ProductController.gets(req,res);
})

export default productRouter