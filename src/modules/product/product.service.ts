import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entity/product.entity';
import { IsNull, Like, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create_product.dto';
import { CloudinaryService } from '../cloudinary/ cloudinary.service';
import { AuthEntity } from '../auth/auth.entity';
import { Update_productDto } from './dto/update_product.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ProductVarianEntity } from './entity/product_variant.entity';
import { ColorEntity } from './entity/color.entity';
import { SizeEntity } from './entity/size.entity';
import { MaterialEntity } from './entity/material.entity';
import { CreateVarianDto } from './dto/create_varian.dto';
import { CreateAttributeDto } from './dto/create_attribute.dto';
import { UpdateVarianDto } from './dto/update_varian.dto';
import { UserInfo } from 'os';
import { userSessionType } from '../auth/auth.service';

@Injectable()
export class ProductService {
  constructor(
    private cloudinaryService: CloudinaryService,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(ProductVarianEntity)
    private readonly varianRepo: Repository<ProductVarianEntity>,
    @InjectRepository(ColorEntity)
    private readonly colorRepo: Repository<ColorEntity>,
    @InjectRepository(SizeEntity)
    private readonly sizeRepo: Repository<SizeEntity>,
    @InjectRepository(MaterialEntity)
    private readonly materialRepo: Repository<MaterialEntity>,
    @InjectRepository(AuthEntity)
    private readonly authRepo: Repository<AuthEntity>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) { }
  async getAllProduct(search: string, page: number = 1, limit: number = 10) {
    page = Number(page) || 1;
    limit = Number(limit) || 10;

    const cacheKey = `products:${search || 'all'}:page${page}:limit${limit}`;

    let products: any = await this.cacheManager.stores[0].get(cacheKey);
    if (products) {
      console.log('Lấy từ Memory Cache:', cacheKey);
      return products;
    }

    products = await this.cacheManager.stores[1].get(cacheKey);
    if (products) {
      console.log('Lấy từ Redis Cache:', cacheKey);
      await this.cacheManager.set(cacheKey, products, 30_000);
      return products;
    }

    console.log('Tạo mới dữ liệu từ database...');
    products = await this.productRepository.find({
      where: search ? { name: Like(`%${search}%`), isDelete: false } : { isDelete: false },
      relations: ['variants.color', 'variants.size', 'variants.material'],
      take: limit,
      skip: (page - 1) * limit,
    });

    if (products.length > 0) {
      await this.cacheManager.stores[0].set(cacheKey, products, 30_000);
      await this.cacheManager.stores[1].set(cacheKey, products, 50_000);
    }

    return products;
  }
  async createProduct(
    session: Record<string, userSessionType>,
    file: Express.Multer.File,
    body: CreateProductDto,
  ) {
    const urlImage = await this.cloudinaryService.uploadFile(file);  // upload ảnh
    console.log('session:', session);

    const user = await this.authRepo.findOneBy({
      id: session.userData.id,
    });

    const createProduct = this.productRepository.create({
      name: body.name,
      skuCode: body.skuCode,
      barCode: body.barCode,
      branch: body.branch,
      unit: body.unit,
      description: body.description,
      sellPrice: body.sellPrice,
      comparePrice: body.comparePrice,
      cost: body.cost,
      image: urlImage,
      quantity: body.quantity,
      createBy: user,
    })
    await this.cacheManager.clear();
    return await this.productRepository.save(createProduct);
  }

  async createProductVarian(
    body: CreateVarianDto,
    file: Express.Multer.File
  ) {

    const findProduct = await this.productRepository.findOne({ where: { id: body.idProduct } })
    if (!findProduct) throw new NotFoundException('Product not found ');


    let findColor = await this.colorRepo.findOne({ where: { name: body.color, product: { id: findProduct.id } } })
    let findSize = await this.sizeRepo.findOne({ where: { name: body.size, product: { id: findProduct.id } } })
    let finMaterial = await this.materialRepo.findOne({ where: { name: body.material, product: { id: findProduct.id } } })


    if (findColor && finMaterial && findSize) {
      const checkVarian = await this.varianRepo.findOne({
        where: [
          {
            color: { id: findColor?.id },
            size: { id: findSize?.id },
            material: { id: finMaterial?.id },
            product: { id: findProduct?.id },
          },
        ],
        relations: { color: true, size: true, material: true }
      })
      if (checkVarian) throw new NotFoundException('Varian aready exisis');
    }

    if (!findColor) {
      const createColor = this.colorRepo.create({
        name: body.color,
        product: findProduct,
      });
      findColor = await this.colorRepo.save(createColor);
    }
    if (!findSize) {
      const createSize = this.sizeRepo.create({
        name: body.size,
        product: findProduct,
      });
      findSize = await this.sizeRepo.save(createSize);
    }

    if (!finMaterial) {
      const createMaterial = this.materialRepo.create({
        name: body.material,
        product: findProduct,
      });
      finMaterial = await this.materialRepo.save(createMaterial);
    }

    const urlImage = await this.cloudinaryService.uploadFile(file);


    const createVarian = this.varianRepo.create({
      skuCode: body.skuCode,
      barCode: body.barCode,
      unit: body.unit,
      sellPrice: body.sellPrice,
      comparePrice: body.comparePrice,
      cost: body.cost,
      quantity: body.quantity,
      image: urlImage,
      product: findProduct,
      color: findColor,
      size: findSize,
      material: finMaterial,
      created_at: new Date(),
    });

    await this.cacheManager.clear();
    return await this.varianRepo.save(createVarian);

  }

  async updateProductVarian(idVarian: number, body: UpdateVarianDto, file: Express.Multer.File) {
    const findVarian = await this.varianRepo.findOne({ where: { id: idVarian }, relations: { product: true } });
    if (!findVarian) throw new NotFoundException('Varian not found');

    // console.log('findVarian.product.id',findVarian.product.id);
    // return findVarian
    let findColor = await this.colorRepo.findOne({ where: { name: body.color, product: { id: findVarian.product.id } } });
    let findSize = await this.sizeRepo.findOne({ where: { name: body.size, product: { id: findVarian.product.id } } });
    let findMaterial = await this.materialRepo.findOne({ where: { name: body.material, product: { id: findVarian.product.id } } });


    const checkVarian = await this.varianRepo.findOne({
      where: [
        {
          color: { id: findColor?.id },
          size: { id: findSize?.id },
          material: { id: findMaterial?.id },
          product: { id: findVarian.product.id },
        },
      ],
    });
    if (checkVarian && checkVarian.id !== idVarian) {
      throw new NotFoundException('Variant already exists');
    }


    if (!findColor) {
      findColor = await this.colorRepo.save(this.colorRepo.create({ name: body.color, product: findVarian.product }));
    }
    if (!findSize) {
      findSize = await this.sizeRepo.save(this.sizeRepo.create({ name: body.size, product: findVarian.product }));
    }
    if (!findMaterial && body.material) {
      findMaterial = await this.materialRepo.save(this.materialRepo.create({ name: body.material, product: findVarian.product }));
    }
    if (file) {
      findVarian.image = await this.cloudinaryService.uploadFile(file);
    }

    // Cập nhật thông tin variant
    findVarian.skuCode = body.skuCode;
    findVarian.barCode = body.barCode
    findVarian.unit = body.unit
    findVarian.sellPrice = body.sellPrice
    findVarian.comparePrice = body.comparePrice
    findVarian.cost = body.cost
    findVarian.quantity = body.quantity
    findVarian.color = findColor;
    findVarian.size = findSize;
    findVarian.material = findMaterial;
    findVarian.updated_at = new Date();

    await this.cacheManager.clear();
    return await this.varianRepo.save(findVarian);
  }


  async createAttribute(body: CreateAttributeDto) {

    const findProduct = await this.productRepository.findOne({ where: { id: body.idProduct } })
    if (!findProduct) throw new NotFoundException('Product not found ');
    for (const color of body.arrColors) {
      // console.log(color);
      const createColor = this.colorRepo.create({ name: color, product: findProduct })
      await this.colorRepo.save(createColor);
    }
    for (const size of body.arrSizes) {
      const createSize = this.sizeRepo.create({ name: size, product: findProduct })
      await this.sizeRepo.save(createSize);
    }
    if (body.arrMaterials) {
      for (const material of body.arrMaterials) {
        const createMaterial = this.materialRepo.create({ name: material, product: findProduct })
        await this.materialRepo.save(createMaterial);
      }
    }
    return { message: 'Create attribute success' };
  }

  async searchProductVarian(search: string) {
    const result = await this.varianRepo.find({
      where: [

        { product: { name: Like(`%${search}%`) } },
        { skuCode: Like(`%${search}%`) },
        { color: { name: Like(`%${search}%`) } },
        { size: { name: Like(`%${search}%`) } },
        { material: { name: Like(`%${search}%`) } }
      ],
      relations: { product: true, color: true, size: true, material: true }
    })
    return result;
  }
  async getAllVarian(idProduct: number) {
    const findVarian = await this.varianRepo.find({
      where: { product: { id: idProduct } },
      relations: ['product', 'color', 'size', 'material'],
      select: { product: { id: true } }
    })
    return findVarian;
  }


  async editProduct(
    id: number,
    dataUpdate: Update_productDto,
    file: Express.Multer.File,
  ) {
    const findProduct = await this.productRepository.findOne({ where: { id: id } })
    if (!findProduct) throw new NotFoundException('Product Not found')
    const urlImage = await this.cloudinaryService.uploadFile(file);  // upload ảnh

    findProduct.name = dataUpdate.name,
      findProduct.skuCode = dataUpdate.sku_code,
      findProduct.barCode = dataUpdate.barcode,
      findProduct.unit = dataUpdate.unit,

      findProduct.description = dataUpdate.description,
      findProduct.sellPrice = dataUpdate.sell_price,
      findProduct.comparePrice = dataUpdate.compare_price,
      findProduct.cost = dataUpdate.cost,
      findProduct.quantity = dataUpdate.quantity,
      findProduct.image = urlImage

    await this.productRepository.save(findProduct)
    await this.cacheManager.clear();
    return findProduct
  }

  async deleteProduct(id: number) {
    const findProduct = await this.productRepository.findOne({
      where: { id: id },
    });
    if (!findProduct) throw new NotFoundException('Product not found ');
    findProduct.isDelete = true;
    await this.productRepository.save(findProduct);

    await this.cacheManager.clear();
    // await this.cacheManager.stores[1].delete(`products`)
    return { message: `Deleted ${findProduct.name} success` };
  }
}
