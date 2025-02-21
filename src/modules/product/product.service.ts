import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entity/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create_product.dto';
import { CloudinaryService } from '../cloudinary/ cloudinary.service';
import { AuthEntity } from '../auth/auth.entity';
import { ProductAttributeValue } from './entity/product_attribute_value.entity';
import { ProductAttribute } from './entity/product_attribute.entity';

@Injectable()
export class ProductService {
  constructor(
    private cloudinaryService: CloudinaryService,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(AuthEntity)
    private readonly authRepository: Repository<AuthEntity>,
    @InjectRepository(ProductAttribute)
    private readonly productAttributeRepository: Repository<ProductAttribute>,
    @InjectRepository(ProductAttributeValue)
    private readonly productAttributeValueRepository: Repository<ProductAttributeValue>,
  ) {}

  async createProduct(file: Express.Multer.File, body: CreateProductDto) {
    return body;
  }

  getAllProduct() {
    const products = this.productRepository.find({
      // relations:,
    });

    const productAttributes = this.productAttributeRepository.find();

    return productAttributes;
  }
}
