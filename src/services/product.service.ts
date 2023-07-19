import Product from '../entities/Product.entity'
import appDataSource from '../config/Conn'
import { ProductDTO } from '../dtos/product.dto'
import CustomErrorHandler from './CustomErrorHandler'


class ProductService {
  constructor(private readonly productRepo = appDataSource.getRepository(Product)) {}
 
  async create(data: ProductDTO,image?: Express.Multer.File) {
    const product = new Product()
    product.name = data.name
    product.description = data.description
    product.price = data.price
    product.brand = data.brand
    product.category = data.category
    product.image_url = data.image_url
    if (image) {
        product.image_url = image.path; // Store the image path in the database
      }
  
      return await this.productRepo.save(product)
  }

  async gets() {
    return await this.productRepo.find({
      order: {
        createAt: 'DESC',
      },
    })
  }

  async delete(id: string) {
    return await this.productRepo.delete({
      id: id,
    })
  }

  async get(id: string) {
    return await this.productRepo.findOne({
      where: {
        id: id,
      },
    })
  }

  async update(id: string, data: ProductDTO) {
    try {
      const product = await this.productRepo.findOne({
        where: {
          id: id,
        },
      })

      if (!product) {
        throw CustomErrorHandler.notFound('Product data not found')
      }

      product.name = data.name
      product.description = data.description
      product.price = data.price
      product.brand = data.brand
      product.category = data.category
      product.image_url = data.image_url

      await this.productRepo.save(product)

      return product
    } catch (error: any) {
      throw CustomErrorHandler.serverError('Error updating product: ' + error.message)
    }
  }
}

export default new ProductService()
