import { AuthEntity } from 'src/modules/auth/auth.entity';
import { OrderEntity } from 'src/modules/order/entities/order.entity';
import { OrderItemEntity } from 'src/modules/order/entities/order_item.entity';
import { PaymentMethodEntity } from 'src/modules/order/entities/payment_method.entity';
import { ColorEntity } from 'src/modules/product/entity/color.entity';
import { MaterialEntity } from 'src/modules/product/entity/material.entity';
import { ProductEntity } from 'src/modules/product/entity/product.entity';
import { ProductVarianEntity } from 'src/modules/product/entity/product_variant.entity';
import { SizeEntity } from 'src/modules/product/entity/size.entity';
import { RoleEntity } from 'src/modules/role/role.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

//npm run migration:generate -- db/migrations/NewMigration
//npm run migration:run

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'trinh123',
  database: 'trinhho',
  entities: [
    AuthEntity,
    RoleEntity,
    ProductEntity,
    ProductVarianEntity,
    ColorEntity,
    MaterialEntity,
    SizeEntity,
    OrderEntity,
    PaymentMethodEntity,
    OrderItemEntity
  ],
  migrations: ['dist/db/migrations/*.js'],
  synchronize: false,
  // logging: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
