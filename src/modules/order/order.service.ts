import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { In, Repository } from 'typeorm';
import { OrderItemEntity } from './entities/order_item.entity';
import { PaymentMethodEntity } from './entities/payment_method.entity';
import { CreateOrderDto } from './dto/create_order.dto';
import { ProductVarianEntity } from '../product/entity/product_variant.entity';
import { AuthEntity } from '../auth/auth.entity';
import { UpdateOrderDto } from './dto/update_order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepo: Repository<OrderEntity>,
    @InjectRepository(OrderItemEntity)
    private orderItemRepo: Repository<OrderItemEntity>,
    @InjectRepository(PaymentMethodEntity)
    private paymentMethodRepo: Repository<PaymentMethodEntity>,
    @InjectRepository(ProductVarianEntity)
    private varianRepo: Repository<ProductVarianEntity>,
    @InjectRepository(AuthEntity)
    private authRepo: Repository<AuthEntity>,
  ) {}

  async createOrder(session: Record<string, any>, dataOrder: CreateOrderDto) {
    return this.orderRepo.manager.transaction(async (transaction) => {
      //
      const [findUser, findPaymentMethod] = await Promise.all([
        this.authRepo.findOne({ where: { id: session.userData.id } }),
        this.paymentMethodRepo.findOne({
          where: { id: dataOrder.paymentMethodId },
        }),
      ]);
      if (!findUser) throw new NotFoundException('User not found');
      if (!findPaymentMethod)
        throw new NotFoundException('Payment method not found');

      const orderItems: OrderItemEntity[] = [];

      if (dataOrder.items.length > 0) {
        for (const item of dataOrder.items) {
          const findVarian = await this.varianRepo.findOneBy({
            id: item.varianId,
          });

          if (findVarian.quantity < item.quantity)
            throw new NotFoundException(
              `Product ${findVarian?.product?.name} out of stock`,
            );
          if (!findVarian)
            throw new NotFoundException(
              `Product with ID ${item?.varianId} not found`,
            );

          findVarian.quantity -= item.quantity;
          await transaction.save(findVarian);

          const createOrderItem = transaction.create(OrderItemEntity, {
            quantity: item.quantity,
            varian: findVarian,
          });
          await transaction.save(createOrderItem);
          orderItems.push(createOrderItem);
        }
      }
      return await transaction.save(OrderEntity, {
        orderCode: dataOrder.orderCode,
        price: dataOrder.price,
        discount: dataOrder.discount,
        customer: dataOrder.customer,
        address_shipping: dataOrder.address_shipping,
        area: dataOrder.area,
        createBy: findUser,
        deliveryCost: dataOrder.deliveryCost,
        tax: dataOrder.tax,
        items: orderItems,
        payment: dataOrder.paymentStatus,
        orderStatus: dataOrder.orderStatus,
        created_at: new Date(),
      });
    });
  }

  async updateOrder(dataUpdate: UpdateOrderDto, id: number) {
    const findOrder = await this.orderRepo.findOneBy({ id });
    if (!findOrder) throw new NotFoundException('Order not found');
    findOrder.payment = dataUpdate.paymentStatus;
    findOrder.orderStatus = dataUpdate.orderStatus;
    findOrder.paymentMethod = await this.paymentMethodRepo.findOneBy({
      id: dataUpdate.paymentMethodId,
    });
    findOrder.updated_at = new Date();
    return await this.orderRepo.save(findOrder);
  }

  async deleteOrder(id: number) {
    const findOrder = await this.orderRepo.findOneBy({ id });
    if (!findOrder) throw new NotFoundException('Order not found');
    findOrder.isDelete = true;

    return { message: 'Order deleted successfully' };
  }

  async createPaymentMethod(body: { name: string }) {
    const createPaymentMethod = this.paymentMethodRepo.create({
      name: body.name,
    });
    return await this.paymentMethodRepo.save(createPaymentMethod);
  }

  async getAllPaymentMethod() {
    return await this.paymentMethodRepo.find();
  }

  async findAllOrders(session: Record<string, any>) {
    const finUser = await this.authRepo.findOne({
      where: { id: session.userData.id },
    });
    if (!finUser) throw new NotFoundException('User not found');
    return await this.orderRepo.find({
      where: {
        createBy: { id: finUser.id },
        isDelete: false,
      },
      // select: { items: { varian: { id: true } } },
      relations: { items: { varian: true } },
      order: { created_at: 'DESC' },
    });
  }
}
