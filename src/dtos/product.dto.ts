import { IsString, IsDateString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator'
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

  @IsNotEmpty()
  @IsString()
  image_url: string

  @IsOptional()
  createAt: Date

  @IsOptional()
  updateAt: Date
}
export class UpdateProductDTO extends ProductDTO {
  @IsUUID()
  @IsNotEmpty()
  @IsString()
  id: string
}
