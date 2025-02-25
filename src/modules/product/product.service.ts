import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entity/product.entity';
import { Like, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create_product.dto';
import { CloudinaryService } from '../cloudinary/ cloudinary.service';
import { AuthEntity } from '../auth/auth.entity';
import { ProductAttributeValue } from './entity/product_attribute_value.entity';
import { ProductAttribute } from './entity/product_attribute.entity';
import { Product_attributeDto } from './dto/product_attribute.dto';
import { Update_productDto } from './dto/update_product.dto';

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
    @InjectRepository(AuthEntity)
    private readonly authRepo: Repository<AuthEntity>,
  ) {}

  async createProduct(
    session: Record<string, any>,
    file: Express.Multer.File,
    body: CreateProductDto,
  ) {
    const urlImage = await this.cloudinaryService.uploadFile(file);

    const user = await this.authRepo.findOneBy({
      id: session.userData.id,
    });
    const attributes = [];

    const createProduct = this.productRepository.create({
      name: body.name,
      sku_code: body.sku_code,
      barcode: body.barcode,
      unit: body.unit,
      description: body.description,
      branch: body.branch,
      sell_price: body.sell_price,
      compare_price: body.compare_price,
      image: urlImage,
      cost: body.cost,
      quantity: body.quantity,
      createBy: user,
      attributes: attributes,
    });
    // luu sản phẩm
    const savedProduct = await this.productRepository.save(createProduct);
    // console.log('savedproduct', savedProduct);
    for (const attribute of body.attributes) {
      // Tạo thuộc tính cho sản phẩm
      const createAttribute = this.productAttributeRepository.create({
        name: attribute.name,
        product: createProduct,
      });
      await this.productAttributeRepository.save(createAttribute);
      for (const valueAttr of attribute.attribute) {
        // console.log('valueAttr', valueAttr);
        const createAttrValue = this.productAttributeValueRepository.create({
          value: valueAttr.attributeValue,
          attribute: createAttribute,
        });
        await this.productAttributeValueRepository.save(createAttrValue);
      }
      await this.productAttributeRepository.save(createAttribute);
      attributes.push(createAttribute);
    }

    savedProduct.attributes = attributes;
    return this.productRepository.save(savedProduct);
  }

  getAllProduct(search: string, page: number = 1, limit: number = 10) {
    // console.log('search', search);
    page = Number(page) || 1;
    limit = Number(limit) || 10;

    // console.log(page, limit);

    const products = this.productRepository.find({
      where: [
        { name: search ? Like(`%${search}%`) : undefined, isDelete: false },
        { barcode: search ? Like(`%${search}%`) : undefined, isDelete: false },
        { isDelete: false },
      ],
      relations: ['attributes', 'attributes.values'],
      take: page,
      skip: (page - 1) * limit,
      // select: {
      //   id: true,
      //   name: true,
      //   sku_code: true,
      //   barcode: true,
      //   unit: true,
      //   sell_price: true,
      //   compare_price: true,
      //   description: true,
      //   quantity: true,
      //   image: true,
      //   created_at: true,
      //   attributes: {
      //     id: true,
      //     name: true,
      //   },
      // },
    });

    return products;
  }

  async editProduct(
    id: number,
    dataUpdate: Update_productDto,
    file: Express.Multer.File,
  ) {
    const product = await this.productRepository.findOne({
      where: { id: id },
      relations: ['attributes', 'attributes.values'],
    });
    if (!product) throw new NotFoundException('Product not found');

    if (file) {
      product.image = await this.cloudinaryService.uploadFile(file);
    }
    // merge giúp hợp nhất giữ liệu cũ và mới
    // không luuw ngay vào db
    // const mergeProduct = this.productRepository.merge(product, {
    //   name: dataUpdate.name,
    //   sku_code: dataUpdate.sku_code,
    //   barcode: dataUpdate.barcode,
    //   unit: dataUpdate.unit,
    //   description: dataUpdate.description,
    //   sell_price: dataUpdate.sell_price,
    //   compare_price: dataUpdate.compare_price,
    //   quantity: dataUpdate.quantity,
    //   cost: dataUpdate.cost,
    // });

    // return {
    //   product,
    //   mergeProduct,
    // };

    // await this.productAttributeRepository.delete({
    //   product: product,
    // });
    // return product;

    product.name = dataUpdate.name;
    product.sku_code = dataUpdate.sku_code;
    product.barcode = dataUpdate.barcode;
    product.unit = dataUpdate.unit;
    product.description = dataUpdate.description;
    product.sell_price = dataUpdate.sell_price;
    product.compare_price = dataUpdate.compare_price;
    product.quantity = dataUpdate.quantity;
    product.cost = dataUpdate.cost;
    product.updated_at = new Date(Date.now());
    if (dataUpdate.attributes && dataUpdate.attributes.length > 0) {
      // xóa thuộc tính cũ
      const deleteAttribute = await this.productAttributeRepository.delete({
        product: product,
      });
      for (const attribute of dataUpdate.attributes) {
        const createAttr = this.productAttributeRepository.create({
          name: attribute.name,
          product: product,
        });

        await this.productAttributeRepository.save(createAttr);
        for (const valueAttr of attribute.attribute) {
          const createValueAttr = this.productAttributeValueRepository.create({
            value: valueAttr.attributeValue,
            attribute: createAttr,
          });
          console.log('createValueAttr', createValueAttr);
          await this.productAttributeValueRepository.save(createValueAttr);
        }
        product.attributes.push(createAttr);
      }
    }
    const saveProduct = await this.productRepository.save(product);

    return {
      message: 'update success',
      data: saveProduct,
    };
  }

  async deleteProduct(id: number) {
    const findProduct = await this.productRepository.findOne({
      where: { id: id },
    });
    if (!findProduct) throw new NotFoundException('Product not found ');
    findProduct.isDelete = true;
    await this.productRepository.save(findProduct);
    return { message: `Deleted ${findProduct.name} success` };
  }
}
