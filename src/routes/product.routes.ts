import ProductController from '../controller/ProductController';
import express,{Request,Response} from 'express'

const productRouter = express.Router();


productRouter.post("/",(req:Request,res:Response) =>{
    ProductController.store(req,res);
});

export default productRouter