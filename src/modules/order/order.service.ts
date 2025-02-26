import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';
import { CustomerEntity } from './entities/customer.entity';

@Injectable()
export class OrderService {

    constructor(
        @InjectRepository(OrderEntity)
        private orderRepo: Repository<OrderEntity>,
        @InjectRepository(CustomerEntity)
        private customerRepo: Repository<CustomerEntity>,

    ) { }

    async createOrder() {
        const createCustomer = await this.customerRepo.create({ address: '123456789', email: 'john@example.com', name: 'John Doe', phone: '1234567890', totalExpenditure: 0 });

        return this.customerRepo.save(createCustomer);
    }
}
