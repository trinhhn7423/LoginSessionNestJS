import { CommonEntity } from "src/common/entity/common.entity";
import { Column, Entity } from "typeorm";


@Entity()
export class CustomerEntity extends CommonEntity {

    @Column({ nullable: false })
    name: string

    @Column({ nullable: true })
    email: string

    @Column({ nullable: true })
    phone: string

    @Column({nullable:true})
    address:string

    @Column({nullable:true})// tong chi tieu 
    totalExpenditure :number


}