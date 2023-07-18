import { IsString, IsDateString, IsNotEmpty, IsOptional } from 'class-validator'
export class ProductDTO {
  @IsNotEmpty()
  @IsDateString()
  name: string

  @IsNotEmpty()
  @IsString()
  price: string

  @IsNotEmpty()
  @IsString()
  description: string

  @IsNotEmpty()
  @IsString()
  brand: string

  @IsNotEmpty()
  @IsString()
  category: string


  @IsOptional()
  @IsString()
  image_url: string

  @IsOptional()
  createAt: Date

  
  @IsOptional()
  updateAt: Date

  
}
export class UpdateProductDTO {
  @IsOptional()
  date: Date

  @IsOptional()
  description: string
}
