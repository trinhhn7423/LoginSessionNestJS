import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

// import { Exclude } from 'class-transformer';

@Entity({ name: 'user' })
export class AuthEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20, unique: true })
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

  @Column({
    nullable: true,
  })
  created_at: Date;

  @Column({
    nullable: true,
  })
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
