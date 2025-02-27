import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Exclude, Transform, TransformFnParams } from 'class-transformer';
import { CommonEntity } from '../../common/entity/common.entity';
import { IsEmail } from 'class-validator';
import { RoleEntity } from '../role/role.entity';

export enum UserStatus {
  WORKING,
  RESIGNED,
}

@Entity({ name: 'User' })
export class AuthEntity extends CommonEntity {
  // @ManyToOne(() => AuthEntity, { nullable: true })
  // @JoinColumn({ name: 'manager_id' })
  @Column({ nullable: true })
  managerId: number;

  @Column({ nullable: true, unique: true, length: 50 })
  email: string;

  @Exclude() // loai tru
  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  fullName: string;

  @Column({ nullable: true, unique: true })
  phone: string;

  @Column({ nullable: true })
  address: string;

  @ManyToOne(() => RoleEntity, { eager: true })
  @JoinColumn({ name: 'role_id' })
  role: RoleEntity;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: null,
    nullable: true,
  })
  @Transform(
    ({ value }: TransformFnParams) => {
      if (value === null) return null;
      return `${UserStatus[value]?.toLowerCase()}`;
    },
    {
      toPlainOnly: true, //biến đổi khi chuyển từ class sang object ,    ,,instanceToPlain
      toClassOnly: false, // biến đổi từ object sang class ,, plainToInstance
    },
  )
  status: number;

  @Column({ default: false })
  something: boolean;
}
