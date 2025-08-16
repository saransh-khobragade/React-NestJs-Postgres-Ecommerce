import { Controller, Get, Post, Body, Delete, Param, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { JwtAuthGuard } from '../common/jwt-auth.guard';

@ApiTags('cart')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @ApiOperation({ summary: 'Get current user cart' })
  async getCart(@Req() req: { user: { sub: number } }) {
    const items = await this.cartService.getCart(req.user.sub);
    return {
      success: true,
      data: items.map((i) => ({
        product: i.product,
        productId: i.productId,
        quantity: i.quantity,
      })),
    };
  }

  @Post()
  @ApiOperation({ summary: 'Add item to cart' })
  async add(@Req() req: { user: { sub: number } }, @Body() dto: AddToCartDto) {
    const item = await this.cartService.addToCart(req.user.sub, dto.productId, dto.quantity);
    return { success: true, data: item };
  }

  @Delete(':productId')
  @ApiOperation({ summary: 'Remove item from cart' })
  async remove(@Req() req: { user: { sub: number } }, @Param('productId', ParseIntPipe) productId: number) {
    await this.cartService.removeFromCart(req.user.sub, productId);
    return { success: true };
  }
}

