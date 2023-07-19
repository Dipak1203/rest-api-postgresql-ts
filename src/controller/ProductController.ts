import Product from '../entities/Product.entity'
import appDataSource from '../config/Conn'
import { Request, Response } from 'express'
import ProductService from '../services/product.service'
import { ProductDTO } from '../dtos/product.dto'
const productRepo = appDataSource.getRepository(Product)


interface Iproduct {
  name: string
  description: string
  price: string
  image_url: string
  category: string
  brand: string
}
const ProductController = {

  async store(req: Request, res: Response) {
    try {
      const data = req.body as ProductDTO
      const product = await ProductService.create(data);
      res.status(200).json({
        status:'success',
        payload: product,
        message:"Product create success"
      });

    } catch (error) {
      res.json({ error })
    }
  },

  async gets(req: Request, res: Response) {
    const product = await ProductService.gets();
    res.status(200).json({
      status:'success',
      payload: product,
      message:"Product fetch success"
    })
  },

  async delete(req:Request,res:Response){
    try {
      const id:string  = req.params.id;
      const product = await ProductService.delete(id);
      res.status(200).json({
        status:'success',
        payload: product,
        message:"Product create success"
      });
    } catch (error) {
      res.status(500).json({
        status:'unsuccess',
        message:"Product can not delete",
        payload:error
      })
    }
  },

  async get(req:Request,res:Response){
    try {
      const id:string = req.params.id;
      const product = await ProductService.get(id);
      res.status(200).json({
        status:'success',
        payload: product,
        message:"Product create success"
      });
    } catch (error) {
      
    }
  }
}

export default ProductController
