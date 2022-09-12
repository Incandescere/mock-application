import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CreateProductDto } from 'src/dtos/products.dto';
import { Product } from 'src/entities/product.model';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsContoller {
  constructor(private readonly productsService: ProductsService) {}

  @Post('create')
  async createProduct(@Body() body: CreateProductDto): Promise<Product> {
    console.log('POST products/create');
    return await this.productsService.createProduct(
      body.title,
      body.description,
      body.price,
    );
  }

  @Get('getAll')
  async getAllProducts(): Promise<Product[]> {
    console.log('GET products/getAll');
    return await this.productsService.getAllProducts();
  }

  @Get(':id')
  async getProductWithId(@Param() params): Promise<Product> {
    console.log('GET products/id/'+params.id);
    return await this.productsService.getProductWithId(params.id);
  }

  @Delete('delete/:id')
  async deleteProductWithId(@Param() params): Promise<Product> {
    console.log('DELETE products/delete/'+params.id);
    return await this.productsService.deleteProductWithId(params.id);
  }

  @Put('update/:id')
  async updateProductWithId(@Param() params, @Body() body: CreateProductDto) {
    console.log('PUT products/update/'+params.id);
    return await this.productsService.updateProductWithId(
      params.id,
      body.title,
      body.description,
      body.price,
    );
  }
}
