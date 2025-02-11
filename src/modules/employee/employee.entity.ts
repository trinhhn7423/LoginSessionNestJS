import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuthEntity } from '../auth/auth.entity';
import { RoleEntity } from '../role/role.entity';
import { Transform, TransformFnParams } from 'class-transformer';

export enum EmployeeStatus {
  WORKING,
  RESIGNED,
}

@Entity({ name: 'Employee' })
export class EmployeeEntity {
  @PrimaryGeneratedColumn({ type: 'tinyint' })
  id: number;

  @ManyToOne(() => AuthEntity, { nullable: false })
  @JoinColumn({ name: 'id_manager' })
  manager: AuthEntity;

  @OneToMany(() => AuthEntity, (user) => user.id, { nullable: false })
  @JoinColumn({ name: 'id_employee' })
  employee: AuthEntity;

  @ManyToOne(() => RoleEntity, { nullable: false })
  @JoinColumn({ name: 'id_role' })
  role: RoleEntity;

  @Column({
    type: 'enum',
    enum: EmployeeStatus,
    default: EmployeeStatus.WORKING,
  })
  @Transform(
    ({ value }: TransformFnParams) => {
      return `${EmployeeStatus[value].toLowerCase()}`;
    },
    {
      toPlainOnly: true, //biến đổi khi chuyển từ class sang object ,    ,,instanceToPlain
      toClassOnly: false, // biến đổi từ object sang class ,, plainToInstance
    },
  )
  status: EmployeeStatus;
}
