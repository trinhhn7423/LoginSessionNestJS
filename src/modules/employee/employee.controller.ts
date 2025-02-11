import { Controller, Post } from '@nestjs/common';
import { EmployeeService } from './employee.service';

@Controller({ version: '1', path: 'employee' })
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  // @Post()
  // addEmployee() {
  //   return this.employeeService.addEmployee();
  // }
}
