import { AuthEntity } from "src/modules/auth/auth.entity";
import { CustomerEntity } from "src/modules/order/entities/customer.entity";
import { OrderEntity } from "src/modules/order/entities/order.entity";
import { ProductEntity } from "src/modules/product/entity/product.entity";
import { ProductAttribute } from "src/modules/product/entity/product_attribute.entity";
import { ProductAttributeValue } from "src/modules/product/entity/product_attribute_value.entity";
import { RoleEntity } from "src/modules/role/role.entity";
import { DataSource, DataSourceOptions } from "typeorm";

//npx typeorm migration:run -d dist/migrations/dataSource.js

export const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'test',
    entities: [
        AuthEntity,
        RoleEntity,
        ProductEntity,
        ProductAttribute,
        ProductAttributeValue,
        OrderEntity,
        CustomerEntity
    ],
    migrations: [__dirname + '/migrations/*.js'],

    synchronize: false,
    // logging: true,
};


const dataSource = new DataSource(dataSourceOptions);
export default dataSource;