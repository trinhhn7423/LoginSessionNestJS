import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { CommonEntity } from '../../common/entity/common.entity';

// import { Exclude } from 'class-transformer';

@Entity({ name: 'user' })
export class AuthEntity extends CommonEntity {
  @Column({ length: 30, unique: true })
  username: string;

  @Exclude()
  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  firstname: string;

  @Column({ nullable: false })
  lastname: string;

  @Column({
    type: 'enum',
    enum: ['admin', 'user'],
    default: 'user',
  })
  role: string;
}
