import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { EmployeeService } from '@/_services';

@Component({
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public employees: any = [
    // {fullName : 'Toan', id: 1},
    // {fullName : 'Toan 1', id: 2},
    // {fullName : 'Toan 2', id: 3},
    // {fullName : 'Toan 3', id: 4},
  ]

  public roles: any = [
    {role : 'User'},
    {role : 'Admin'}
    ]
    public errorEmployee = "";
    public errorUsername = "";
    public errorPassword = "";
    public errorRole = "";
    public error = "";
    public messageErrorE = "";
    public messageErrorU = "";
    public messageErrorP = "";
    public messageErrorR = "";

  constructor(private auth: AuthenticationService, private router: Router, private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeService.getAllEmployee().subscribe((res: any) => {
      if (res.status != 200) {
        console.log(res.msg);
        return;
      }
      this.employees = res.data;
      console.log(res);
    });
  }

    register(form: NgForm) {
        console.log(form.value);
        var user = form.value;
        user.timeCreate = "125365";
        debugger
   
        if (!user.username) {
            this.errorUsername = "error";
            this.messageErrorU = "show";
        }
        else {
            this.errorUsername = "";
            this.messageErrorU = "";
        }

        if (!user.password) {
            this.errorPassword = "error";
            this.messageErrorP = "show";
        }
        else {
            this.errorPassword = "";
            this.messageErrorP = "";
        }
        if (!user.role) {
            this.errorRole = "error";
            this.messageErrorR = "show";
        }
        else {
            this.errorRole = "";
            this.messageErrorR = "";
        }
      debugger
        if (user.username && user.password && user.role) {
            user.createdBy = this.auth.currentUserValue.employeeID;
            user.modifiedBy = this.auth.currentUserValue.employeeID;
            debugger
            this.auth.register(user).subscribe(
                (data) => {
                    if (data.status != 200) {
                        debugger
                        this.errorUsername = "error";
                        this.messageErrorU = "show";
                        this.errorPassword = "error";
                        this.messageErrorP = "show";
                        this.messageErrorE = "";
                        this.messageErrorR = "";
                        this.error = data.err;
                    } else {
                        this.router.navigateByUrl("/admin");
                    }
                },
                err => {
                    debugger
                }
            );
        }
        else {
            this.error = "Dữ liệu đầu vào không hợp lệ";
        }
    
  }

}
