import Product from '../entities/Product.entity'
import appDataSource from '../config/Conn'
import { Request, Response } from 'express'
import ProductService from '../services/product.service'
import { ProductDTO, UpdateProductDTO } from '../dtos/product.dto'
import multer, { Multer } from 'multer';
import path from 'path';

interface Iproduct {
  name: string
  description: string
  price: string
  image_url: string
  category: string
  brand: string
}

/*


try {
      upload.single('image')(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
          return res.status(400).json({ error: 'Error uploading image.' });
        } else if (err) {
          return res.status(500).json({ error: 'Something went wrong.' });
        }

        const data = req.body as ProductDTO;
        const product = await ProductService.create(data, req.file);
        res.status(200).json({
          status: 'success',
          payload: product,
          message: 'Product create success',
        });
      });
    } catch (error) {
      res.json({ error });

      
*/


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images'); // This is the folder where images will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });
const ProductController = {

  async store(req: Request, res: Response) {
    try {
      upload.single('image')(req, res, async (err:any) => {
        if (err instanceof multer.MulterError) {
          return res.status(400).json({ error: 'Error uploading image.' });
        } else if (err) {
          return res.status(500).json({ error: 'Something went wrong.' });
        }

        const data = req.body as ProductDTO;
        const image = req.file
        const product = await ProductService.create(data, image);
        res.status(200).json({
          status: 'success',
          payload: product,
          message: 'Product create success',
        });
      });
    } catch (error) {
      res.json({ error });
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
      res.status(500).json({
        status:'unsuccess',
        message:"Product can not fetch",
        payload:error
      })
    }
  },

  async update(req:Request,res:Response){
    try{
        const id: string = req.params.id;
        const data = req.body as UpdateProductDTO
        const product = await ProductService.update(id,data)
        res.status(200).json({
          status:'success',
          payload: product,
          message:"Product update success"
        });
    }catch(error){
      res.status(500).json({
        status:'unsuccess',
        message:"Product can not update",
        payload:error
      })
    }
  }
}

export default ProductController
