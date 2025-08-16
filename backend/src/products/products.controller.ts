import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ProductsService } from './products.service';

@ApiTags('products')
@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'List all products' })
  async list() {
    const products = await this.productsService.findAll();
    return { success: true, data: products };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by id' })
  async detail(@Param('id', ParseIntPipe) id: number) {
    const product = await this.productsService.findOne(id);
    return { success: true, data: product };
  }
}

