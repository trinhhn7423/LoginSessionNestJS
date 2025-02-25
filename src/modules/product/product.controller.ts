import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  Session,
  SetMetadata,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/ cloudinary.service';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create_product.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Update_productDto } from './dto/update_product.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('products')
@UseGuards(AuthGuard) /////////////////////////////
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  @SetMetadata('roles', ['MANAGER'])
  @UseInterceptors(FileInterceptor('file'))
  async createProduct(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: /^image\/(png|jpg|jpeg)$/ }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() body: CreateProductDto,
    @Session() session: Record<string, any>,
  ) {
    return this.productService.createProduct(session, file, body);
  }

  // @SetMetadata('roles', ['MANAGER'])
  // @UseGuards(AuthGuard)
  @Get()
  async getAllProduct(
    @Query('search') search: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.productService.getAllProduct(search, page, limit);
  }

  @Put(':id')
  @SetMetadata('roles', ['MANAGER'])
  @UseInterceptors(FileInterceptor('file'))
  async editProduct(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: /^image\/(png|jpg|jpeg)$/ }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Param('id', new ParseIntPipe()) id: number,
    @Body() dataUpdate: Update_productDto,
  ) {
    return this.productService.editProduct(id, dataUpdate, file);
  }

  @Delete(':id')
  @SetMetadata('roles', ['MANAGER'])
  deleteProduct(@Param('id', new ParseIntPipe()) id: number) {
    return this.productService.deleteProduct(id);
  }
}
