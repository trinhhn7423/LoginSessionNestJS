import { Module } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeEntity } from '../employee/employee.entity';
import { AuthEntity } from '../auth/auth.entity';
import { ProductEntity } from './entity/product.entity';
import { MulterModule } from '@nestjs/platform-express';
import { ColorEntity } from './entity/color.entity';
import { ProductVarianEntity } from './entity/product_variant.entity';
import { SizeEntity } from './entity/size.entity';
import { MaterialEntity } from './entity/material.entity';

@Module({
  imports: [
    CloudinaryModule,
    TypeOrmModule.forFeature([
      ProductEntity,
      ProductVarianEntity,
      ColorEntity,
      SizeEntity,
      MaterialEntity,
      AuthEntity,
    ]),
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    // {
    //   provide: 'CLOUDINARY',
    //   useFactory: () => {
    //     return cloudinary.config({
    //       cloud_name: 'dit9enk6m',
    //       api_key: '162694156365821',
    //       api_secret: '6HzeukWKTJgYGt8rjnJ8nSyAACA',
    //     });
    //   },
    // },
  ],
})
export class ProductModule {}
