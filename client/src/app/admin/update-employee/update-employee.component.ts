import { Component, OnInit, Input} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService, EmployeeService, AuthenticationService } from '@/_services';
import { Employee } from '@/_models';
import { Router } from "@angular/router";

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {


    @Input() id: any;
  employees: Employee[];
  employeeById: any = {};
    public data: any = {};
    public birthDate;
    public jobStartDate;
    public jobEndDate;
    public JE = "";
    public JS = "";
    public error = "";
    message: any = {
        JS: "",
        JE:""
    }
  public genders: any = [
    { gender: 'Nam' },
    { gender: 'Nữ' }
  ]
  public statuss: any = [
    { status: 'Active' },
    { status: 'Wait' },
    { status: 'Delete' }
  ]

  constructor(private activeModal: NgbActiveModal, private userService: UserService, private employeeService: EmployeeService, private authenticationService: AuthenticationService, private router: Router) { }

    ngOnInit() {
        this.employeeService.getEmployeeById(this.id).subscribe((res: any) => {
            if (res.data.avatar)  res.data.avatar = res.data.avatar.slice(8);
            this.employeeById = res.data;
            debugger
            this.birthDate = this.formattedDate(new Date(res.data.birthDate*1));
            this.jobStartDate = this.formattedDate(new Date(res.data.jobStartDate*1));
            this.jobEndDate = this.formattedDate(new Date(res.data.jobEndDate*1));
         
        });
  }

  updateEmployee() {
      //this.data.employeeId = this.id;
      this.employeeById.employeeId = this.id;
      this.employeeById.birthDate = new Date(this.birthDate).getTime();
      this.employeeById.jobEndDate = new Date(this.jobEndDate).getTime();
      this.employeeById.jobStartDate = new Date(this.jobStartDate).getTime();
      if (this.employeeById.jobEndDate < this.employeeById.jobStartDate) {
          this.error = "Ngày bắt đầu phải nhỏ hơn ngày kết thúc!";
          this.JE = "boder";
          this.JE = "boder";
          this.message.JE = "Ngày kết thúc phải sau ngày bắt đầu!";
          this.message.JS="Ngày bắt đầu phải trước ngày kết thúc!"
      } else {
          //console.log(this.data)
          this.authenticationService.updateEmployee(this.employeeById).subscribe((data) => {
              if (data.status != 200) {
                  alert("Lỗi server vui lòng thử lại");
              } else {
                  alert("Cập nhập thành công");
                  this.close();
              }
          }
          );
      }
  }
  update(employees,employeeI) {
      employees = this.employees.map(employee => {
          if (employee.id = employeeI.employeeId)
              return employeeI;
            return employee;
        })
        return employees;
    }
  formattedDate(d) {
        let month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day,].join('-');
}

  close() {
    this.activeModal.close();
  }

}
