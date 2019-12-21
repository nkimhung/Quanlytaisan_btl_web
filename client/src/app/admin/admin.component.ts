import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { UserService, EmployeeService } from '@/_services';
import { Employee } from '@/_models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InfoEmployeeComponent } from './info-employee/info-employee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
@Component({
    templateUrl: 'admin.component.html',
    styleUrls: ['admin.component.css']
})
export class AdminComponent implements OnInit {
    employees: Employee[];
    public type = 'fullName';
    public types: any = [
        {
            type: 'Full Name',
            value: 'fullName'
        },
        {
            type: 'Status',
            value: 'status'
        },
        {
            type: 'Code',
            value: 'code'
        },
        {
            type: 'Phone',
            value: 'phone'
        },
        {
            type: 'Gender',
            value: 'gender'
        },
        {
            type: 'Email',
            value: 'email'
        },
        {
            type: 'Address',
            value: 'address'
        },
        {
            type: 'Birth',
            value: 'birth'
        },
        {
            type: 'Job Title',
            value: 'status'
        },
    ];

    constructor(private userService: UserService, private employeeService: EmployeeService, private modal: NgbModal) { }

    ngOnInit() {
        this.getAllEmployees();
    }

    getAllEmployees(): void {
        this.employeeService.getAllEmployee().subscribe((res: any) => {
            if (res.status != 200) {
                console.log(res.msg);
                return;
            }
            this.employees = res.data;
            this.employees = this.format(this.employees);
            debugger
        });
    };
    format(employee) {
        employee = this.employees.map(employee => {
            debugger
            employee.birth = this.formattedDate(new Date(employee.birthDate*1))
            debugger
            employee.start = this.formattedDate(new Date(employee.jobStartDate*1))
            employee.end = this.formattedDate(new Date(employee.jobEndDate*1))
            employee.time = this.formattedDate(new Date(employee.timeCreated*1))
            return employee;
        })
        return employee;
    }

    openPopup1(employee) {
        const modalRef = this.modal.open(InfoEmployeeComponent, { size: 'lg'})
        modalRef.componentInstance.id = employee.id;
        modalRef.result.then((result) => {
            
            console.log(result);
        }).catch((error) => {
            console.log(error);
        });
        console.log(modalRef.componentInstance.id)
        console.log(employee.id);
      
    }

    openPopup2(employee) {
        const modalRef = this.modal.open(UpdateEmployeeComponent, { size: 'lg' })
        modalRef.componentInstance.id = employee.id;
       
        modalRef.result.then((result) => {
            this.getAllEmployees();
            debugger
            console.log(result);
        }).catch((error) => {
            console.log(error);
            this.getAllEmployees();
            debugger
        });
    }
    formattedDate(d) {
        let month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        return [day, month, year,].join('/');
    }

}
