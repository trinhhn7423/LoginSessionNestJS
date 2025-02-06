import { Column, Entity } from 'typeorm';
import { Exclude, Transform, TransformFnParams } from 'class-transformer';
import { CommonEntity } from '../../common/entity/common.entity';

export enum RoleUser {
  ADMIN,
  USER,
}

@Entity({ name: 'user' })
export class AuthEntity extends CommonEntity {
  @Column({ length: 30, unique: true })
  username: string;

  @Exclude() // loai tru
  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  firstname: string;

  @Column({ nullable: false })
  lastname: string;

  @Column({
    type: 'enum',
    enum: RoleUser,
    default: RoleUser.USER,
  })
  @Transform(
    ({ value }: TransformFnParams) => {
      // console.log('asdasdasd');
      return RoleUser[value].toLowerCase();
    },
    { toClassOnly: true, toPlainOnly: false },
  )
  role: RoleUser;
}
