import Product from '../entities/Product'
import { UpdateResult } from 'typeorm'
import { Profile } from '../entities/Profile'
import appDataSource from '../config/Conn'
import { UserType, ProfileType } from '../constant/User'

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
  async store(req: any, res: any) {
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
}

export default ProductController
