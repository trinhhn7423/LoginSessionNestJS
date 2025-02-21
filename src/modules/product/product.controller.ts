import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  FileTypeValidator,
  Get,
  ParseFilePipe,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/ cloudinary.service';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create_product.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createProduct(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'image/png' })],
      }),
    )
    file: Express.Multer.File,
    @Body() body: CreateProductDto,
    // @Req() req: Request,
  ) {
    return this.productService.createProduct(file, body);
  }

  @Get()
  async getAllProduct() {
    return this.productService.getAllProduct();
  }
}
