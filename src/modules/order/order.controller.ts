import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Session, SetMetadata, UseGuards, UseInterceptors } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create_order.dto';
import { UpdateOrderDto } from './dto/update_order.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller({ version: '1', path: '/orders' })
@SetMetadata('roles', ['ADMIN'])
@UseGuards(AuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    @Post()
    createOrder(@Session() session: Record<string, any>, @Body() dataOrder: CreateOrderDto) {
        return this.orderService.createOrder(session, dataOrder);
    }
    @Put(':id')
    updateOrder(@Body() dataOrder: UpdateOrderDto, @Param('id', new ParseIntPipe()) id: number) {
        return this.orderService.updateOrder(dataOrder, id);
    }
    @Delete(':id')
    deleteOrder(@Param('id', new ParseIntPipe()) id: number) {
        return this.orderService.deleteOrder(id);
    }
    @Post('payment_method')
    createPaymentMethod(@Body() body: { name: string }) {
        return this.orderService.createPaymentMethod(body);
    }
    @Get('payment_method')
    getAllPaymentMethod() {
        return this.orderService.getAllPaymentMethod();
    }
    @Get()
    getAllOrders(@Session() session: Record<string, any>) {
        return this.orderService.findAllOrders(session);
    }
}
