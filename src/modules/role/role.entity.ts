import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'role' })
export class RoleEntity {
  @PrimaryGeneratedColumn({ type: 'tinyint' })
  id: number;
  @Column({ unique: true })
  name: string;
}
