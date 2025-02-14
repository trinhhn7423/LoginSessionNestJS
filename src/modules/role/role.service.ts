import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from './role.entity';
import { Not, Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  findAllRole() {
    return this.roleRepository.find({ where: { name: Not('MANAGER') } });
  }

  async createRole(nameRole: string) {
    const existingRole = await this.roleRepository.findOne({
      where: { name: nameRole },
    });
    if (existingRole) {
      throw new Error('Role already exists');
    }
    return this.roleRepository.save({ name: nameRole });
  }
}
