import { Module } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeEntity } from '../employee/employee.entity';
import { AuthEntity } from '../auth/auth.entity';
import { ProductEntity } from './entity/product.entity';
import { ProductAttribute } from './entity/product_attribute.entity';
import { ProductAttributeValue } from './entity/product_attribute_value.entity';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  // imports: [TypeOrmModule.forFeature([EmployeeEntity, AuthEntity])],
  imports: [
    CloudinaryModule,
    // MulterModule.register({
    //   storage: {

    //   }
    // }),
    TypeOrmModule.forFeature([
      ProductEntity,
      ProductAttribute,
      ProductAttributeValue,
      AuthEntity,
    ]),
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    CloudinaryModule,
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
