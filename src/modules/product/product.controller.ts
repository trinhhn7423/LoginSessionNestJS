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
import { CreateVarianDto } from './dto/create_varian.dto';
import { CreateAttributeDto } from './dto/create_attribute.dto';
import { UpdateVarianDto } from './dto/update_varian.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('products')
// @UseGuards(AuthGuard) /////////////////////////////
// @SetMetadata('roles', ['MANAGER'])

export class ProductController {
  constructor(private productService: ProductService) { }

  // tạo mới sản phẩm 
  @Post()
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


  // tạo phiên bản sản phẩm
  @Post('varian')
  @UseInterceptors(FileInterceptor('file'))
  createProductVarian(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: /^image\/(png|jpg|jpeg)$/ }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() body: CreateVarianDto
  ) {
    return this.productService.createProductVarian(body, file);
  }


  // sửa phiên bản sản phẩm 
  @Put('varian/:id')
  @UseInterceptors(FileInterceptor('file'))
  updateProductVarian(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: /^image\/(png|jpg|jpeg)$/ }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Param('id', new ParseIntPipe()) idVarian: number,
    @Body() body: UpdateVarianDto
  ) {
    return this.productService.updateProductVarian(idVarian, body, file);
  }

  // lấy danh sách phiên bản 
  @Get('varian/:id')
  getAllVarian(@Param('id',ParseIntPipe) idProduct: number) {
    return this.productService.getAllVarian(idProduct);
  }


  // lấy danh sách sản phẩmphẩm
  @Get()
  async getAllProduct(
    @Query('search') search: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.productService.getAllProduct(search, page, limit);
  }

  // cập nhật sản phẩmphẩm
  @Put(':id')
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
  deleteProduct(@Param('id', new ParseIntPipe()) id: number) {
    return this.productService.deleteProduct(id);
  }

  // tạo thuộc tính màu sắc , kích cỡ , chất liệu 
  @Post('attribute')
  createAttribute(@Body() body: CreateAttributeDto) {
    return this.productService.createAttribute(body);
  }
}
