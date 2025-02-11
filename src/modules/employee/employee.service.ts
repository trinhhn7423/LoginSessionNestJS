import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeEntity } from './employee.entity';
import { Repository } from 'typeorm';
import { AuthEntity } from '../auth/auth.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private readonly employeeRepository: Repository<EmployeeEntity>,
    @InjectRepository(AuthEntity)
    private readonly authRepository: Repository<AuthEntity>,
  ) {}

  // async addEmployee(id_manager: number, employees: number[]) {
  //   const manager = await this.authRepository.findOneBy({ id: id_manager });
  //   const employeeArr:AuthEntity[]<> = [];
  //
  //   employees.map((id) => {
  //     const employee = this.authRepository.findOneBy({ id: id });
  //     if (employee) employeeArr.push(employee);
  //   });
  //   this.employeeRepository.create({
  //     id_manager: manager,
  //     id_employee: employeeArr,
  //   });
  // }
}
