import {
  Body,
  Controller,
  Get,
  Post,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller({ version: '1', path: '/role' })
// @UseGuards(AuthGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  // @UseGuards(AuthGuard)
  getAllRole() {
    return this.roleService.findAllRole();
  }

  //
  @SetMetadata('roles', ['MANAGER'])
  @UseGuards(AuthGuard)
  @Post()
  createRole(@Body() data: any) {
    return this.roleService.createRole(data.nameRole);
  }
}
