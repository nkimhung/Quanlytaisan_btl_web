import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { debug } from 'util';


@Component({
    templateUrl: './register-employee.component.html',
    styleUrls: ['./register-employee.component.css']
})
export class RegisterEmployeeComponent implements OnInit {

  public data: any = {
    status: "Active",
    gender: "Nam"
    };
   public error = "";
   public message: any={ }; 
    public F = "";
    public B = "";
    public P = "";
    public JS = "";
    public JE = "";

  public genders: any = [
    { gender: 'Nam' },
    { gender: 'Nữ' }
  ]
  public statuss: any = [
    { status: 'Active'},
    { status: 'Wait' },
    { status: 'Delete'}
  ]

  constructor(
    private auth: AuthenticationService,
      private router: Router,
    ) { }
    registerEmployee() {
        //check fullName
        if (!this.data.fullName) {
            this.F = "err";
            this.message.F = "FullName không thể trống !";
            debugger
        } else {
            this.F = "";
            this.message.F = "";
        }
        //check birthDate
        if (!this.data.birthDate) {
            this.B = "err";
            this.message.B = "BirthDate không thể trống !"
        } else {
            this.B = "";
            this.message.B = "";
        }
        //check phone
        if (!this.data.phone) {
            this.P = "err";
            this.message.P = "Phone không thể trống !";
            debugger
        } else {
            this.P = "";
            this.message.P = "";
        }
        //check JobStartDate
        if (!this.data.jobStartDate) {
            this.JS = "err";
            this.message.JS = "JobStartDate không thể trống !"
        } else {
            this.JS = "";
            this.message.JS = "";
        }
        //check jobEndDate
        if (!this.data.jobEndDate) {
            this.JE = "err";
            this.message.JE = "JobEndDate không thể trống !"
        } else {
            this.JE = "";
            this.message.JE = "";
        }
        // stop here if form is invalid
        if (!this.data.phone || !this.data.birthDate || !this.data.fullName || !this.data.jobStartDate || !this.data.jobEndDate) {
            debugger
            this.error = "Không được bỏ trống các trường bôi đỏ !"
        } else {
            if (new Date(this.data.jobEndDate).getTime() <= new Date(this.data.jobStartDate).getTime()) {
                this.JE = "err";
                this.JS = "err";
                this.message.JE = "Ngày kết thúc phải sau ngày bắt đầu !";
                this.message.JS = "Ngày bắt đầu phải trước ngày kết thúc !"
                debugger
            }
            else {
                  this.data.birthDate = new Date(this.data.birthDate).getTime();
                  this.data.jobEndDate = new Date(this.data.jobEndDate).getTime();
                  this.data.jobStartDate = new Date(this.data.jobStartDate).getTime();
                console.log(this.data)
                this.data.createdBy = this.auth.currentUserValue.employeeID;
                  debugger
                  this.auth.registerEmployee(this.data).subscribe((data) => {
                      debugger
                    if (data.status != 200) {
                        debugger
                        console.log("Lỗi server vui lòng thử lại!");
                        return;
                    } else {
                        debugger
                        alert("Tạo mới thành công. Vui lòng tạo tài khoản cho người dùng này !");
                        this.router.navigateByUrl("/register");
                    }
      // this.router.navigateByUrl("/register");
    }
    );
            }
            debugger

        }
        
    //    debugger
    
  }

ngOnInit() {
    this.message = {
        F: "",
        B: "",
        P: "",
        JS: "",
        JE: "",
    }

  }
}
