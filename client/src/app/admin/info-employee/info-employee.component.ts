import { Component, OnInit, Input } from '@angular/core';

import { UserService, EmployeeService } from '@/_services';
import { Employee } from '@/_models';

@Component({
  selector: 'app-info-employee',
  templateUrl: './info-employee.component.html',
  styleUrls: ['./info-employee.component.css']
})
export class InfoEmployeeComponent implements OnInit {

  @Input() id: any;

  employees: Employee[];
  employeeById: any = {};

  constructor(private userService: UserService, private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeService.getEmployeeById(this.id).subscribe((res: any) => {
        if (res.data.avatar) res.data.avatar = res.data.avatar.slice(8);
      this.employeeById = res.data;
    });
  }

}
