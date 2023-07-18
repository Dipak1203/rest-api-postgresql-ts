import Product from "../entities/Product.entity";
import appDataSource from "../config/Conn";
import { ProductDTO } from "../dtos/product.dto";


class ProductService{
    constructor(private readonly productRepo = appDataSource.getRepository(Product)){ }

    async create(data:ProductDTO){
        const product = new Product();
        product.name = data.name;
        product.description = data.description;
        product.price = data.price;
        product.brand = data.brand;
        product.category = data.category;
        product.image_url = data.image_url;
        
        return await this.productRepo.save(product);
    }

    async gets(){
        return await this.productRepo.find({
            order:{
                createAt:"DESC"
            }
        })
    }

}

export default new ProductService