import { Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { OrdersService } from './orders.service';

@ApiTags('orders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Checkout and create order from cart' })
  async checkout(@Req() req: { user: { sub: number } }) {
    const order = await this.ordersService.createOrderFromCart(req.user.sub);
    return { success: true, data: order };
  }

  @Get()
  @ApiOperation({ summary: 'List orders for current user' })
  async list(@Req() req: { user: { sub: number } }) {
    const orders = await this.ordersService.listOrders(req.user.sub);
    return { success: true, data: orders };
  }
}

