import Product from '../entities/Product'
import appDataSource from '../config/Conn'
import { Request, Response } from 'express'
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
      const { name, description, price, image_url, brand, category }: Iproduct = req.body

      const product = productRepo.create({
        name,
        description,
        price,
        image_url,
        brand,
        category,
      })
      const document = await productRepo.save(product)
      if (document) {
        res.json({ document })
      }
    } catch (error) {
      res.json({ error })
    }
  },

  async gets(req: Request, res: Response) {
    try {
      let products = await productRepo.find()
      res.json({ products })
    } catch (error) {
      res.json({ error })
    }
  },

  async delete(req:Request,res:Response){
    try {
      const id  = req.params.id;
      const dlt = await productRepo.delete(id);
      if(dlt){
        res.json({message:"product delete success"});
      }
    } catch (error) {
      
    }
  }
}

export default ProductController
